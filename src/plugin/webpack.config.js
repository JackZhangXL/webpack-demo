const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = function (env = {}, argv) {
    const plugins = [
        new ExtractTextPlugin({
            filename: `[name]_[contenthash:8].css`,
        }),
    ];

    const isProduction = env['production'];

    // 在生成环境才压缩
    if (isProduction) {
        plugins.push(
            new UglifyJsPlugin()
        )
    }

    return {
        entry: './index.js',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, './dist'),
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        use: ['css-loader'],
                    }),
                }
            ]
        },
        plugins: plugins,
        devtool: isProduction ? undefined : 'source-map',
    };
}
