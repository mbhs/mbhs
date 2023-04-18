git pull

docker build . -t mbhs

docker run . -p 3000:3000 -t mbhs
