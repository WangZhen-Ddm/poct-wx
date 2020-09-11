const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const formatTime6 = date => {
  var arr=[],arr1=[];
  arr = date.split("-");
  arr1 = arr[2].split(":");
  const month = arr[1]
  const dayAndHour = arr1[0]
  const minute = arr[1]

  return [month, dayAndHour].map(formatNumber).join('-') + ':' + [minute].map(formatNumber)
}

module.exports = {
  formatTime: formatTime,
  formatTime6,
}
