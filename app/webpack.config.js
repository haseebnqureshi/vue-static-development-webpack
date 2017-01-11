'use strict';

const webpack = require('webpack');

var environment = 'production';

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
		loaders: [
			{ test: /\.css$/, loader: 'style!css' }
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(environment)
		})
	]
};
