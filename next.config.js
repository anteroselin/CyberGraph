/* eslint-disable @typescript-eslint/no-unused-vars */
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.glsl$/,
            loader: "webpack-glsl-loader",
        });

        return config;
    },
    
    distDir: 'build',

};

module.exports = nextConfig;