const { getWeekDmUrl, getWeekDmReportUrl, getMonthDmReportUrl, getOgttTestResultUrl, APPLICATION_JSON } = require("../../../utils/config");
const { tokenRequest } = require("../../../utils/http");
const { formatTime6 } = require("../../../utils/util");
var wxCharts = require('../../../utils/wxcharts.js');
var lineChart = null;
import * as echarts from '../../../components/ec-canvas/echarts.min';

// pages/dm/history/history.js
let app =  getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbarData: {
      tabs: ["日志","曲线","统计"]
    },
    content: true,
    ec1: {
      lazyLoad: true,
    },
    ec2: {
      lazyLoad: true,
    },
    ec3: {
      lazyLoad: true,
    },
    ec4: {
      lazyLoad: true,
    },
    ec5: {
      lazyLoad: true,
    },
    ec6: {
      lazyLoad: true,
    },
    testShow: false,
    ogtt: 0,
    testResult: "",
  },

  getWeekDm() {
    const url = getWeekDmUrl;
    const that = this;
    const data = {
      patientID: this.data.patientID,
    }
    tokenRequest({url, data}).then(res=>{
      if(res.data.success) {
        let result = res.data.result;
        result.forEach(e=>{
          var arr = e.measureDateTime.split(' ');
          e.date = arr[0]
          e.time = arr[1]
        })
        that.setData({
          dm: result
        })
      }
    })
  },

  createData: function () {
    var that = this;
    var chartsdate = {
      categories: [],
      dm: [],
      dmColor: [],
    };
    var dms = (this.data.dm);
    if (dms.length > 14) {
      that.setData({
        enableScroll: true
      })
    }
    else {
      that.setData({
        enableScroll: false
      })
    }
    chartsdate.categories = dms.map(function (item) {
      chartsdate.dm.push((item.dm).toFixed(1));
      chartsdate.dmColor.push(item.dm>14 ? '#FF4500': '#666666');
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
        name: '血糖',
        data: weekData.dm,
        pointColor: weekData.dmColor
      }],
      xAxis: {
        disableGrid: false
      },
      yAxis: {
        title: '血糖mmol/L',
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
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      patientID: options.patientID,
      windowWidth: app.globalData.windowWidth,
      windowHeight: app.globalData.windowHeight,
    });
  },

  getIndex(e) {
    this.setData({
      timeIndex: e.detail,
    })
    if(e.detail==0) {
      this.getWeekDm();
    } else if(e.detail==1) {
      this.drawlinechart();
    } else if(e.detail==2) {
      this.getWeekDmReport();
    }
  },

  setOption1: function (chart) {
    let times = this.data.weekDmData.times
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

  setOption2: function (chart) {
    let max = this.data.weekDmData.max, min = this.data.weekDmData.min;
    var option = {
      color:[ '#00B58C'],
      grid: {
        bottom: 30
      },
      title:{
        text:'血糖最值(mmol/L)',
        left:'left',
        textStyle: {
          fontSize: 13,
        },
      },
      xAxis: [
          {
              type: 'category',
              data: ['最低值', '最高值'],
              axisLabel: {
                fontSize: 10
              },
          }
      ],
      yAxis: [
          {
              type: 'value',
              show: false
          }
      ],
      series: [
          {
              name: '预警次数',
              type: 'bar',
              data: [max, min],
              label:{
                  show:true,
                  color:"black",
                  position:"top"
              },
              barWidth: 20
          }
      ]
    };
    chart.setOption(option);
  },
  init2: function () {
    this.ecComponent2.init((canvas, width, height) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
      });
      this.setOption2(chart);
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

  setOption3: function (chart) {
    let averages = this.data.weekDmData.averageTimePoints
    console.log(averages)
    console.log(averages[0])
    var option = {
      color:[ '#00B58C'],
      grid: {
        bottom: 30
      },
      title:{
        text:'时段平均值(mmol/L)',
        left:'left',
        textStyle: {
          fontSize: 13,
        },
      },
      xAxis: [{
              type: 'category',
              data: ['空腹', '餐前', '餐后', '随机'],
              axisLabel: {
                fontSize: 10
              },
          }],
      yAxis: [
          {
              type: 'value',
              show: false
          }
      ],
      series: [
          {
              name: '预警次数',
              type: 'bar',
              data: [averages[0], averages[1], averages[2], averages[3]],
              label:{
                  show:true,
                  color:"black",
                  position:"top"
              },
              barWidth: 20
          }
      ]
    };
    chart.setOption(option);
  },
  init3: function () {
    this.ecComponent3.init((canvas, width, height) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
      });
      this.setOption3(chart);
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
    let times = this.data.monthDmData.times
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

  setOption5: function (chart) {
    let max = this.data.monthDmData.max, min = this.data.monthDmData.min;
    var option = {
      color:[ '#00B58C'],
      grid: {
        bottom: 30
      },
      title:{
        text:'血糖最值(mmol/L)',
        left:'left',
        textStyle: {
          fontSize: 13,
        },
      },
      xAxis: [
          {
              type: 'category',
              data: ['最低值', '最高值'],
              axisLabel: {
                fontSize: 10
              },
          }
      ],
      yAxis: [
          {
              type: 'value',
              show: false
          }
      ],
      series: [
          {
              name: '预警次数',
              type: 'bar',
              data: [9.1, 5.4],
              label:{
                  show:true,
                  color:"black",
                  position:"top"
              },
              barWidth: 20
          }
      ]
    };
    chart.setOption(option);
  },
  init5: function () {
    this.ecComponent5.init((canvas, width, height) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
      });
      this.setOption5(chart);
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

  setOption6: function (chart) {
    let averages = this.data.monthDmData.averageTimePoints
    var option = {
      color:[ '#00B58C'],
      grid: {
        bottom: 30
      },
      title:{
        text:'时段平均值(mmol/L)',
        left:'left',
        textStyle: {
          fontSize: 13,
        },
      },
      xAxis: [
          {
              type: 'category',
              data: ['空腹', '餐前', '餐后', '随机'],
              axisLabel: {
                fontSize: 10
              },
          }
      ],
      yAxis: [
          {
              type: 'value',
              show: false
          }
      ],
      series: [
          {
              name: '预警次数',
              type: 'bar',
              data: [averages[0], averages[1], averages[2], averages[3]],
              label:{
                  show:true,
                  color:"black",
                  position:"top"
              },
              barWidth: 20
          }
      ]
    };
    chart.setOption(option);
  },
  init6: function () {
    this.ecComponent6.init((canvas, width, height) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
      });
      this.setOption6(chart);
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

  getWeekDmReport() {
    const url = getWeekDmReportUrl;
    const that = this;
    const data = {
      patientID: this.data.patientID,
    }
    tokenRequest({url, data}).then(res=>{
      if(res.data.success) {
        let result = res.data.result;
        that.setData({
          weekDmData: result
        })
        this.getMonthDmReport();
      }
    })
  },

  getMonthDmReport() {
    const url = getMonthDmReportUrl;
    const that = this;
    const data = {
      patientID: this.data.patientID,
    }
    tokenRequest({url, data}).then(res=>{
      if(res.data.success) {
        let result = res.data.result;
        that.setData({
          monthDmData: result
        })
        this.ecComponent1 = this.selectComponent('#mychart-dom-bar1');
        this.init1();
        this.ecComponent2 = this.selectComponent('#mychart-dom-bar2');
        this.init2();
        this.ecComponent3 = this.selectComponent('#mychart-dom-bar3');
        this.init3();
        this.ecComponent4 = this.selectComponent('#mychart-dom-bar4');
        this.init4();
        this.ecComponent5 = this.selectComponent('#mychart-dom-bar5');
        this.init5();
        this.ecComponent6 = this.selectComponent('#mychart-dom-bar6');
        this.init6();
      }
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
    this.getWeekDm();
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