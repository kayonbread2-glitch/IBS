package main

import (
	// "fmt"
	"net/http"
	"path/filepath"
)

const RELATIVE_ROOT = "../.."

func dynamicFileHandler(w http.ResponseWriter, r *http.Request) {
	requestPath := filepath.Clean(r.URL.Path)

	if requestPath == "server" {
		return
	}

	if requestPath == "/ws/editor" {
		return
	}

	localFilePath := filepath.Join(RELATIVE_ROOT, requestPath)

	http.ServeFile(w, r, localFilePath)

}

func main() {
	http.HandleFunc("/", dynamicFileHandler)
	if err := http.ListenAndServe(":8080", nil); err != nil {
		panic(err)
	}
}
