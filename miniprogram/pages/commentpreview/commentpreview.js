// pages/commentpreview/commentpreview.js
const db = require('../../utils/db')
const util = require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {
    },
  },

  onTapLogin(event) {
    this.setData({
      userInfo: event.detail.userInfo
    })
  },

  getMovieComment(id) {
    wx.showLoading({
      title: 'Loading...',
    })

    db.getMovieComment(id).then(result => {
      wx.hideLoading()
      console.log("getMovieComment")
      console.log(id)
      console.log(result)
      const data = result.result

      if (data) {
        this.setData({
          movie: data

        })

        console.log(this.data.movie)
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
   * 重新编辑
   */
  onTapBack(){
    wx.navigateBack()
  },

  /**
   * 播放音频
   */
  onTapPlayRecord(){
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true
    innerAudioContext.src = this.data.movie.content
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
  },
  
  /**
   * 发布影评，跳转到该影评到所有评论页
   */
  onTapSubmit(){
    wx.navigateTo({
      url: `/pages/commentlist/commentlist?id=${this.data.movie.movieId}`,
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

       this.getMovieComment(options.id)

    }).catch(err => {
      console.log('Not Authenticated yet');
    })

    this.setData({
      movie: this.data.movie
    })

    var pages = getCurrentPages();

    var prevPage = pages[pages.length - 2]; 

    prevPage.setData({
      changeItem:"yes"
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