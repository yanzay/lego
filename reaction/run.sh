./build.sh
docker build -t reaction . && docker run -d -p 4200:4200 reaction
