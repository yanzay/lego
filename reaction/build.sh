docker run --rm -v "$PWD":/usr/src/reaction -w /usr/src/reaction -e CGO_ENABLED=0 -e GOOS=linux -e GOARCH=amd64 golang:1.5.1 go build -v
