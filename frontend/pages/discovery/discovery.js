// pages/discovery/dicovery.js
var app = getApp()
var sectionData = null
var currentSectionIndex = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sections : {},
    groups : {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //获取分类信息，需要一个需要请求后端数据库
    wx.request({
      url: 'http://127.0.0.1/groups/hot',
      data: {},
      success: function (res) {
        sectionData = res.data.sections;
        sectionData[0]['active'] = true //默认选中第一个分类
        that.loadGroups(sectionData[0]['section_id'])
        that.setData({
          sections: sectionData
        });
      }
    })
  },

  onSectionClicked: function (e) {
    // 用户选中一个分类，会向服务器请求一次数据
    var sid = e.currentTarget.dataset.sid;
    //刷新选中状态
    for (var i in sectionData) {
      if (sectionData[i]['section_id'] == sid) {
        sectionData[i]['active'] = true
        currentSectionIndex = i
      }
      else
        sectionData[i]['active'] = false
    }
    this.setData({
      sections: sectionData
    });
    //加载小组信息
    if (sectionData[i]['groups']) {
      this.setData({
        groups: sectionData[i]['groups']
      });
    } else {
      this.loadGroups(sid)
    }
  },

  loadGroups: function (section_id) {
    var that = this
    //获取小组列表
    wx.request({
      // 开发时使用本地的数据库
      url: 'http://127.0.0.1/groups/group',
      method: 'POST',
      data: {
        section_id: section_id,
        start_id: 0,
        limit: 10 // 限制了一次加载十个小组的信息进行显示
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var groupsData = res.data.groups;
        sectionData[currentSectionIndex]['groups'] = groupsData
        that.setData({
          groups: groupsData
        });
      }
    })
  },
  // 点击一个小组的话查看具体信息
  onGroupClicked: function (e) {
    var gid = e.currentTarget.dataset.gid
    wx.navigateTo({
      url: '/pages/detail/detail?group_id=' + gid
    })
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