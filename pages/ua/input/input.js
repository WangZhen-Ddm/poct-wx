const { commitUaRecordUrl } = require("../../../utils/config");
const { tokenRequest, APPLICATION_JSON } = require("../../../utils/http");
const { formatTime } = require("../../../utils/util");

// pages/ua/input/input.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      patientID: options.patientID,
    });
    let now = new Date();
    let time = formatTime(now);
    this.setData({
      time
    })
  },

  inputUa(e) {
    this.setData({
      ua: e.detail.value
    })
  },

  commitRecord() {
    const url = commitUaRecordUrl;
    if(this.data.dm&&this.data.dm<=0||this.data.dm>=100) {
      wx.showToast({
        title: "请检查输入",
        icon:"fail"
      })
      return
    }
    let header = {
      APPLICATION_JSON,
      'Authorization':wx.getStorageSync('token')
    };
    const data = {
      patientID: this.data.patientID,
      uricAcid: this.data.ua,
      measureDateTime: this.data.time,
    }
    tokenRequest({url, data, header}).then(res=>{
      if(res.data.success) {
        wx.showToast({
          title: '上传成功！',
          icon: 'success',
        });
        wx.navigateBack();
      }
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