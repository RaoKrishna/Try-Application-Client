var webpack = require('webpack');
var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'inline-source-map',
    entry: [
        'webpack-hot-middleware/client',
        './app/index'
    ],
    output: {
        path: path.join(__dirname, "dist"),
        filename: 'app.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        //new webpack.OldWatchingPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV':JSON.stringify('development'), // production
                '__DEVTOOLS__': process.env.DEVTOOLS === 'true'
            },
            '__DEVTOOLS__': process.env.DEVTOOLS === 'true',
            '__APIENV__': process.env.APIENV || JSON.stringify('local')
        }),
        new HtmlwebpackPlugin({
            title: 'Try application',
            inject: false,
            filename: 'index.html',
            template: 'index.tpl.html'
        })/*,
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        }),
        new webpack.optimize.DedupePlugin()*/
    ],
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                include: [
                    path.join(__dirname, 'app')
                ],
                test: /\.js$/,
                exclude: './node_modules/',
                query: {
                    plugins: ['transform-runtime', 'transform-decorators-legacy'],
                    presets: ['es2015', 'stage-0', 'react', 'react-hmre']
                }
            },
            { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader', include: [
                path.join(__dirname, 'app')
            ]},
            { test: /\.css$/, loader: 'style-loader!css-loader?sourceMap'},
            { test: /\.(png|jpg|svg|gif)$/, loader: 'url?limit=25000'}
        ]
    }
};