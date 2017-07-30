import * as path from 'path';
import * as fs from 'fs';
import * as webpack from 'webpack';
import * as angularExternals from 'webpack-angular-externals';
import * as rxjsExternals from 'webpack-rxjs-externals';
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const pkg = JSON.parse(fs.readFileSync('./package.json').toString());



const extractSass = new ExtractTextPlugin({
	filename: "[name].css",
	disable: process.env.NODE_ENV === "development"
});

export default {
    entry: {
    	'ng2-busy': path.join(__dirname, "src", "style", "ng2-busy.scss"),
        'ng2-busy.umd': path.join(__dirname, 'src', 'index.ts'),
        'ng2-busy.umd.min': path.join(__dirname, 'src', 'index.ts'),
    },
    output: {
        path: path.join(__dirname, 'dist', 'bundles'),
        filename: '[name].js',
        libraryTarget: 'umd',
        library: 'bsmodal'
    },
    externals: [
        angularExternals(),
        rxjsExternals()
    ],
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.ts$/,
            loader: 'tslint-loader?emitErrors=true&failOnHint=true',
            exclude: /node_modules/,
            enforce: 'pre'
        }, {
            test: /\.ts$/,
            loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
            exclude: /node_modules/
        }, {
			test: /\.scss$/,
			use: extractSass.extract({
				use: [{
					loader: "css-loader"
				}, {
					loader: "sass-loader"
				}],
				// use style-loader in development
				fallback: "style-loader"
			})
		}
		]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    plugins: [
		extractSass,
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            sourceMap: true
        }),
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            path.join(__dirname, 'src')
        ),
        new webpack.BannerPlugin({
            banner: `
/**
 * ${pkg.name} - ${pkg.description}
 * @version v${pkg.version}
 * @author ${pkg.author}
 * @link ${pkg.homepage}
 * @license ${pkg.license}
 */
      `.trim(),
            raw: true,
            entryOnly: true
        }),
		new CopyWebpackPlugin([
			{from: path.join(__dirname, "src", "style", "ng2-busy.scss"), to: path.join(__dirname, 'dist', 'bundles', 'style', "ng2-busy.scss")}
		])
    ]
};
