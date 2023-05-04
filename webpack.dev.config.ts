import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { Configuration as WebpackConfig, HotModuleReplacementPlugin } from "webpack";
import { Configuration as WebpackDevServerConfig } from "webpack-dev-server";

type Configuration = WebpackConfig & {
    devServer?: WebpackDevServerConfig;
};

const config: Configuration = {
    mode: "development",
    output: {
        publicPath: "/",
    },
    entry: "./src/index.tsx",
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
            {
                test: /\.(jpg|jpeg|png|svg|gif|ttf|m4v)$/i,
                exclude: /node_modules/,
                type: "asset/resource",
            },
            {
                test: /\.(ts|js)x?$/i,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript",
                        ],
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html",
        }),
        new HotModuleReplacementPlugin(),
    ],
    devtool: "inline-source-map",
    devServer: {
        static: path.join(__dirname, "dist"),
        historyApiFallback: true,
        port: 4000,
    },
};

export default config;
