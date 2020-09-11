/**
 * 通用异步网络请求
 */
export const request = ({ 
    data = {}, 
    url = '',
    method = 'POST' ,
    header = {'content-Type': 'application/x-www-form-urlencoded; charset=utf-8'},
  }) => {
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        header: header,
        data: data,
        method: method,
        success: (res) => {
          resolve(res);
        },
        fail: (err) => {
          wx.showLoading({
            title: '网络错误!'
          });
          setTimeout(() => {
            wx.hideLoading();
          }, 3000);
          reject(err);
        }
      });
    });
  };
  export const APPLICATION_WWW_FORM_URLENCODED = {'Content-Type': 'application/x-www-form-urlencoded'};
  export const APPLICATION_JSON = {'Content-Type': 'application/json; charset=utf-8'};
  
  /**
 * 通用请求
 */
export const tokenRequest = ({
    data = {},
    url = '',
    method = 'POST',
    header = { 'Authorization':wx.getStorageSync('token'),
       'Content-Type': 'application/x-www-form-urlencoded' }
  }) => {
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        header: header,
        data: data,
        method: method,
        success: res => {
          // 判断服务器返回状态，辅助debug
          const { statusCode } = res;
          if (statusCode > 400 && statusCode < 500) {
            wx.showToast({
              title: '端口请求错啦' + statusCode,
              icon: 'none'
            });
            return false;
          } else if (statusCode > 500) {
            wx.showToast({
              title: '服务器请求失败' + statusCode,
              icon: 'none'
            });
            return false;
          }
          if(res.data.code){
            if(res.data.code == 20001){
              reLogin();
            }
            else {
              wx.showToast({
                // title:res.data.error.summary+' '+ res.data.error.detail,
                title:res.data.error.summary,
                icon:'none'
              });
              return false;
            } 
          }
          resolve(res);
        },
        fail: err => {
          wx.showLoading({
            title: '网络错误!'
          });
          setTimeout(() => {
            wx.hideLoading();
          }, 3000);
          reject(err);
        }
      });
    });
  };