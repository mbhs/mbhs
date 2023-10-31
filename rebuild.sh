git pull

old=$(docker ps -a -q  --filter ancestor=mbhs)

#docker rm $(docker stop $(docker ps -a -q  --filter ancestor=mbhs))

docker build . -t mbhs --no-cache

docker stop $old

docker run -d -p 3000:3000 mbhs

docker rm $old
