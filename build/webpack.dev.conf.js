'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

// 读取本地json数据
const express = require('express')
//请求server
const app = express()
// 加载本地数据文件
const allHouseData = require('../static/api/house-service/allHouse')
const houseDetail = require('../static/api/house-service/getDetail')
const latestComment = require('../static/api/comment-service/house/getLastComment')
const bookingTime = require('../static/api/reserve-service/create')
const houseComments = require('../static/api/comment-service/house/getComments')
const commentsForPublisher = require('../static/api/comment-service/user/getComments')
const publishHouse = require('../static/api/house-service/issueHouse')
const myHouseInfo = require('../static/api/house-service/getMyHouse')
const myIssuerReserve = require('../static/api/reserve-service/getMyIssuerReserve')
const issuerReserve = require('../static/api/transaction-service/getIssuerTransaction')
const modifyReserve = require('../static/api/reserve-service/modify')
const confirmReserve = require('../static/api/reserve-service/confirm')
const cancelTransaction = require('../static/api/transaction-service/cancel')
const confirmTransaction = require('../static/api/transaction-service/confirm')
const appealTips = require('../static/api/transaction-service/applytips')
const withdrawCash = require('../static/api/user-service/account/withdrawCash')
const myMessages = require('../static/api/msg-service/getMyMessages')
const myTransactions = require('../static/api/payment-service/getMyOrders')
const myBankcards = require('../static/api/user-service/account/getMyBankcard')
const login = require('../static/api/user-service/login')
const apiRoutes = express.Router()
//通过路由请求数据
app.use('/', apiRoutes)


const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
      before(app) {
          app.post('/house-service/allHouse', (req, res) => {
              res.json(allHouseData)
          }),
          app.get('/house-service/getDetail', (req, res) => {
              res.json(houseDetail)
          }),
          app.post('/comment-service/house/getLastComment', (req, res) => {
              res.json(latestComment)
          }),
          app.post('/reserve-service/create', (req, res) => {
              res.json(bookingTime)
          }),
          app.post('/comment-service/house/getComments', (req, res) => {
              res.json(houseComments)
          }),
          app.post('/comment-service/user/getComments', (req, res) => {
              res.json(commentsForPublisher)
          }),
          app.post('/house-service/issueHouse', (req, res) => {
              res.json(publishHouse)
          }),
          app.get('/house-service/getMyHouse', (req, res) => {
              res.json(myHouseInfo)
          }),
          app.get('/reserve-service/getMyIssuerReserve', (req, res) => {
              res.json(myIssuerReserve)
          }),
          app.get('/transaction-service/getIssuerTransaction', (req, res) => {
              res.json(issuerReserve)
          }),
          app.post('/reserve-service/modify', (req, res) => {
              res.json(modifyReserve)
          }),
          app.post('/reserve-service/confirm', (req, res) => {
              res.json(confirmReserve)
          }),
          app.post('/transaction-service/cancel', (req, res) => {
              res.json(cancelTransaction)
          }),
          app.post('/transaction-service/confirm', (req, res) => {
              res.json(confirmTransaction)
          }),
          app.post('/transaction-service/applytips', (req, res) => {
              res.json(appealTips)
          }),
          app.post('/user-service/account/withdrawCash', (req, res) => {
              res.json(withdrawCash)
          }),
          app.get('/msg-service/getMyMessages', (req, res) => {
              res.json(myMessages)
          }),
          app.get('/payment-service/getMyOrders', (req, res) => {
              res.json(myTransactions)
          }),
          app.post('/user-service/account/getMyBankcard', (req, res) => {
              res.json(myBankcards)
          }),
          app.post('/user-service/login', (req, res) => {
              res.json(login)
          })
      },

    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
