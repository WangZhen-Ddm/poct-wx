// pages/flu/flu.js
import * as echarts from '../../components/ec-canvas/echarts.min';
var lineChart = null;
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      lazyLoad: true,
    },
  },
  setOption: function (chart) {
    var data = this.createData();
    let a = new Array(data.length).join(',').split(',')
    let max = this.data.max;
    let secondMax = this.data.secondMax;
    let date = this.data.date;
    let time = this.data.time;
    var option = {
      title: {
        text: '免疫荧光蛋白',
        subtext: date + ' ' + time,
        left: 'center'
      },
      xAxis: {
        type: 'category',
        data: a,
        show:false,
      },
      yAxis: {
          type: 'value'
      },
      series: [{
          data: data,
          type: 'line',
          smooth: true,
          symbol:"none",
          markPoint: {
            data: [
              { 
                coord: [max[0], max[1]],
                value: max[1],
                label: {
                  show: true,
                  }
              },
              { 
                coord: [secondMax[0], secondMax[1]],
                value: secondMax[1],
                label: {
                  show: true,
                  }
              },
            ]
        },
      }]
    };
    chart.setOption(option);
  },
  init: function () {
    this.ecComponent.init((canvas, width, height) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
      });
      this.setOption(chart);
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

  createData: function () {
    var that = this;
    var flu = this.data.flu;
    var flus = flu.split(",");
    var max = [0, 0.0];
    var secondMax = [0, 0.0];
    for(let i=1; i<flus.length-1; ++i) {
      if(flus[i]>flus[i-1]&&flus[i]>flus[i+1]) {
        if(flus[i]>max[1]) {
          var tmp0 = max[0];
          var tmp1 = max[1]
          max[0] = i;
          max[1] = flus[i];
          secondMax[0] = tmp0;
          secondMax[1] = tmp1;
        }
      }
    }
    var m = new Number(max[1]);
    max[1] = m.toFixed(2);
    var sm = new Number(secondMax[1]);
    secondMax[1] = sm.toFixed(2);
    this.setData({
      max,
      secondMax,
    })
    return flus
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      flu: options.flu,
      date: options.date,
      time: options.time,
      windowWidth: app.globalData.windowWidth,
      windowHeight: app.globalData.windowHeight,
    });
    this.ecComponent = this.selectComponent('#mychart-dom-bar');
    this.init();
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