package main

import (
	"database/sql"
	"encoding/json"
	"errors"
	"flag"
	"fmt"
	"log"
	"net/http"
	"strings"

	_ "github.com/lib/pq"
	"github.com/yanzay/lego/legobase"
)

var (
	store     *sql.DB
	webserver *http.Server
)

type handler struct{}

func newServer(addr string, dbconnect string) {
	var err error

	webserver = &http.Server{Addr: addr, Handler: &handler{}}

	store, err = sql.Open("postgres", dbconnect)
	if err != nil {
		log.Fatalf("Can't connect to database: %s", err)
	}
	err = store.Ping()
	if err != nil {
		log.Fatalf("Can't connect to database: %s", err)
	}
}

func (handler) ServeHTTP(rw http.ResponseWriter, req *http.Request) {
	decoder := json.NewDecoder(req.Body)
	var order legobase.Order
	err := decoder.Decode(&order)
	if err != nil {
		http.Error(rw, err.Error(), http.StatusBadRequest)
	}
	err = saveOrder(order)
	if err != nil {
		http.Error(rw, err.Error(), http.StatusBadRequest)
	}
}

func saveOrder(order legobase.Order) error {
	if len(order.LineItems) < 1 {
		return errors.New("Order should contain at least one line item")
	}
	transaction, err := store.Begin()
	if err != nil {
		return err
	}
	resp, err := store.Exec(`INSERT INTO orders (name, city, address, phone) VALUES (?, ?, ?, ?)`,
		order.Name, order.City, order.Address, order.Phone)
	if err != nil {
		return err
	}
	id, err := resp.LastInsertId()
	if err != nil {
		return err
	}
	var values []interface{}
	var templates []string
	for _, item := range order.LineItems {
		values = append(values, id, item.ProductID, item.Count)
		templates = append(templates, "(?, ?, ?)")
	}
	template := strings.Join(templates, ", ")
	query := fmt.Sprintf("INSERT INTO line_items (order_id, product_id, count) VALUES %s", template)
	_, err = store.Exec(query, values...)
	if err != nil {
		return err
	}
	err = transaction.Commit()
	return err
}

func main() {
	var (
		host      = flag.String("host", "0.0.0.0", "Server host")
		port      = flag.Int("port", 8080, "Server port")
		dbconnect = flag.String("db", "", "Database connection string")
	)
	flag.Parse()
	addr := fmt.Sprintf("%s:%d", *host, *port)
	newServer(addr, *dbconnect)
	err := webserver.ListenAndServe()
	if err != nil {
		log.Fatal(err)
	}
}
