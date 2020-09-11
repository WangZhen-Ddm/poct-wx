// pages/ua/ua.js
import {
  patientGetUricAcidRecordsByTimeGapUrl,
} from "../../utils/config";
import {
  tokenRequest,
} from "../../utils/http";
import {
  formatTime,
  formatTime6,
} from "../../utils/util";
var wxCharts = require('../../utils/wxcharts.js');
var lineChart = null;
var app = getApp();
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
    tokenRequest({url, data}).then(res=>{
      that.setData({
        uas: res.data.result,
      })
      that.drawlinechart();
    })
  },

  createData: function () {
    var that = this;
    var chartsdate = {
      categories: [],
      ua: [],
      uaColor: [],
    };
    var uas = (this.data.uas);
    if (uas.length > 14) {
      that.setData({
        enableScroll: true
      })
    }
    else {
      that.setData({
        enableScroll: false
      })
    }
    let {uaTopGoal, uaLowGoal} = this.data;
    chartsdate.categories = uas.map(function (item) {
      chartsdate.ua.push(item.uricAcid.toFixed(3)*1000);
      chartsdate.uaColor.push(item.uricAcid>uaTopGoal||item.uricAcid<uaLowGoal ? '#FF4500': '#666666');
      return formatTime6(item.measureDateTime)
    })
    chartsdate.categories.push('')
    return chartsdate
  },

  drawlinechart: function () {

    var weekData = this.createData();
    this.setData({weekData})
    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      categories: weekData.categories,
      animation: true,
      series: [{
        name: '尿酸',
        data: weekData.ua,
        pointColor: weekData.uaColor
      }],
      xAxis: {
        disableGrid: false
      },
      yAxis: {
        title: '尿酸umol/L',
        format: function (val) {
          return val.toFixed(0);
        },
        min: 0,
        max: 1000,
      },
      width: this.data.windowWidth,
      height: this.data.windowHeight*0.95,
      dataLabel: true,
      dataPointShape: true,
      enableScroll: this.data.enableScroll,
      extra: {
        lineStyle: 'curve'
      },
      drawDashedLine: true,
      dashedLine:[{
        endX:50,
        endY:this.data.uaTopGoal*1000,
        startX:500,
        startY:this.data.uaTopGoal*1000,
        lineLength:5,
        color:"#FF4500",
      },{
        endX:50,
        endY:this.data.uaLowGoal*1000,
        startX:500,
        startY:this.data.uaLowGoal*1000,
        lineLength:5,
        color:"#FF4500",
      }]
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      patientID: options.patientID,
      windowWidth: app.globalData.windowWidth,
      windowHeight: app.globalData.windowHeight,
    });
    let sex = options.sex;
    var uaTopGoal, uaLowGoal;
    if(sex=="男") {
      uaTopGoal = 0.416;
      uaLowGoal = 0.149;
    } else {
      uaTopGoal = 0.357;
      uaLowGoal = 0.89;
    }
    this.setData({
      uaTopGoal,
      uaLowGoal,
    })
    this.getUricAcidRecordsByTimeGap();
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