const webpack = require('webpack')
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = (env, args) => {
    const isDev = args.mode === 'development'
    
    const config = {
        mode: 'development',
        entry: './src/main.js',
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: '[name]-[hash:8].js'
        },
        module: {
            rules: [{
                test: /\.vue$/,
                use: [{
                    loader: 'vue-loader'
                }],
            }, {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }, {
                test: /\.scss/,
                use: [isDev ? 'vue-style-loader': MiniCssExtractPlugin.loader,
                    'css-loader', 'postcss-loader',{
                        loader:'sass-loader',
                        // options:{
                        //     data:"$color:red;"
                        // }
                    }]
            }]
        },
        resolve: {
            extensions: ['.js', '.vue']
        },
        plugins: [
            // vue-loader 必须项
            new VueLoaderPlugin(),
            // 热加载插件
            // new webpack.HotModuleReplacementPlugin(),
            // html 模板
            new HtmlWebpackPlugin({
                template: './src/index.html'
            }),

            // new webpack.DefinePlugin({
            //     '$color':'red'
            // })

        ],
        // devtool: 'eval-source-map',
        // devServer: {
        //     contentBase: './dist',
        //     port: 3000,
        //     hot: true,
        //     inline: true
        // }

    }

    if(isDev){
        config.plugins.push(
            new webpack.HotModuleReplacementPlugin()
        )
    }

    return config
}