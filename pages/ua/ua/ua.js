const { getLatestUaUrl } = require("../../../utils/config");
const { tokenRequest } = require("../../../utils/http");

// pages/ua/ua/ua.js
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    time:"",
    ua:0,
  },
  
  getLatestUa() {
    const url = getLatestUaUrl;
    const that = this;
    const data = {
      patientID: this.data.patientID,
    }
    tokenRequest({url, data}).then(res=>{
      if(res.data.success) {
        let data = res.data.result;
        if(data==null) return;
        let timeArr = data.measureDateTime.split('-');
        that.setData({
          ua: data.uricAcid.toFixed(0),
          time: timeArr[1] + '月' + timeArr[2]
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      patientID: options.patientID,
      sex: options.sex,
    });
  },

  gotoInput() {
    wx.navigateTo({
      url: '../input/input?patientID=' + this.data.patientID,
    })
  },

  gotoHistory() {
    if(this.data.ua==0) {
      wx.showToast({
        title: '暂无数据',
        icon: 'none'
      })
      return;
    }
    wx.navigateTo({
      url: '../history/history?patientID=' + this.data.patientID + '&&sex=' + this.data.sex,
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
    this.getLatestUa();
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