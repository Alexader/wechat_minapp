// pages/mainPage.js
var app = getApp()

Page({
  data: {
    // text:"这是一个页面"
    picker1Value: 0,
    picker1Range: ['1天', '2天', '3天', '5天', '一周', '两周', '一个月'],
    timeValue: '08:08',
    dateValue: '2018-7-11'
  },
  normalPickerBindchange: function (e) {
    this.setData({
      picker1Value: e.detail.value
    })
  },
  timePickerBindchange: function (e) {
    this.setData({
      timeValue: e.detail.value
    })
  },
  datePickerBindchange: function (e) {
    this.setData({
      dateValue: e.detail.value
    })
  },

  data: {
    logs: []
  },
  onLoad: function () {
    this.getdata();

  },

  getdata: function () {//定义函数名称
    var that = this;   // 这个地方非常重要，重置data{}里数据时候setData方法的this应为以及函数的this, 如果在下方的sucess直接写this就变成了wx.request()的this了
    wx.request({
      url: 'http://www.w.com',//请求地址
      data: {//发送给后台的数据
        days: picker1Value,
        time: timeValue,
        date: dateValue
      },
      header: {//请求头
        "Content-Type": "applciation/json"
      },
      method: "GET",//get为默认方法/POST
      success: function (res) {
        console.log(res.data);//res.data相当于ajax里面的data,为后台返回的数据
        that.setData({//如果在sucess直接写this就变成了wx.request()的this了.必须为getdata函数的this,不然无法重置调用函数

          logs: res.data.result

        })

      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    })
  },


  
  /**
   * 页面的初始数据
   */
  data: {
    userInfo : {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("load main page")
    var that = this;
    //调用应用实例的方法获取全局数据
    that.setData({
      userInfo: app.globalData.userInfo
    })
    console.log(this.data.userInfo);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})