package main

import "net/http"

func main() {
	fs := http.FileServer(http.Dir("static"))
	http.ListenAndServe(":4200", fs)
}
