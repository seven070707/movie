// pages/commentedit/commentedit.js
const db = require('../../utils/db')
const util = require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {
    },
    menu:'',
    reviewContent:'',
    reviewRecord:'',
    recorderManager:null,
    ifUpdate:false,
    contentSize:0
  },

  onTapLogin(event) {
    this.setData({
      userInfo: event.detail.userInfo
    })
  },

  /**
   * 获取输入信息
   */
  onInput(event){
    this.setData({
      reviewContent: event.detail.value.trim()
    })
  },

  /**
   * 获取录音信息
   */
  onTapRecord(event){
    util.getRecordManager()
  },

  /**
   * 绑定开始录音事件
   */
  startRecord(){
    const recorderManager = wx.getRecorderManager();
    const options = {
      duration: 10000,
      sampleRate: 44100,
      numberOfChannels: 1,
      encodeBitRate: 192000,
      format: 'aac',
      frameSize: 50
    }

    recorderManager.start(options)
    recorderManager.onStart(() => {
      console.log('recorder start')
    })

    //错误回调
    recorderManager.onError((res) => {
      console.log(res);
    })
  },

  /**
   * 绑定结束录音事件
   */
  stopRecord(){
    const recorderManager = wx.getRecorderManager();
    recorderManager.stop();
    recorderManager.onStop((res) => {
      this.tempFilePath = res.tempFilePath;
      console.log('停止录音', res.tempFilePath)

      //提交到云存储得到云路径
      db.uploadImage(this.tempFilePath).then(result => {
        this.setData({
          reviewRecord: result.fileID,
          contentSize: res.duration
        })

        console.log(this.data.contentSize)
        console.log(this.data.reviewRecord)
      }).catch(err => {
        console.log('err', err)
      })
    })

  },

  // 提交完成按钮到 预览影评页面
  onTapSubmit(event) {
    let content
    if (this.data.menu == 1 ) {
      content  = this.data.reviewContent
    }else{
      content = this.data.reviewRecord
    }

    wx.showLoading({
      title: 'Submiting...'
    })

    if( this.data.ifUpdate == true ){
      db.updateMovieComment({
        username: this.data.userInfo.nickName,
        avatar: this.data.userInfo.avatarUrl,
        content,
        contentSize:this.data.contentSize,
        movieId: this.data.movie._id,
        movieImage: this.data.movie.image,
        movieName: this.data.movie.name,
        ifStore: false
      }).then(result => {
        wx.hideLoading()

        const data = result.result

        if (data) {
          wx.showToast({
            title: 'Succeed'
          })

          // console.log(data)
          // console.log("movieid")
          // console.log(this.data.movie._id)

          console.log("updata")

          // 页面跳转到影评预览
          wx.navigateTo({
            url: `/pages/commentpreview/commentpreview?id=${this.data.movie._id}`,
          })
        }
      }).catch(err => {
        console.error(err)
        wx.hideLoading()

        wx.showToast({
          icon: 'none',
          title: 'Failed'
        })
      })
    }else{
      db.addMovieComment({
        username: this.data.userInfo.nickName,
        avatar: this.data.userInfo.avatarUrl,
        content,
        contentSize: this.data.contentSize,
        movieId: this.data.movie._id,
        movieImage:this.data.movie.image,
        movieName:this.data.movie.name,
        ifStore:false
      }).then(result => {
        wx.hideLoading()

        const data = result.result

        if (data) {
          wx.showToast({
            title: 'Succeed'
          })

          // console.log(data)
          // console.log("movieid")
          // console.log(this.data.movie._id)

          // 页面跳转到影评预览
          wx.navigateTo({
            url: `/pages/commentpreview/commentpreview?id=${this.data.movie._id}`,
          })
        }
      }).catch(err => {
        console.error(err)
        wx.hideLoading()

        wx.showToast({
          icon: 'none',
          title: 'Failed'
        })
      })
    }
  },

  getMovieDetail(id) {
    wx.showLoading({
      title: 'Loading...',
    })

    db.getMovieDetail(id).then(result => {
      wx.hideLoading()
      const data = result.result

      if (data) {
        this.setData({
          movie: data

        })
      } else {
        setTimeout(() => {
          wx.navigateBack()
        }, 2000)
      }
    }).catch(err => {
      console.error(err)
      wx.hideLoading()

      setTimeout(() => {
        wx.navigateBack()
      }, 2000)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.getUserInfo().then(userInfo => {
      this.setData({
        userInfo
      })

      this.getMovieDetail(options.id)

      // 设置评论类型：1；文件2:录音
      this.setData({
        menu: options.menu
      })      

    }).catch(err => {
      console.log('Not Authenticated yet');
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
    var pages = getCurrentPages();

    var currPage = pages[pages.length - 1]; 

    if( currPage.data.changeItem === "yes"){
      console.log("set true")
      this.setData({
        ifUpdate : true
      })
    }
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