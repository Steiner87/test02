const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');


module.exports = {
    devtool: 'source-map',
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'build'), //папка сборки
        filename: 'bundle.js', //имя сохранения файла
        // publicPath: '/public/' //папка для статичных файлов (imgs)
    },
    module: {

        rules: [

            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: { presets: ["env"] }
                }]
            },
            {
                // работает!!!!
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 1 }
                    },
                    'postcss-loader'
                ]
            },
            {
                test: /\.pug$/,
                include: path.join(__dirname, 'src'),
                loader: ['pug-html-loader'],
                loader: 'pug-loader',
                options: {
                    pretty: true
                }
            }


        ]
    },

    devServer: {
        contentBase: path.join(__dirname, "src"),
        index: 'index.pug',
        inline: true,
        historyApiFallback: true,
    },


    plugins: [
        new ExtractTextPlugin('style.css'),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.pug'
        })
    ]
}



// module.exports = {
//     context: path.join(__dirname, 'src'),
//     entry: {
//         home: './app/home',
//         about: './app/about'
//     },
//     output: {
//         path: path.join(__dirname, 'dist'),
//         filename: '[name].bundle.js'
//     },
//     module: {
//         rules: [{
//             test: /\.js$/,
//             loader: 'babel-loader',
//             include: path.join(__dirname, 'src')
//         }]
//     },
//     devServer: {
//         contentBase: path.join(__dirname, 'dist'),
//         inline: true,
//         hot: true,
//         historyApiFallback: true,

//     },
//     plugins: [
//         new HtmlWebpackPlugin({
//             template: path.join(__dirname, 'src', 'index.html'),
//             inject: 'body',
//             chunks: ['home'],
//             filename: 'index.html'
//         }),
//         new webpack.HotModuleReplacementPlugin()
//     ]
//