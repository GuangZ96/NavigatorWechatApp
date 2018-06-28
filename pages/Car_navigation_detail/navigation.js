var amapFile = require('../../utils/amap-wx.js')
var config = require('../../utils/config.js');
Page({
  data: {
    steps: {}
  },
  onLoad: function (options) {
    var abcd = wx.getStorageSync('abcd')
    var dcba = wx.getStorageSync('dcba')
    var yuio = wx.getStorageSync('yuio')
    var oiuy = wx.getStorageSync('oiuy')
    var that = this;
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({ key: key });
    myAmapFun.getDrivingRoute({
      origin: '' + dcba + '' + ',' + '' + abcd + '',
      destination: '' + yuio + '' + ',' + '' + oiuy + '',
      success: function (data) {
        if (data.paths && data.paths[0] && data.paths[0].steps) {
          that.setData({
            steps: data.paths[0].steps
          });
        }

      },
      fail: function (info) {

      }
    })
  },
  
})