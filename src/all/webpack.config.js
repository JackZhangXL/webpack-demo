const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { WebPlugin } = require('web-webpack-plugin');

const jsRule = {
    test: /\.js$/,
    use: ['babel-loader'],
    exclude: path.resolve(__dirname, '../../node_modules'),
};

const urlRule = {
    test: /\.(png|jpg|jpeg|gif)$/,
    use: [
        {
            loader: 'url-loader',
            options: {
                limit: 8192,
                name: 'images/[name].[ext]',
                fallback: 'file-loader',
            },
        },
    ],
};

const cssRule = {
    test: /\.css$/,
    use: [
        'style-loader',
        {
            loader: 'css-loader',
            options: {
                minimize: true,
            },
        },
    ],
};

const pcssRule = {
    test: /\.pcss$/,
    use: [
        'style-loader',
        {
            loader: 'css-loader',
            options: {
                minimize: true,
            },
        },
        {
            loader: 'postcss-loader',
            options: {
                config: {
                    path: path.join(__dirname, 'postcss.config.js'),
                },
            },
        },
    ],
};

const lessRule = {
    test: /\.less$/,
    use: [
        'style-loader',
        {
            loader: 'css-loader',
            options: {
                minimize: true,
            },
        },
        'less-loader',
    ],
};

module.exports = function (env = {}, argv) {
    const plugins = [
        new ExtractTextPlugin({
            filename: `[name]_[contenthash:8].css`,
        }),
        new WebPlugin({
            template: 'template.html',
            filename: 'index.html',
            requires: ['main']
        }),
    ];

    const isProduction = env['production'];

    // 在生成环境才压缩
    if (isProduction) {
        plugins.push(
            new UglifyJsPlugin()
        );
    }

    return {
        entry: './index.js',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, './dist'),
        },
        module: {
            rules: [
                jsRule,
                urlRule,
                cssRule,
                pcssRule,
                lessRule,
            ]
        },
        plugins: plugins,
        devtool: isProduction ? undefined : 'source-map',
    };
};
