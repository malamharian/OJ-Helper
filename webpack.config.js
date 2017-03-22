var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');

module.exports = {
	entry: {
		app: [
			'webpack/hot/dev-server',
			'./src/app.js'
		]
	},
	
	devtool: debug ? 'inline-source-map' : null,

	output: {
		path: './built',
		filename: 'bundle.js',
		publicPath: 'http://localhost:8080/built'
	},

	devServer: {
		contentBase: '.',
		publicPath: 'http://localhost:8080/built'
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

	plugins: debug ? [
		new webpack.HotModuleReplacementPlugin()
	] : [
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJSPlugin({
			mangle: false,
			sourcemap: false
		})
	],

	devServer: {
		historyApiFallback: true,
		hot: true
	}
}