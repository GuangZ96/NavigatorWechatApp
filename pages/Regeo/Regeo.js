// pages/Regeo/Regeo.js
var amapFile = require('../../utils/amap-wx.js')
var config = require('../../utils/config.js');
Page({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    textData: {},
    city: '',
    lati:"",
    lon:"",
  },
  
  onLoad: function (options) {
    var that = this;
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({ key: key });
    myAmapFun.getRegeo({
      iconPath:"/pngs/location.png",
      iconWidth:22,
      iconHeight: 32,
      success: function(data) {
        var marker = [{
          id: data[0].id,
          latitude: data[0].latitude,
          longitude: data[0].longitude,
          iconPath: data[0].iconPath,
          width: data[0].width,
          height: data[0].height
        }]
        
        that.setData({
          markers: marker
        });
        that.setData({
          latitude: data[0].latitude
        });
        //console.log(that.data.latitude)
        var abcd = that.data.latitude
        wx.setStorageSync('abcd', abcd)
        that.setData({
          longitude: data[0].longitude
        });
        var dcba = that.data.longitude
        wx.setStorageSync('dcba', dcba)
        that.setData({
          textData: {
            name: data[0].name,
            desc: data[0].desc,
            lati: data[0].latitude,
            lon: data[0].longitude,
          }
        })
      },
      fail: function (info) {
        // wx.showModal({title:info.errMsg})
      },
    })
  },
  bindInput: function (e) {
    var url = '../inputs/inputs?lati=' + this.data.textData.lati + '&lon=' + this.data.textData.lon;
    /*if (e.target.dataset.latitude && e.target.dataset.longitude && e.target.dataset.city) {
      var dataset = e.target.dataset;
      url = url + '?lonlat=' + dataset.longitude + ',' + dataset.latitude + '&city=' + dataset.city;
    }*/
    wx.navigateTo({
      url: url//+'?lati='+this.data[0].latitude,
    })
    
  }
})