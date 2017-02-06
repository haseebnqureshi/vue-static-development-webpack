#!/bin/bash

# builds your deployable www directory from the app directory

cd app
webpack
cd ..
rsync -avr app/* www --exclude="components" --exclude="vendors" --exclude="app.js" --exclude="webpack.config.js"
