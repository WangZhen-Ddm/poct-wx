const { patientGetUricAcidRecordsByTimeGapUrl, getMonthUaReportUrl, getWeekUaReportUrl } = require("../../../utils/config");
const { tokenRequest } = require("../../../utils/http");
const { formatTime6, formatTime } = require("../../../utils/util");
var wxCharts = require('../../../utils/wxcharts.js');
var lineChart = null;
import * as echarts from '../../../components/ec-canvas/echarts.min';
var app = getApp()
// pages/ua/history/history.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbarData: {
      tabs: ["日志","曲线","统计"]
    },
    content: false,
    ec1: {
      lazyLoad: true,
    },
    ec4: {
      lazyLoad: true,
    },
    index: 0,
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
      let result = res.data.result
      result.forEach(e=>{
        var arr = e.measureDateTime.split(' ');
        e.date = arr[0]
        e.time = arr[1]
      })
      that.setData({
        uas: result
      })
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
      chartsdate.ua.push(item.uricAcid.toFixed(0));
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
    this.setData({
      patientID: options.patientID,
      sex: options.sex,
      windowWidth: app.globalData.windowWidth,
      windowHeight: app.globalData.windowHeight,
    });
    var uaGoal;
    uaGoal = options.sex=="男"?416:357;
    this.setData({
      uaGoal
    })
  },

  getIndex(e) {
    this.setData({
      index: e.detail,
    })
    if(e.detail==0) {
      this.getUricAcidRecordsByTimeGap();
    } else if(e.detail==1) {
      this.drawlinechart();
    } else if(e.detail==2) {
      this.getWeekUaReport();
    }
  },

  setOption1: function (chart) {
    let times = this.data.weekUaData.times
    var option = {
      color:[ '#00B58C'],
      title:{
          text: times,
          subtext:'总测试次数',
          textStyle: {
            fontSize: 30,
            fontWeight: "bold"
          },
          itemGap: 0,
          subtextStyle: {
            fontSize: 11,
            fontStyle: "normal",
            fontWeight: "lighter"
          },
          left:'center',
          top:'center'
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['80%', '100%'],
          label: {
            show: false,
            position: 'center'
        },
          data: [
              {value: 1},
          ]
      }

      ]
    };
    chart.setOption(option);
  },
  init1: function () {
    this.ecComponent1.init((canvas, width, height) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
      });
      this.setOption1(chart);
      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      this.chart = chart;

      this.setData({
        isLoaded: true,
        isDisposed: false,
      });

      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });
  },

  setOption4: function (chart) {
    let times = this.data.monthUaData.times
    var option = {
      color:[ '#00B58C'],
      title:{
          text: times,
          subtext:'总测试次数',
          textStyle: {
            fontSize: 30,
            fontWeight: "bold"
          },
          itemGap: 0,
          subtextStyle: {
            fontSize: 11,
            fontStyle: "normal",
            fontWeight: "lighter"
          },
          left:'center',
          top:'center'
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['80%', '100%'],
          label: {
            show: false,
            position: 'center'
        },
          data: [
              {value: 1},
          ]
      }

      ]
    };
    chart.setOption(option);
  },
  init4: function () {
    this.ecComponent4.init((canvas, width, height) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
      });
      this.setOption4(chart);
      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      this.chart = chart;

      this.setData({
        isLoaded: true,
        isDisposed: false,
      });

      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });
  },

  getWeekUaReport() {
    const url = getWeekUaReportUrl;
    const that = this;
    const data = {
      patientID: this.data.patientID,
    }
    tokenRequest({url, data}).then(res=>{
      if(res.data.success) {
        let result = res.data.result;
        that.setData({
          weekUaData: result
        })
        this.getMonthUaReport();
      }
    })
  },

  getMonthUaReport() {
    const url = getMonthUaReportUrl;
    const that = this;
    const data = {
      patientID: this.data.patientID,
    }
    tokenRequest({url, data}).then(res=>{
      if(res.data.success) {
        let result = res.data.result;
        that.setData({
          monthUaData: result
        })
        this.ecComponent1 = this.selectComponent('#mychart-dom-bar1');
        this.init1();
        this.ecComponent4 = this.selectComponent('#mychart-dom-bar4');
        this.init4();
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
    this.getUricAcidRecordsByTimeGap();
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