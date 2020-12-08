const { getLatestDmUrl, getKnoByTypeUrl } = require("../../../utils/config");
const { tokenRequest } = require("../../../utils/http");

// pages/dm/dm/dm.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time:"",
    dm: 0,
  },

  getLatestDm() {
    const url = getLatestDmUrl;
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
          dm: data.dm,
          time: timeArr[1] + '月' + timeArr[2]
        })
      }
    })
  },

  getKno() {
    const url = getKnoByTypeUrl;
    const that = this;
    const data = {
      type: 1,
    }
    tokenRequest({url, data}).then(res=>{
      if(res.data.success) {
        let data = res.data.result;
        that.setData({
          kno: data
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
    });
  },

  gotoInput() {
    wx.navigateTo({
      url: '../input/input?patientID=' + this.data.patientID,
    })
  },

  gotoHistory() {
    if(this.data.dm==0) {
      wx.showToast({
        title: '暂无数据',
        icon: 'none'
      })
      return;
    }
    wx.navigateTo({
      url: '../history/history?patientID=' + this.data.patientID,
    })
  },

  gotoKno() {
    wx.navigateTo({
      url: '../../kno/kno?knoID=' + this.data.kno.id
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
    this.getLatestDm();
    this.getKno();
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