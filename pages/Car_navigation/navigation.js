// pages/Car_navigation/navigation.js
var amapFile = require('../../utils/amap-wx.js')
var config = require('../../utils/config.js');
var yjd,ywd,desjd,deswd;
Page({
  data: {
    markers:[{
      iconPath:"/pngs/mapicon_navi_s.png",
      id:0,
      latitude: '',
      longitude: '',
      width:23,
      height:33
    },{
        iconPath:"/pngs/mapicon_navi_e.png",
        id:0,
        latitude: "",
        longitude: "",
        width: 24,
        height: 34
    }],
    distance:'',
    cost: '',
    polyline: [],
  },
  onLoad: function (options) {
    yjd=options.yuanjin;
    ywd=options.yuanwei;
    desjd=options.desjingdu;
    deswd=options.desweidu;
    var abcd = wx.getStorageSync('abcd')
    var dcba = wx.getStorageSync('dcba')
    var yuio = wx.getStorageSync('yuio')
    var oiuy = wx.getStorageSync('oiuy')
    this.setData({
      'markers[0].latitude': abcd,
      'markers[0].longitude': dcba,
      'markers[1].latitude': oiuy,
      'markers[1].longitude':yuio,
    })
    console.log(yuio)
    var that = this;
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({ key: key });
    myAmapFun.getDrivingRoute
    ({
        origin:''+dcba+''+','+''+abcd+'',
        destination:''+yuio+''+','+''+oiuy+'',
      success: function(data)
      {
        var points = [];
        if(data.paths && data.paths[0] && data.paths[0].steps)
        {
          var steps = data.paths[0].steps;
          for(var i = 0;i<steps.length;i++)
          {
            var poLen = steps[i].polyline.split(';');
            for (var j = 0; j < poLen.length; j++)
            {
              points.push
              ({
                longitude: parseFloat(poLen[j].split(',')[0]),
                latitude: parseFloat(poLen[j].split(',')[1])
              })
            }
          }
        }
        that.setData({
          polyline: [{
            points: points,
            color: "#0091ff",
            width: 6
          }]
        });
        if (data.paths[0] && data.paths[0].distance) {
          that.setData({
            distance: data.paths[0].distance + '米'
          });
        }
        if (data.taxi_cost) {
          that.setData({
            cost: '打车约' + parseInt(data.taxi_cost) + '元'
          });
        }
      }
    })
  },
  goDetail:function() {
    wx.navigateTo({
      url: '../Car_navigation_detail/navigation',
    })
  },
  goToCar: function (e) {
    wx.redirectTo({
      url: '../Car_navigation/navigation'
    })
  },
  goToBus: function (e) {
    wx.redirectTo({
      url: '../Bus_navigation/navigation',
    })
  }
})