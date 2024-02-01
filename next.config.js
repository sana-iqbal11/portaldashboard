/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const webpack = require('webpack')

/** @type {import('next').NextConfig} */

// Remove this if you're not using Fullcalendar features

module.exports = {
  trailingSlash: true,
  reactStrictMode: false,
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    config.plugins.push(
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      })
    )

    return config
  }
}
