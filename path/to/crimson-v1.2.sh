#!/bin/bash

# Download index.js
echo "Downloading index.js..."
curl -O http://www.zrcs.xyz/path/to/index.js

# Install Node.js and npm if not installed
if ! command -v node &> /dev/null
then
    echo "Node.js could not be found, installing..."
    pkg install -y nodejs
fi

# Install required npm packages
echo "Installing required npm packages..."
npm install discord.js-selfbot-v13 readline-sync colors

# Run the script
echo "Running the RPC setup script..."
node index.js
