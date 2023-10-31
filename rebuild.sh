git pull

old_container=$(docker ps -a -q  --filter ancestor=mbhs)

old_image=$(docker images -q mbhs)

#docker rm $(docker stop $(docker ps -a -q  --filter ancestor=mbhs))

docker build . -t mbhs --no-cache

docker stop $old_container

docker run -d -p 3000:3000 mbhs

docker rm $old_container

docker rmi $old_image
