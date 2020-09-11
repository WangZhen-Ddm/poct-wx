const { patientGetUricAcidRecordsByTimeGapUrl } = require("../../../utils/config");
const { formatTime } = require("../../../utils/util");
const { tokenRequest } = require("../../../utils/http");

// pages/ua/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  getUricAcidRecordsByTimeGap() {
    let url = patientGetUricAcidRecordsByTimeGapUrl;
    const now = new Date();
    const startTime = formatTime(new Date(now.getTime() - 300 * 24 * 3600000));
    const endTime = formatTime(new Date(now.getTime() + 24 * 3600000));
    const data = {
      patientID: this.data.patientID,
      startTime,
      endTime,
    }
    const that = this;
    var uas = {
      date: [],
      time: [],
      ua: []
    }
    tokenRequest({url, data}).then(res=>{
      let r = res.data.result;
      r.map(function(item) {
        uas.date.push(item.measureDateTime.split(" ")[0]);
        uas.time.push(item.measureDateTime.split(" ")[1]);
        uas.ua.push(item.uricAcid.toFixed(3)*1000)
      })
      that.setData({
        uas,
      })
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
    this.getUricAcidRecordsByTimeGap();
  },

  gotoChart() {
    wx.navigateTo({
      url: '../ua?patientID=' + this.data.patientID + '&&sex=' + this.data.sex,
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