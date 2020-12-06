// pages/homepage/homepage.js
import {
  getLatestMessageUrl,
  getPatientInfoUrl, givePatientMessageUrl, patientGetFluRecordsByTimeGapUrl
} from "../../utils/config";
import {
  APPLICATION_JSON,
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
    },
    hasRole: false,
    detail:"",
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

  getLatestMessage(patientID) {
    const url = getLatestMessageUrl;
    const that = this;
    const data = {
      patientID,
    }
    tokenRequest({url, data}).then(res=>{
      if(res.data.success) {
        let result = res.data.result;
        that.setData({
          message: result,
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
    }
    this.setData({
      hasRole
    })
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
      url: '../ua/ua/ua?patientID=' + this.data.patientID + '&&sex=' + this.data.userinfo.sex,
    })
  },

  gotoFlu() {
    wx.navigateTo({
      url: '../flu/index/index?patientID=' + this.data.patientID + '&&sex=' + this.data.userinfo.sex,
    })
  },

  gotoDm() {
    wx.navigateTo({
      url: '../dm/dm/dm?patientID=' + this.data.patientID,
    })
  },
  
  
  messageInput(e) {
    this.setData({
      detail: e.detail.value
    })
  },

  giveMessage() {
    const url = givePatientMessageUrl;
    const data = {
      patientID: this.data.patientID,
      detail: this.data.detail,
      doctorName: this.data.doctorName||"管理员",
      doctorID: this.data.doctorID||"admin",
    }
    const that = this;
    let header = {
      APPLICATION_JSON,
      'Authorization':wx.getStorageSync('token')
    };
    tokenRequest({url, data, header}).then(res=>{
      if(res.data.success) {
        wx.showToast({
          title: "留言成功",
          content: "可重新留言覆盖上条"
        });
          
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
    const patientID = wx.getStorageSync("patientID");
    this.setData({
      patientID,
    })
    this.getPatientInfo(patientID);
    if(this.data.hasRole==false) {
      this.getLatestMessage(patientID);
    }
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