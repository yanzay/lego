package main

import (
	"database/sql"
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"net/http"

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

func (handler) ServeHTTP(rw http.ResponseWriter, req *http.Request) {
	shop := req.URL.Query().Get("shop")
	if shop == "" {
		rw.WriteHeader(http.StatusNotFound)
		return
	}
	products, err := getProducts(shop)
	if err != nil {
		log.Println(err)
		http.Error(rw, err.Error(), http.StatusInternalServerError)
	}
	resp, err := json.Marshal(products)
	if err != nil {
		log.Println(err)
		http.Error(rw, err.Error(), http.StatusInternalServerError)
	}
	_, err = rw.Write(resp)
	if err != nil {
		log.Println(err)
		http.Error(rw, err.Error(), http.StatusInternalServerError)
	}
}

func getProducts(shop string) ([]legobase.Product, error) {
	products := []legobase.Product{}
	query := `SELECT name, description, price, category FROM products WHERE shop = $1`
	rows, err := store.Query(query, shop)
	if err != nil {
		return nil, err
	}
	defer func() {
		err := rows.Close()
		if err != nil {
			log.Println(err)
		}
	}()
	for rows.Next() {
		var p legobase.Product
		if err := rows.Scan(&p.Name, &p.Description, &p.Price, &p.Category); err != nil {
			return nil, err
		}
		products = append(products, p)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return products, nil
}
