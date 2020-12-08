const { getDmTipUrl } = require("../../../utils/config");
const { tokenRequest } = require("../../../utils/http");

// pages/dm/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    testResult: "",
    timePointArr: ["空腹","餐前","餐后","随机"],
    test: false,
    testShow: false,
  },

  getDmTip() {
    const url = getDmTipUrl;
    const data = {
      patientID: this.data.patientID,
      dm: this.data.dm,
      timePoint: this.data.timePoint,
    }
    tokenRequest({url, data}).then(res=>{
      if(res.data.success) {
        let result = res.data.result;
        this.setData({
          tips: result.tips,
          test: result.needTest,
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
      dm: options.dm,
      timePoint: options.timePoint,
      date: options.date,
      time: options.time,
    })
  },

  gotoTest() {
    this.setData({
      testShow: true
    })
  },

  hideModal() {
    this.setData({
      testShow: false
    })
  },

  bindModalInput(e) {
    this.setData({
      ogtt: e.detail.value
    })
  },

  onCancel() {
    this.hideModal()
  },

  onConfirm() {
    const url = getOgttTestResultUrl;
    const that = this;
    if(this.data.ogtt<=0||this.data.ogtt>100) {
      wx.showToast({
        title: "请输入正确的测试结果",
        icon:"none"
      })
      return;
    }
    const data = {
      patientID: this.data.patientID,
      result: this.data.ogtt,
    }
    let header = {
      APPLICATION_JSON,
      'Authorization':wx.getStorageSync('token')
    };
    tokenRequest({url, data, header}).then(res=>{
      if(res.data.success) {
        let result = res.data.result;
        that.setData({
          testResult: result.risk,
        })
      }
    })
    this.hideModal();
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
    this.getDmTip();
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