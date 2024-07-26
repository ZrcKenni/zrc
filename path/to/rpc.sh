#!/bin/bash

echo "installing node.js"
pkg update -y && pkg upgrade -y
pkg install nodejs -y

FOLDER_NAME="zrcs-dsc-rpc"
echo "Creating folder $FOLDER_NAME..."
mkdir -p $FOLDER_NAME
cd $FOLDER_NAME

echo "Downloading index.js..."
curl -O https://www.zrcs.xyz/path/to/index.js

echo "Initializing Node.js project and installing dependencies..."
npm init -y
npm install discord.js-selfbot-v13 readline-sync colors

cd zrcs-dsc-rpc

echo "Setup complete. You can now run the script using: node index.js"

