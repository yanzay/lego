package main

import (
	"log"
	"net/http"
)

var addr = "0.0.0.0:4200"

func main() {
	fs := http.FileServer(http.Dir("static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))
	http.HandleFunc("/", indexHandler)

	log.Printf("Listening on %s\n", addr)
	err := http.ListenAndServe(addr, nil)
	if err != nil {
		log.Fatal(err)
	}
}

func indexHandler(w http.ResponseWriter, r *http.Request) {
	log.Printf("[%s] %s\n", r.Method, r.RequestURI)
	http.ServeFile(w, r, "index.html")
}
