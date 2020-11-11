// pages/homepage/homepage.js
import {
  getPatientInfoUrl
} from "../../utils/config";
import {
  tokenRequest
} from "../../utils/http";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: {
      patientID:250,
      name:"张三风",
      age:45,
      sex:"男",
    }
  },

  getPatientInfo(patientID) {
    const url = getPatientInfoUrl;
    const data = {
      patientID,
    }
    const that = this;
    tokenRequest({url, data}).then(res=>{
      if(res.data.success) {
        let result = res.data.result;
        that.setData({
          userinfo: result,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  gotoUserinfo() {
    let userinfo = JSON.stringify(this.data.userinfo);
    wx.navigateTo({
      url: '../userinfo/userinfo?userinfo=' + userinfo,
    })
  },

  gotoCenter() {
    wx.navigateTo({
      url: '../center/center',
    })
  },

  gotoUA() {
    wx.navigateTo({
      url: '../ua/index/index?patientID=' + this.data.patientID + '&&sex=' + this.data.userinfo.sex,
    })
  },

  gotoFlu() {
    wx.navigateTo({
      url: '../flu/index/index?patientID=' + this.data.patientID + '&&sex=' + this.data.userinfo.sex,
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
    const patientID = wx.getStorageSync("patientID");
    this.setData({
      patientID,
    })
    this.getPatientInfo(patientID);
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