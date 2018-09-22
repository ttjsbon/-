// pages/userConsole/userConsole.
//const app = getApp()
Page({
  data: {
    openid:''
  },

  onLoad: function (options) {
	//app.globalData.openid = 'sb'
    this.setData({
      openid: getApp().globalData.openid
    })
  }
})