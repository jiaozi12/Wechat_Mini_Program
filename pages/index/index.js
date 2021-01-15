//index.js
//获取应用实例
const app = getApp()

Page({
  
  data: {
    motto: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
  
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      motto: '小科欢迎小主人回家',
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    wx.showModal({
      title: '提示',
      content: '我是你的专属聊天机器人小科，接下来我会成为你的秘密树洞并给你最真挚的回应哦，你的生活将变得更加有趣(●’◡’●)',
      cancelText:'返回',
      cancelColor:'#ff0000',
      confirmText:'开始',
      confirmColor:'#00ff00',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.navigateTo({
            url: '../contact/contact',    //要跳转到的页面路径
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  //js部分示例代码
  //跳转到tabBar页面  
  gotoPage: function (e) {   
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    console.log(e.detail.userInfo)
    this.setData({
      motto: '小科欢迎小主人回家',
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    wx.showModal({
      title: '提示',
      content: '我是你的专属聊天机器人小科，接下来我会成为你的秘密树洞并给你最真挚的回应哦，你的生活将变得更加有趣(●’◡’●)',
      cancelText:'返回',
      cancelColor:'#ff0000',
      confirmText:'开始',
      confirmColor:'#00ff00',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.navigateTo({
            url: '../contact/contact',    //要跳转到的页面路径
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
},

  //跳转到guess页面
  gotoGuess: function (options) {
    wx.showModal({
      title: '提示',
      content: '小主觉得无聊嘛？那跟小科一起来玩猜拳游戏吧！只要点击石头、剪刀、布三者任意一个，即可开始游戏哦o(*￣▽￣*)ブ',
      cancelText:'回主菜单',
      cancelColor:'#ff0000',
      confirmText:'进入游戏',
      confirmColor:'#00ff00',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.navigateTo({
            url: '../guess/guess',    //要跳转到的页面路径
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

})
