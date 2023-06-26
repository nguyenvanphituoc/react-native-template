#!/bin/bash

# Load nvm if it is available
if [ -s "$HOME/.nvm/nvm.sh" ]; then
  source "$HOME/.nvm/nvm.sh"
  # Switch to the Node.js version specified in .nvmrc
  nvm use
fi

# Run the Node.js script using the specified Node.js version
echo "Running Node.js script..."
node scripts/bitrise/build.mjs "$@"
