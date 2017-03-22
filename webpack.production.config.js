var webpack = require('webpack');

module.exports = {
	entry: {
		app: [
			'./src/app.js'
		]
	},

	output: {
		path: './built',
		filename: 'bundle.js'
	},

	module: {
		loaders: [
   			{
   				test: /\.js$/,
   				loaders: ['react-hot', 'babel'],
   				exclude: /node_modules/
   			}
		]
	},

	plugins: [
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("production")
			}
		}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
	]
}