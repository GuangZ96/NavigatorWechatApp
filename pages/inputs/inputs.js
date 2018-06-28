// pages/inputs/inputs.js
var amapFile = require('../../utils/amap-wx.js')
var config = require('../../utils/config.js');
var lonlat;var lon;
var lati;
var city;
Page({
  data: {
    tips:{},
    la:"",
    long:""
  },
  onLoad: function (options) {
    lonlat = options.lonlat;
    city = options.city;
    lati = options.lati;
    lon = options.lon;
    this.setData({
      la:lati,
      long:lon
    })
  },
  bindInput: function(e)
  {
    var that = this;
    var keywords = e.detail.value;
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({ key: key });
    myAmapFun.getInputtips({
      keywords: keywords,
      location: lonlat,
      city: city,
      success: function (data) {
        if (data && data.tips) {
          that.setData({
            tips: data.tips
          });
        }
      }
    })
  },
  bindSearch: function (e) {
    var keywords = e.target.dataset.keywords;
    var url = '../index/index?keywords=' + keywords + '&la=' + this.data.la + '&long=' + this.data.long;
    wx.redirectTo({
      url: url
    })
  }
})