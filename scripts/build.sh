#!/bin/bash

cd app
webpack
cd ..
rsync -avr app/* www --exclude="components" --exclude="vendors" --exclude="js" --exclude="css" --exclude="app.js" --exclude="webpack.config.js"
