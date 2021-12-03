const path = require("path");

module.exports = {
	mode: "development",
	entry: "./src/index.ts",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "messenger.bundle.js",
	},
	resolve: {
		extensions: [".ts", ".js", ".json"],
	},
	module: {
		rules: [
			{
				test: /\.ts?$/,
				use: [
					{
						loader: "ts-loader",
						options: {
							configFile: path.resolve(__dirname, "tsconfig.json"),
						},
					},
				],
				exclude: /(node_modules)/,
			},
			{
				test: /\.scss$/,
				use: [
					{ loader: "css-loader" },
					{
						loader: "sass-loader",
						options: { sourceMap: true },
					},
				],
			},
			{
				test: /\.pug$/,
				use: [
					{
						loader: "html-loader",
					},
					{
						loader: "pug-loader",
					},
					{
						loader: "pug-html-loader",
						options: {
							pretty: true,
						},
					},
				],
			},
		],
	},
};
