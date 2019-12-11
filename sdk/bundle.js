import Uuid from './uuid'
const app = getApp()
class DMP{
  constructor(){
      // 小程序是否授权
      this.userData = {
        isLogin:false,//是否登录
        openid:'123',//用户openid
        key:undefined //本地生成唯一标识 key
      }
      this.isLogin = false
      this.openid = '123'
  }
  // 判断小程序是否授权
  isLoginFn(){
    let _this = this
    // 判断是否授权
    wx.getSetting({
      success: (res) => {
        console.log('是否授权', res.authSetting['scope.userInfo'] || false)
        _this.userData.isLogin = (res.authSetting['scope.userInfo'] || false)
      }
    })
  }
  // 获取openid 和 session 
  getOpenId(code){
    wx.request({
      url: 'https://api.weixin.qq.com/sns/jscode2session',
      data:{
        appid: 'wx957a71dc684f6b7f',
        secret: 'e591cfe0540db40cb19fe1e2f6acb11d',
        js_code:code,
        grant_type:'authorization_code'
      },
      method:'GET',
      success(res){
        console.log('openId:',res)
        this.userData.openid = res.openid
      }
    })
  }
  // 事件触发
  event(params){
    console.log('接收到参数', params)
  }
  // 添加唯一标示
  typeUuid() {
    if (!wx.getStorageSync('key')){
      wx.setStorage({ 
        key: "key",
        data: Uuid()
      })
    }
    this.userData.key = wx.getStorageSync('key')
  }  
  // 来源分析
  origin(){
    // 获取小程序启动时的参数
    const scene = wx.getLaunchOptionsSync()
    console.log('启动参数',scene)
  }
  // 启动数
  start(){
    // 系统信息
    const res = wx.getSystemInfoSync()
    console.log('系统信息',res)
  }
  // 小程序总停留时长
  interval(){
    let num = 0,_this = this
    this.timer = setInterval(()=>{
      console.log('停留时长', ++num * 5, 's', '当前登录信息', _this.userData)
    },5000)
  }
  // 单页面停留时长
  pageInterval(page){
    let num = 0
    this.pageTimer = setInterval(() => {
      console.log(page + '单页面停留时长', ++num * 5, 's')
    }, 5000)
  }
  // 初始化
  init(){
    // 判断是否登录
    // this.isOk = this.globalData.userInfo
    // 生成唯一标识
    this.typeUuid()
    // 判断来源渠道
    this.origin()
    // 启动数系统信息
    this.start()
    // 小程序停留时长
    this.interval()
    // 唯一标识
    console.log('唯一表示',this.userData.key)
    // 判断是否登录
    this.isLoginFn()
  }
}

export const dmp = new DMP()