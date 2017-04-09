var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
	entry: {
		app: path.resolve(APP_PATH, 'app.jsx')
	},
	output: {
		path: BUILD_PATH,
		filename: 'bundle.js'
	},

	devtool: 'eval-source-map',

	devServer: {
		historyApiFallback: true,
		inline: true
	},

	module: {
		rules: [{
			test: /\.(js|jsx)$/,
			enforce: "pre",
			loader: "babel-loader",
			include: APP_PATH
		},
		{
			test: /\.(js|jsx)$/,
			loader: 'babel-loader',
			exclude: /node_modules/
		},
		{
			test: /\.scss$/,
			use: ["style-loader","css-loader","sass-loader"],
			exclude: /node_modules/
		},
		{
        test: /\.(png|jpg|gif|woff|woff2)$/,
        loader: 'url-loader?limit=8192'
        }],
	},
	// plugins: [
	// 	new HtmlWebpackPlugin({
	// 		title: 'just a test'
	// 	})
	// ],
	resolve: {
		extensions: ['.js', '.jsx']
	}
}