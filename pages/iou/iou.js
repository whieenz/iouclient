Page({

  /**
   * 页面的初始数据
   */
  data: {
    bootMenu: [{
      src: '../image/home.png',
      text: '首页',
      url: '../new/new'
    }, {
      src: '../image/iou.png',
      text: '我的借条',
      url: '../me/me'
    }],
    iou: [{
      jtzt: '待收款',
      createTime: '2018年2月9日',
      zje: '262.32',
      unit:'元',
      commonInfo:[{
          key:'还款人',
          value:'张三'
      },{
          key: '还款时间',
          value: '2018年3月12日'
      }]
    }, {
        jtzt: '待还款',
        createTime: '2018年2月9日',
        zje: '1000',
        unit: '元',
        commonInfo: [{
          key: '收款人',
          value: '何天涯'
        }, {
          key: '收款时间',
          value: '2018年6月9日'
        }, {
          key: '还款倒计时',
          value: '50 天'
        }]
      }, {
        jtzt: '待收款',
        createTime: '2018年2月9日',
        zje: '54564',
        unit: '美元',
        commonInfo: [{
          key: '还款人',
          value: '李四'
        }, {
          key: '还款时间',
          value: '2018年3月12日'
        }]
      }, {
        jtzt: '待还款',
        createTime: '2018年2月9日',
        zje: '8888.88',
        unit: '欧元',
        commonInfo: [{
          key: '收款人',
          value: '何天浪'
        }, {
          key: '收款时间',
          value: '2018年6月9日'
        }, {
          key: '还款倒计时',
          value: '1213 天'
        }]
      }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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