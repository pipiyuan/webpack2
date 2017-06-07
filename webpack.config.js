const fs = require('fs');
const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// // 获取 js文件目录下的 所有js文件，返回的是路径 数组
// const files = glob.sync('./src/js/**/*.js');
// // entries 如果全是对心方式，则是每个库单独打包，数组则是除主入口，其他库打包到一个文件
// let entries = {};
// 	files.forEach(function (value, index, arrary) {
// 		entries[path.basename(value, '.js')] = value;
// 	});

//entries.main = './src/main.js';

let config = {
	devtool: 'eval-source-map',
	entry: {
		main: './src/main.js',
		// venders: files
	}, 
	output: {
		// publicPath: '/', 
		path: path.resolve(__dirname, 'build'),	//打包后的文件存放的地方
		filename: 'entry/[name].js',			//打包后输出文件的文件名
	},
	module: {
		rules: [
			{
				test: /\.css$/, 
				exclude: /node_modules/,
				include: [
					path.resolve(__dirname, 'src/style')
				],
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader', 
					use: [
						{
							loader: 'css-loader',
							options: {
								url: false, //启用/禁用url（）处理
								minimize: false,
							}
						},
						'postcss-loader'
					]
				})
			},
			{
				test: /\.less$/, 
				exclude: /node_modules/,
				include: [
					path.resolve(__dirname, 'src/style')
				],
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader', 
					// use: ['css-loader', 'postcss-loader', 'less-loader']
					use: [
						{
							loader: 'css-loader',
							options: {
								url: false, //启用/禁用url（）处理
								minimize: false,
							}
						},
						'postcss-loader', 
						'less-loader'
					]
				})
			},
			{
				test: /\.(js)$/, 
				exclude: /node_modules/, 
				include: [
					path.resolve(__dirname, 'src/')
				],
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				}
			},
			// {
			// 	test: /\.(js|jsx)$/, 
			// 	exclude: /node_modules/, 
			// 	include: [
			// 		path.resolve(__dirname, 'src/js')
			// 	],
			// 	loader: 'babel-loader',
			// 	query: {
			// 		presets: ['es2015', 'react']
			// 	}
			// },
			// {
			// 	test: /\.pug$/,
			// 	loader: 'pug-loader',
			// 	options: {
			// 		pretty: true
			// 	}
			// },
			{
				test: /\.html$/,
				loader: 'html-loader',
				// options: {
				// 	minimize: true
				// }
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				exclude: /node_modules/,
				include: [
					path.resolve(__dirname, 'src/images')
				],
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'images/[name].[ext]'
						}
					},
					{
						loader: 'image-webpack-loader',
						options: {
							progressive: true,
							pngquant: {
								quality: '65-90',
								speed: 4
							}
						}
					}	
				]
			}
		]
	},
	plugins: [
		
    	/*new webpack.optimize.UglifyJsPlugin({
    		comments: false,        //去掉注释
	        compress: {
	            warnings: false    //忽略警告,要不然会有一大堆的黄色字体出现……
	        }
    	}), //压缩你的js代码*/
		new webpack.BannerPlugin('This file is created by pp'),
		new htmlWebpackPlugin({
			template:__dirname+'/src/index.html',
			hash: true,  //给生成的 js 文件一个独特的 hash 值
			/*minify: {
				removeComments: true,        //去注释
	            collapseWhitespace: true,    //压缩空格
	            removeAttributeQuotes: true  //去除属性引用
			},*/
			// title: 'Hello World app', // 如果你既指定了 template 选项，又指定了 title 选项,默认模板文件的 title, 即使你的模板文件中未设置 title。
		    // template: path.resolve(TEM_PATH, 'index.html'),
		    // filename: 'index.html',
		    // //chunks这个参数告诉插件要引用entry里面的哪几个入口
		    // chunks: ['app', 'vendors'],
		    // //要把script插入到标签里
		    // inject: 'head'
		    // favicon 
		}),
		new webpack.HotModuleReplacementPlugin(), //热加载
		new webpack.optimize.CommonsChunkPlugin('venders'),
		// new webpack.ProvidePlugin({ //把一个全局变量插入到所有的代码中 全局挂载
		// 	$: "jquery",
		// 	jQuery: "jquery",
		// 	"window.jQuery": "jquery",
		// 	// angular: 'angular',
		// }),
		new ExtractTextPlugin({
			filename:'style/[name]-[id].css',
			allChunks: true
		}),
		// new copyWebpackPlugin([
		// 	{
		// 		from: __dirname+'/src/libs',
		// 		to: 'libs/'	
		// 	},
		// 	{
		// 		from: __dirname+'/src/style/third_party/',
		// 		to: 'style/third_party/'	
		// 	},
		// ]),
	],
	resolve: {
        extensions: ['.js', '.jsx', '.less', '.scss', '.css'], //后缀名自动补全
        /*alias: {
		    jquery        : 'src/assets/jquery-vendor.js' //    将其指向jquery-vendor.js所在位置的 别名
		} */
    },
	devServer: {
		contentBase: './src',	//本地服务器所加载的页面所在的目录
		port: '8080',
		open: true,
	    historyApiFallback: true,	//不跳转; 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
	    inline: true,				//实时刷新
	    // proxy: {
	    // 	'/api/*':{
	    // 		target: 'http://m.maoyan.com',
	    // 		changeOrigin: true,
	    // 		pathRewrite: {'^/api': ''},
	    // 	}
	    // }
	}
}



// 遍历所有.html文件，使用HtmlWebpackPlugin将资源文件引入html中
const HTML_ROOT_PATH = './src/pages/';
const pagesState = fs.existsSync(HTML_ROOT_PATH); // 判断 pages 文件目录是否存在
if (pagesState) {
	const files = glob.sync(HTML_ROOT_PATH + '/**/*');
	files.forEach(function (file) {
	    if (fs.statSync(file).isFile()) {
	    	let extname = path.extname(file);
	    	if (extname === ".html" || extname === ".jade" || extname === ".pug") {
	    		// console.log(file);
		        config.plugins.push(
		        	new htmlWebpackPlugin({
			            title: '',
			            template: file,
			            filename: file.replace("src", "").replace(path.extname(file), ".html"),
			            // minify: isprod ? htmlMinifyOptions : false, // 生产模式下压缩html文件
			            //chunks: ['index', 'vendors'],   // 配置该html文件要添加的模块
			            // inject: 'body'
		        	})
		        )
		    }
	    }
	});
}

module.exports = config;









