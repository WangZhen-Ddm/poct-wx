const { loginUrl } = require("../../utils/config");
const { APPLICATION_JSON, request } = require("../../utils/http");
var app = getApp();

Page({
  onLoad: function () {
    const timeout = 1000;
    wx.getSystemInfo({
      success: function(res) {
        app.globalData.windowWidth = res.windowWidth;
        app.globalData.windowHeight = res.windowHeight;
      }
    });
    let role = wx.getStorageSync("role");
    var username = wx.getStorageSync("username");
    var password = wx.getStorageSync("password");
    if(role==1) {
      if(username) {
        setTimeout(() => {
          this.login(username, password);
        }, timeout);
      }
    } else if(role==2) {
      if(username) {
        setTimeout(() => {
          this.adminLogin(username, password);
        }, timeout);
      }
    } else {
      setTimeout(() => {
        wx.reLaunch({ url: '/pages/index/index'});
      }, timeout);
    }
  },

  login(username, password) {
      const url = loginUrl;
      let header = APPLICATION_JSON;
      const data = {
        username,
        password,
      }
      request({url, data, header}).then(res=>{
        if(res.statusCode==200) {
          wx.setStorageSync("token", res.header.Authorization);
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
  },
  adminLogin(username, password) {
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
            url:'../admin/homepage/homepage',
          })
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 1500,
          })
        }
      })
  },
});