// pages/admin/index/index.js
import {
  loginUrl
} from "../../../utils/config";
import {
  request,
  APPLICATION_JSON
} from "../../../utils/http";
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    password:'',
  },

  usernameInput(e) {
    this.setData({
      username: e.detail.value
    })
  },

  passwordInput(e) {
    this.setData({
      password: e.detail.value
    })
  },

  login() {
    if (this.data.username.length <= 0) {
      wx.showToast({
        title: '请输入ID',
        icon: 'none',
        duration: 2000
      });
    } else {
      const username = this.data.username;
      const password = this.data.password;
      const url = loginUrl;
      let header = APPLICATION_JSON;
      const data = {
        username,
        password,
      }
      request({url, data, header}).then(res=>{
        if(res.statusCode==200) {
          wx.setStorageSync("token", res.header.Authorization);
          wx.setStorageSync("username", username);
          wx.setStorageSync("password", password);
          wx.setStorageSync("role", 2);//权限,1-患者，2-医生
          wx.switchTab({
            url:'../homepage/homepage',
          })
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 1500,
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var username = wx.getStorageSync("username");
      var password = wx.getStorageSync("password");
      this.setData({
        username,
        password,
      });
      if(username) {
        this.login();
      }
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