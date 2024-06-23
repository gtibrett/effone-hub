cd ./packages/api
echo "Copy README.md"
cp README.md dist/README.md

echo "Calculate Build Version"
version=$(jq -r '.version' package.json)
timestamp=$(date +%s)

echo "Copy package.json"
version=$(jq -r '.version' package.json)
timestamp=$(date +%s)
if [[ "$version" == *alpha* ]] || [[ "$version" == *beta* ]]
then
  jq .version="\"$version.$timestamp\"" package.json > dist/package.json
else
  cp package.json dist/package.json
fi
ls -al dist/

echo "Publish"
if [[ "$version" == *alpha* ]]
then
  yarn publish --tag alpha ./dist"
elif [[ "$version" == *beta* ]]
then
  yarn publish --tag beta ./dist
else
  yarn publish ./dist
fi