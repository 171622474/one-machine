//logs.js
const util = require('../../utils/util.js')
import { dmp } from '../../sdk/bundle.js'

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    dmp.pageInterval('page')
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  onUnload() {
    // 清楚小程序停留
    clearInterval(dmp.pageTimer)
    console.log('清楚')
  },  
})
