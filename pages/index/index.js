const app = getApp()
var amapFile = require('../../utils/amap-wx.js')
var config = require('../../utils/config.js');
var markersData = [];
var Jd,Wd;
Page({
  data: {
    markers: [],
    latitude:'',
    longitude:'',
    textData:{},
    city: '',
    jingdu:"",
    weidu:"",
  },
  markertap: function(e) {
    var id = e.markerId;
    var that = this;
    that.showMarkerInfo(markersData,id);
    that.changeMarkerColor(markersData,id);
  },
  
  navitap: function(e) {
    //console.log(this.data.textData.jjj,this.data.jingdu)
    /*var that = this;
    var yuio = that.data.textData.www
    wx.setStorageSync('yuio', yuio)
    var oiuy = that.data.textData.jjj
    wx.setStorageSync('oiuy', oiuy)*/
    
    wx.navigateTo({
      url: '../Car_navigation/navigation?yuanjin='+this.data.weidu+'&yuanwei='+this.data.jingdu
      +'&desjingdu='+this.data.textData.www+'&desweidu='+this.data.textData.jjj,
    })
    
  },
  onLoad: function (e) {
    Jd = e.la;
    Wd = e.long;
    this.setData({
      jingdu:Jd,
      weidu:Wd
    })
    var that = this;
    var myAmapFun = new amapFile.AMapWX({ key:'82c99c5209a812d7a01f15715ca304f1'});
    /*myAmapFun.getPoiAround({
      iconPathSelected:'/pngs/location-plus.png',
      iconPath:'/pngs/location.png',
      success: function(data) {
        markersData = data.markers;
        that.setData({
          markers:markersData
        });
        that.setData({
          latitude: markersData[0].latitude
        });
        that.setData({
          longitude: markersData[0].longitude
        });
        that.showMarkerInfo(markersData,0)
        
      },
      fail: function(info) {
        wx.showModal({ title: info.errMsg })
      }
    })*/
    //Jd = e.la;
    //Wd = e.long;
    //console.log(Jd,Wd)
    var params = {
      iconPathSelected: '/pngs/location-plus.png',
      iconPath: '/pngs/location.png',
      success: function(data) {
        markersData = data.markers;
        var poisData = data.poisData;
        var markers_new = [];
        markersData.forEach(function(item,index){
          markers_new.push({
            id: item.id,
            latitude: item.latitude,
            longitude: item.longitude,
            iconPath: item.iconPath,
            width: item.width,
            height: item.height
          })
        })
        if (markersData.length > 0) {
          that.setData({
            markers: markers_new
          });
          that.setData({
            city: poisData[0].cityname || ''
          });
          that.setData({
            latitude: markersData[0].latitude,
          });
          //var yuio = that.data.latitude
          //console.log(markersData[0].latitude)
          //wx.setStorageSync('yuio', yuio)  
          that.setData({
            longitude: markersData[0].longitude
          });
          //var oiuy = that.data.longitude
          //wx.setStorageSync('oiuy', oiuy)
          that.showMarkerInfo(markersData, 0);
          //console.log(that.showMarkerInfo(markersData,0))
        } else {
          wx.getLocation({
            type: 'gcj02',
            success: function (res) {
              that.setData({
                latitude: res.latitude
              });
              that.setData({
                longitude: res.longitude
              });
              that.setData({
                city: '北京市'
              });
            },
            fail: function () {
              that.setData({
                latitude: 39.909729
              });
              that.setData({
                longitude: 116.398419
              });
              that.setData({
                city: '北京市'
              });
            }
          })
          
          that.setData({
            textData: {
              name: '抱歉，未找到结果',
              desc: ''
            }
          });
        }
        
        // console.log(data)
      },
      fail: function (info) {
        // wx.showModal({title:info.errMsg})
      }
    }
    if(e && e.keywords) {
      params.querykeywords = e.keywords;
    }
    myAmapFun.getPoiAround(params)
  },
  bindInput: function(e){
    var that = this;
    var url = '/pages/inputs/inputs';
    if (e.target.dataset.latitude && e.target.dataset.longitude && e.target.dataset.city) {
      var dataset = e.target.dataset;
      url = url + '?lonlat=' + dataset.longitude + ',' + dataset.latitude + '&city=' + dataset.city;
    }
    wx.navigateTo({
      url: url,
    })
  },
  showMarkerInfo: function(data,i){
    var that = this;
    that.setData({
      textData: {
        name: data[i].name,
        desc: data[i].address,
        jjj:  data[i].latitude,
        www:  data[i].longitude,
      },
    });
    //console.log(data)
    //console.log(that.data.textData.jjj)
    var yuio = that.data.textData.www
     wx.setStorageSync('yuio', yuio)  
     var oiuy = that.data.textData.jjj
     wx.setStorageSync('oiuy', oiuy)
     
  },
  changeMarkerColor: function(data,i) {
    var that = this;
    var markers=[];
    for(var j =0;j<data.length;j++) {
      if (j == i) {
        data[j].iconPath = "/pngs/location-plus.png"; //如：..­/..­/img/marker_checked.png
      } else {
        data[j].iconPath = "/pngs/location.png"; //如：..­/..­/img/marker.png
      }
      markers.push({
        id: data[j].id,
        latitude: data[j].latitude,
        longitude: data[j].longitude,
        iconPath: data[j].iconPath,
        width: data[j].width,
        height: data[j].height
      })
    }
    that.setData({
      markers: markers
    });
  },
  navitoDetails: function () {
    wx.navigateTo({
      url: '../poi_details/poi_details?aaa=' + this.data.textData.name
      + '&bbb=' + this.data.textData.desc
    })
  }
  
})
