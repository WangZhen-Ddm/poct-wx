// pages/ua/detail/detail.js
const { getUaTipUrl } = require("../../../utils/config");
const { tokenRequest } = require("../../../utils/http");
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  getUaTip() {
    const url = getUaTipUrl;
    const data = {
      patientID: this.data.patientID,
      ua: this.data.ua,
    }
    tokenRequest({url, data}).then(res=>{
      if(res.data.success) {
        let result = res.data.result;
        this.setData({
          tips: result.tips,
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
      ua: options.ua,
      date: options.date,
      time: options.time,
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
    this.getUaTip()
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