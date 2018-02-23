//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    scoreinfo: {
      score: 80,
      ratio: 5,
      tag: 'B'
    },
    detial: [{
      key: '待还借条',
      value: 0
    }, {
      key: '待收借条',
      value: 0
    }, {
      key: '逾期借条',
      value: 0
    }],
    userInfo: {
      detial: [{
        key: '待还借条',
        value: 0
      }, {
        key: '待收借条',
        value: 0
      }, {
        key: '逾期借条',
        value: 0
      }]
    },
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

  },
  add: function(){
    var that = this;
    var s = that.data.scoreinfo;
    s.ratio++;
    s.score = s.score + s.ratio;
    that.setData({
      scoreinfo: s
    })
  },
  reduce: function () {
    var that = this;
    var s = that.data.scoreinfo;
    s.ratio--;
    var base = -2;
    s.score = s.score + base * (10 - s.ratio);
    that.setData({
      scoreinfo: s
    })
  },
  reset: function () {
    var that = this;
    var s = {
      "score": 80,
      "ratio": 5
    };
    s.ratio++;
    s.score = s.score + s.ratio;
    that.setData({
      scoreinfo: s
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
