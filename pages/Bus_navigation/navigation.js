// pages/Bus_navigation/navigation.js
var amapFile = require('../../utils/amap-wx.js')
var config = require('../../utils/config.js');
Page({
  data: {
    markers: [{
      iconPath: "/pngs/mapicon_navi_s.png",
      id: 0,
      latitude: '',
      longitude: '',
      width: 23,
      height: 33
    }, {
      iconPath: "/pngs/mapicon_navi_e.png",
      id: 0,
      latitude: "",
      longitude: "",
      width: 24,
      height: 34
    }],
    distance: '',
    cost: '',
    transits: [],
    polyline: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var abcd = wx.getStorageSync('abcd')
    var dcba = wx.getStorageSync('dcba')
    var yuio = wx.getStorageSync('yuio')
    var oiuy = wx.getStorageSync('oiuy')
    this.setData({
      'markers[0].latitude': abcd,
      'markers[0].longitude': dcba,
      'markers[1].latitude': oiuy,
      'markers[1].longitude': yuio,
    })
    var that = this;
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({ key: key });
    myAmapFun.getTransitRoute({
      origin: '' + dcba + '' + ',' + '' + abcd + '',
      destination: '' + yuio + '' + ',' + '' + oiuy + '',
      city: '广州',
      success: function (data) {
        if (data && data.transits) {
          var transits = data.transits;
          for (var i = 0; i < transits.length; i++) {
            var segments = transits[i].segments;
            transits[i].transport = [];
            for (var j = 0; j < segments.length; j++) {
              if (segments[j].bus && segments[j].bus.buslines && segments[j].bus.buslines[0] && segments[j].bus.buslines[0].name) {
                var name = segments[j].bus.buslines[0].name
                if (j !== 0) {
                  name = '--' + name;
                }
                transits[i].transport.push(name);
              }
            }
          }
        }
        that.setData({
          transits: transits
        });

      },
      fail: function (info) {

      }
    })
  },
  goToCar: function (e) {
    wx.redirectTo({
      url: '../Car_navigation/navigation'
    })
  },
  goToBus: function (e) {
    wx.redirectTo({
      url: '../Bus_navigation/navigation'
    })
  }
})