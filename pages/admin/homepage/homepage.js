// pages/admin/homepage/homepage.js
import {
  getPatientInfoListUrl
} from "../../../utils/config";
import {
  tokenRequest,
} from "../../../utils/http";
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  getPatientInfoList() {
    const url = getPatientInfoListUrl;
    const data = []
    const that = this;
    tokenRequest({url, data}).then(res=>{
      if(res.data.success) {
        let result = res.data.result;
        that.setData({
          patientList: result,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const role = wx.getStorageSync("role");
    var hasRole;
    if(role==1) {
      hasRole = false;
    } else {
      hasRole = true;
      this.getPatientInfoList();
    }
    this.setData({
      hasRole,
    })
  },
  
  gotoPatient(e) {
    wx.setStorageSync("patientID", e.currentTarget.dataset.patient);
    wx.switchTab({
      url: "../../homepage/homepage"
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