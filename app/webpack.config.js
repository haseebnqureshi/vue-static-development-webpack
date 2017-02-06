'use strict';

const webpack = require('webpack');

var path = require('path');
var environment = 'production';

var ExtractTextPlugin = require('extract-text-webpack-plugin');

try {
	if (process.argv[1].match('webpack-dev-server')) {
		environment = 'development';
	}
}
catch (err) {}

module.exports = {
	entry: './app.js',
	output: {
		path: __dirname,
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: ExtractTextPlugin.extract({
					loader: 'css-loader',
					options: {
						sourceMap: true
					}
				})
			}
		]
	},
	devtool: 'source-map',
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(environment)
		}),
		new ExtractTextPlugin({
			filename: 'bundle.css',
			disable: false,
			allChunks: true
		})
	]
};
