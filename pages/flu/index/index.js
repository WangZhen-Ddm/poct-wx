const { patientGetFluRecordsByTimeGapUrl } = require("../../../utils/config");
const { formatTime } = require("../../../utils/util");
const { tokenRequest } = require("../../../utils/http");

// pages/flu/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  getFluRecordsByTimeGap() {
    let url = patientGetFluRecordsByTimeGapUrl;
    const now = new Date();
    const startTime = formatTime(new Date(now.getTime() - 300 * 24 * 3600000));
    const endTime = formatTime(new Date(now.getTime() + 24 * 3600000));
    const data = {
      patientID: this.data.patientID,
      startTime,
      endTime,
    }
    const that = this;
    var flus = {
      date: [],
      time: [],
      flu: []
    }
    tokenRequest({url, data}).then(res=>{
      let r = res.data.result;
      r.map(function(item) {
        flus.date.push(item.measureDateTime.split(" ")[0]);
        flus.time.push(item.measureDateTime.split(" ")[1]);
        flus.flu.push(item.fluorescent)
      })
      that.setData({
        flus,
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
    this.getFluRecordsByTimeGap();
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