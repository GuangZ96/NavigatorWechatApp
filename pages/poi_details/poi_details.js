// pages/poi_details/poi_details.js
Page({
  data: {
    name: '',
    addr: '',
    types: '',
    imgs: {},
  },
  onLoad: function (options) {
    var that = this
    this.setData({
      name: options.aaa,
      addr: options.bbb,
    })
    //console.log(this.data.name)
    wx.request({
      url: 'https://image.baidu.com/search/index?tn=baiduimage&ipn=r&ct=201326592&cl=2&lm=-1&st=-1&fm=index&fr=&hs=0&xthttps=111111&sf=1&fmq=&pv=&ic=0&nc=1&z=&se=1&showtab=0&fb=0&width=&height=&face=0&istype=2&ie=utf-8&word=' + this.data.name,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var body = res.data;
        body = body.match(/(http:).*?\.(jpg)/)
        //console.log(res.data.match(/(http:).*?\.(jpg)/))
        res.data = body[0]
        that.setData({
          imgs: {
            imgurl: res.data
          }
        })
      }
    })

  }
})