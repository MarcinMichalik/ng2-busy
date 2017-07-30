import * as webpack from 'webpack';
import * as path from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
var autoprefixer = require('autoprefixer');

const IS_PROD: boolean = process.argv.indexOf('-p') > -1;

export default {
    devtool: IS_PROD ? 'source-map' : 'eval',
    entry: path.join(__dirname, 'demo', 'entry.ts'),
    output: {
        filename: IS_PROD ? '[name]-[chunkhash].js' : '[name].js'
    },
    module: {
        rules: [{
            test: /\.ts$/,
            loader: 'tslint-loader?emitErrors=false&failOnHint=false',
            exclude: /node_modules/,
            enforce: 'pre'
        }, {
            test: /\.ts$/,
            loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
            exclude: /node_modules/
        }, {
            test: /\.html$/,
            loader: 'html-loader'
        },
			{test: /\.css$/, loader: 'raw-loader!postcss-loader'}
		]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    devServer: {
        port: 8000,
        inline: true,
        hot: true,
        historyApiFallback: true
    },
    plugins: [
        ...(IS_PROD ? [] : [new webpack.HotModuleReplacementPlugin()]),
		new webpack.LoaderOptionsPlugin({
			options: {
				/**
				 * Apply the tslint loader as pre/postLoader
				 * Reference: https://github.com/wbuchwalter/tslint-loader
				 */
				tslint: {
					emitErrors: false,
					failOnHint: false
				},
				/**
				 * Sass
				 * Reference: https://github.com/jtangelder/sass-loader
				 * Transforms .scss files to .css
				 */
				sassLoader: {
					//includePaths: [path.resolve(__dirname, "node_modules/foundation-sites/scss")]
				},
				/**
				 * PostCSS
				 * Reference: https://github.com/postcss/autoprefixer-core
				 * Add vendor prefixes to your css
				 */
				postcss: [
					autoprefixer({
						browsers: ['last 2 version']
					})
				]
			}
		}),
        new webpack.DefinePlugin({
            ENV: JSON.stringify(IS_PROD ? 'production' : 'development')
        }),
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            path.join(__dirname, 'src')
        ),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'demo', 'index.ejs')
        }),
		new ExtractTextPlugin({filename: 'css/[name].[hash].css'})

    ]
};
