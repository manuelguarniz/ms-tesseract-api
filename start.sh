
echo "Starting build image ..."
if [ -z "$(docker images -q miniasia_img_app_ui 2> /dev/null)" ]; then
  echo "Deleting build image ..."
  docker image rm miniasia_img_app_ui
fi

echo "Building image ..."
# Run Dockerfile
docker build --no-cache . --tag miniasia_img_app_ui

echo "Deleting container ..."
# Delete cointainer
docker stop pg_miniasia_app_ui || true && docker rm pg_miniasia_app_ui || true

echo "Running image ..."
# Run project
docker run -d \
 --name pg_miniasia_app_ui \
 --network pg_miniasia_network \
 -p 80:80 \
 -t miniasia_img_app_ui:latest

echo "End successfully !"
# docker exec -it pg_miniasia_app_ui sh
 No newline at end of file
