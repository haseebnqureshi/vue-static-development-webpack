#!/bin/bash

# builds your deployable www directory from the app directory

cd app
webpack
cd ..
rsync -avr app/* www --exclude="components" --exclude="vendors" --exclude="css" --exclude="app.js" --exclude="webpack.config.js"
rm app/bundle.*
