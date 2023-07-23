module.exports = () => {
	const config = {
		resolve: {
			extensions: ['.ts', '.tsx', '.js', '.jsx'],
		},

		// Source maps support ('inline-source-map' also works)
		devtool: 'source-map',

		// Add the loader for .ts files.
		module: {
			rules: [
				{
					test: /\.ts$/,
					loader: 'ts-loader',
				},
			],
		},
	};
	return config;
};
