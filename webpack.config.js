module.exports = {
    mode: 'development',
    entry: {
        app: './src/index.jsx',
    },
    output: {
        path: __dirname + '/public/js',
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    devServer: {
        static: 'public',
        open: true,
        port: 8080,
    },
};
