// pages/contact/contact.js
const app = getApp();
var inputVal = '';
var msgList = [];
var windowWidth = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;
var keyHeight = 0;

/**
 * 初始化数据
 */
function initData(that) {
  inputVal = '';
  msgList = [{
      speaker: 'server',
      contentType: 'text',
      content: '你好😊'
    },
    /*
    {
      speaker: 'customer',
      contentType: 'text',
      content: '你好'
    }
    */
  ]
  that.setData({
    msgList,
    inputVal
  })
}

/**
 * 计算msg总高度
 */
 function calScrollHeight(that, keyHeight) {
   var query = wx.createSelectorQuery();
   query.select('.scrollMsg').boundingClientRect(function(rect) {
   }).exec();
 }

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight: '100vh',
    inputBottom: 0, 
    inputValue: '',
    returnValue: '',
    key: "d13b441029804ee99fc4e3b617a5f557", //图灵机器人秘钥
    //key: "854c8d93815949f68bc63e90886c4ede",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    initData(this);
    this.setData({
      cusHeadIcon: app.globalData.userInfo.avatarUrl,
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 获取聚焦
   */
  focus: function(e) {
    keyHeight = e.detail.height;
    this.setData({
      scrollHeight: (windowHeight - keyHeight) + 'px'
    });
    this.setData({
      toView: 'msg-' + (msgList.length - 1),
      inputBottom: keyHeight + 'px'
    });
    //计算msg高度
     calScrollHeight(this, keyHeight);

  },

  //失去聚焦(软键盘消失)
  blur: function(e) {
    this.setData({
      scrollHeight: '100vh',
      inputBottom: 0
    });
    this.setData({
      toView: 'msg-' + (msgList.length - 1)
    });

  },

  /**
   * 发送点击监听
   */
  sendClick: function(e) {
    msgList.push({
      speaker: 'customer',
      contentType: 'text',
      content: e.detail.value
    })
    inputVal = '';
    this.data.inputValue = e.detail.value
    this.setData({
      inputValue: e.detail.value,
      msgList,
      inputVal
    });

    //发送数据给图灵机器人
    let that = this;
    //将输入数据追加到列表里面
    //that.data.allContentList.push({"value": that.data.inputValue});
    //图灵接口
    let _url = `http://www.tuling123.com/openapi/api`;
    //系统封装的请求方法 ，注意这里没有ajajx的说法
    wx.request({
        url: _url, 
        data:{
            key: that.data.key,
            info: that.data.inputValue 
        },
        //封装返回数据格式
        header: {
            'Content-Type': 'application/json'
        },
        //请求成功的回调
        success: function(res) {
          let data = res.data;
          console.log(data);
          if(data.code === 100000){   //100000 表示返回成功
            //将返回值追加到列表
            console.log(data.text);
            msgList.push({
                speaker: 'server',
                contentType: 'text',
                content: data.text
            })
            //that.data.allContentList.push({"value": data.text});
            //调用set方法，告诉系统数据已经改变   启动循环，循环聊天信息
            that.setData({
                   returnValue: data.text,
                   msgList, 
                   toView: 'msg-' + (msgList.length - 1)
                   //allContentList: that.data.allContentList
               })
          
          }else{
               
          }
          
        }
      })
    
    //////

  },

  /**
   * 退回上一页
   */
  toBackClick: function() {
    wx.navigateBack({})
  },

})
