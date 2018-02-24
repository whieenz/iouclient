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
    canvas:{
      height:0,
      width:0
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
  onLoad: function () {
    if (app.globalData.userInfo) {
      var that = this;
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
    //获取系统信息  
    wx.getSystemInfo({
      //获取系统信息成功，将系统窗口的宽高赋给页面的宽高  
      success: function (res) {
        that.width = res.windowWidth;
        var canvasheight = (res.windowWidth-40) * 0.7;
        that.setData({
          canvas: {
            height: canvasheight,
            width: res.windowWidth
          }
        });
        // 这里的单位是PX，实际的手机屏幕有一个Dpr，这里选择iphone，默认Dpr是2
      }
    })
  },
  onReady: function () {
    this.drawMeter('credit', this.data.scoreinfo.score, '100');
  },
  drawMeter: function (name, value, maxvalue) {
    var that = this;
    var canvas = that.data.canvas;
    const ctx = wx.createCanvasContext(name);
    var width = canvas.width;
    var height = canvas.height;
    var R = (width-40) / 4;
    var x = width / 2;
    var y = height * 0.55;
    ctx.clearRect(0, 0, width, height); //清除画布

    ctx.beginPath(); //画笔开始  
    ctx.setLineWidth(1);
    ctx.setFillStyle('#118eea')
    ctx.setStrokeStyle('#118eea'); //设置画笔的颜色 
    ctx.arc(width / 2, -(width - height) - R - 2, width + R, 0, 2 * Math.PI, false); 
    ctx.stroke(); //绘图    
    ctx.fill();//填充
    ctx.closePath(); //结束画布
    
    //绘制圆
    ctx.beginPath(); //画笔开始   
    ctx.setLineWidth(5); //设置画笔的线宽    
    ctx.setStrokeStyle('#ffffff'); //设置画笔的颜色  576e87
    ctx.setLineCap('round');
    ctx.arc(x, y, R, 0.75 * Math.PI, 0.25 * Math.PI, false); //绘制圆形，坐标250,250 半径200，整圆（0-360度），false表示顺时针     
    ctx.stroke(); //绘图
    ctx.closePath(); //结束画布 

    //绘制value值的弧度
    ctx.setLineWidth(5); //设置画笔的线宽 
    ctx.beginPath(); //画笔开始           
    ctx.setLineJoin('round');
    // ctx.setStrokeStyle('#04e7f9'); //设置画笔的颜色
    ctx.setStrokeStyle(that.getStrokeStyle(value));
    ctx.arc(x, y, R, 0.75 * Math.PI, (value * 1.5 / maxvalue + 0.75)* Math.PI, false); //绘制圆形，坐标250,250 半径200，整圆（0-360度），false表示顺时针     
    ctx.stroke(); //绘图            
    ctx.closePath(); //结束画布   

    //圆形外面刻度               
    for (var i = 0; i < maxvalue; i=i+2) {
      ctx.save();
      ctx.setLineWidth(2);
      if (i > value){
        ctx.setStrokeStyle('#EBEBEB');
      }else{
        ctx.setStrokeStyle(that.getStrokeStyle(i));
      }
      ctx.translate(x, y);
      ctx.rotate(1.25 * Math.PI);
      ctx.rotate(i * 1.5 / maxvalue * Math.PI);//i * 360/maxvalue * Math.PI / 180
      ctx.beginPath();
      ctx.moveTo(0, -(R + 12));
      ctx.lineTo(0, -(R + 27));
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    }
    //设置中间字体
    ctx.setFillStyle('#29ecfc');
    ctx.setFontSize(14);
    ctx.setTextAlign('center');
    ctx.fillText('信用等级', width / 2, height / 2 + 60);

    ctx.setStrokeStyle(that.getStrokeStyle(value));
    ctx.setFillStyle(that.getStrokeStyle(value));
    ctx.setFontSize(60);
    ctx.setTextAlign('center');
    var tag = that.getTag(value);
    ctx.fillText(tag, width / 2, height / 2 + 20);

    //值圆点
    ctx.translate(x, y);
    ctx.rotate(1.25 * Math.PI);
    ctx.beginPath(); //画笔开始
    ctx.setLineWidth(1);
    ctx.setStrokeStyle(that.getStrokeStyle(value)); //设置画笔的颜色 
    ctx.arc(0, -R, 6, 0, 2 * Math.PI, false); //绘制圆形，坐标250,250 半径200，整圆（0-360度），false表示顺时针 
    ctx.rotate((270 / (maxvalue / value)) * Math.PI / 180);
    ctx.stroke(); //绘图    
    ctx.fill();//填充
    ctx.closePath(); //结束画布
    ctx.draw();
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  add: function () {
    var that = this;
    var s = that.data.scoreinfo;
    var ratio = parseInt(s.score/10) + 1;
    s.score = s.score + ratio;
    if (s.score > 100){
      s.score = 100;
      s.ratio = 9;
    }
    s.tag = that.getTag(s.score);
    
    that.setData({
      scoreinfo: s
    })
    this.drawMeter('credit', that.data.scoreinfo.score, '100');
  },
  reduce: function () {
    var that = this;
    var s = that.data.scoreinfo;
    var ratio =  parseInt(s.score / 10);
    var base = -2;
    s.score = s.score + base * (11 - ratio);
    if (s.score < 0) {
      s.score = 0;
      s.ratio = 1;
    }
    s.tag = that.getTag(s.score);
    that.setData({
      scoreinfo: s
    })
    this.drawMeter('credit', that.data.scoreinfo.score, '100');
  },
  reset: function () {
    var that = this;
    var s = {
      "score": 80,
      "ratio": 5,
      "tag": 'B'
    };
    that.setData({
      scoreinfo: s
    })
    this.drawMeter('credit', that.data.scoreinfo.score, '100');
  },
  getTag: function (score) {
    if (score >= 90) {
      return 'A';
    } else if (score >= 50 && score < 90) {
      return 'B';
    } else if (score >= 30 && score < 50) {
      return 'C';
    } else if (score < 30) {
      return 'D';
    }
  },
  getStrokeStyle: function(value){
    var result = parseInt(value / 3);
    var style = '#1c2d39';
    if (result == 33) {
       style = '#32e0dc';
    }
    else if (result == 32) {
       style = '#2fddd5';
    }
    else if (result == 31) {
       style = '#2ae2d5';
    }
    else if (result == 30) {
       style = '#26e2d0';
    }
    else if (result == 29) {
       style = '#25e5cc';
    }
    else if (result == 28) {
       style = '#25e4c5';
    }
    else if (result == 27) {
       style = '#25e7c1';
    }
    else if (result == 26) {
       style = '#25e4b8';
    }
    else if (result == 25) {
       style = '#25e7b2';
    }
    else if (result == 24) {
       style = '#25e7a9';
    }
    else if (result == 23) {
       style = '#28e79f';
    }
    else if (result == 22) {
       style = '#35e08e';
    }
    else if (result == 21) {
       style = '#49e782';
    }
    else if (result == 20) {
       style = '#61e770';
    }
    else if (result == 19) {
       style = '#79e65e';
    }
    else if (result == 18) {
       style = '#94e54a';
    }
    else if (result == 17) {
       style = '#a9de38';
    }
    else if (result == 16) {
       style = '#c7e127';
    }
    else if (result == 15) {
       style = '#d9d91a';
    }
    else if (result == 14) {
       style = '#efd70d';
    }
    else if (result == 13) {
       style = '#fece03';
    }
    else if (result == 12) {
       style = '#f7c905';
    }
    else if (result == 11) {
       style = '#fbb904';
    }
    else if (result == 10) {
       style = '#f9a004';
    }
    else if (result == 9) {
       style = '#ff8504';
    }
    else if (result == 8) {
       style = '#ff680c';
    }
    else if (result == 7) {
       style = '#fa4a15';
    }
    else if (result == 6) {
       style = '#fa4a15';
    }
    else if (result == 5) {
       style = '#f4321d';
    }
    else if (result == 4) {
       style = '#ef1f22';
    }
    else if (result == 3) {
       style = '#ef1c23';
    }
    else if (result == 2) {
       style = '#eb1d24';
    }
    else if (result == 1) {
       style = '#eb1d24';
    }
    else if (result == 0) {
       style = '#eb1d24';
    }
    return style;
  }
})
