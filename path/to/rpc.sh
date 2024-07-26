#!/bin/bash

# Set up the folder
FOLDER_NAME="zrcs-dsc-rpc"
echo "Creating folder $FOLDER_NAME..."
mkdir -p $FOLDER_NAME

# Navigate to the folder
cd $FOLDER_NAME

# Download index.js
echo "Downloading index.js..."
curl -O https://www.zrcs.com/path/to/index.js

# Initialize a new Node.js project and install dependencies
echo "Initializing Node.js project and installing dependencies..."
npm init -y
npm install discord.js-selfbot-v13 readline-sync colors

# Run the script
echo "Setup complete. You can now run the script using: node index.js"
