require('dotenv').config();
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => {
    const PORT = process.env.CPORT;

    const config = {
        entry: '/client/main/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: `[name].bundle.js`,
            clean: true,
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    common: {
                        chunks: "initial",
                        name: "vendor",
                        test: /[\\/]node_modules[\\/]/,
                        enforce: true
                    },
                },
            },
            usedExports: true,
            runtimeChunk: true,
        },
        stats: {
            children: true,
            errorDetails: true,
        },
        mode: 'development',
        devtool: 'inline-source-map',
        devServer: {
            contentBase: path.resolve(__dirname, 'dist'),
            port: PORT,
            watchContentBase: true,
            hot:true,
            historyApiFallback: true,
        },
        resolve: {
            alias: {
                "@apis": path.resolve(__dirname, "client/apis/"),
                "@context": path.resolve(__dirname, "client/contexts/"),
                "@components": path.resolve(__dirname, "client/components/"),
                "@routes": path.resolve(__dirname, "client/routes/"),
                "@shared": path.resolve(__dirname, "client/"),
                "@theme": path.resolve(__dirname, "client/theme/"),
                "@views": path.resolve(__dirname, "client/views/"),
            },
            extensions: ['.js', '.jsx', '.css']
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                    }
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.(csv|tsv)$/i,
                    use: ['csv-loader'],
                },
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './client/main/index.html'
            })
        ]
    };

    return config;
}