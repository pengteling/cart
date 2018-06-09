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
            filename: isDev? '[name]-[hash:8].js' : "[name]-[contenthash:8].js"
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
                use: [isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader', 'postcss-loader', {
                    loader: 'sass-loader',
                    // options:{
                    //     data:"$color:red;"
                    // }
                }]
            },{
                test:/\.(png|jpg|jpeg|gif|webp)$/,
                use:{
                    loader:'url-loader',
                    options:{
                        limit:5*1024
                    }
                }
            }]
        },
        resolve: {
            extensions: ['.js', '.vue']
        },
        plugins: [
            // vue-loader 必须项
            new VueLoaderPlugin(),
            
            // html 模板
            new HtmlWebpackPlugin({
                template: './src/index.html'
            }),


        ],
        // devtool: 'eval-source-map',
        // devServer: {
        //     contentBase: './dist',
        //     port: 3000,
        //     hot: true,
        //     inline: true
        // }
        optimization:{

            // js代码分离
            splitChunks:{
                chunks:'all'
            },
            runtimeChunk:true
        }

    }

    if (isDev) {
        config.plugins.push(
            new webpack.HotModuleReplacementPlugin()
        ),

        config.devtool = "cheap-source-map",
        config.devServer = {
            port:8080,
            hot:true,
            inline:true
        }
    }

    return config
}