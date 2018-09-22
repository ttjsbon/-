//index_new.js
const db = wx.cloud.database()
var array2 = []
var array3 = []
var array4 = []
var resu=''
var i=0
Page({
  data: {
	array: [],
    text1:'曹尼玛陈鑫\n',
	text2:'曹尼玛黑皮',
	text3:'',
	text4:'',
	index:0
  },
  
  formSubmit:function(e){
	wx.getSetting({
		success:res =>{
			if(res.authSetting['scope.userInfo']){
				wx.getUserInfo({
					success:res =>{
						console.log(res.userInfo)
						this.setData({
							text3:array3[e.detail.value.dx],
							text1:e.detail.value.sbcx+'\n',
							text2:e.detail.value.pri
						})
						if(e.detail.value.sbcx&&e.detail.value.pri){
								db.collection('todos').add({
									data:{
										num:e.detail.value.sbcx,
										price:e.detail.value.pri,
										name:array3[e.detail.value.dx],
										who:res.userInfo.nickName
									},
									success:function(res){
											wx.showModal({
											  title: '成功',
											  content: '添加成功',
											  showCancel:false
											})
									}
						})
						}
						else{
							wx.showModal({
							  title: '失败',
							  content: '有字段未填写',
							  showCancel:false
							})
						}
					}
				})
			}
			else{
				this.setData({
					text3:'请先授权登录'
				})
				wx.showModal({
				  title: '失败',
				  content: '添加失败，请先授权登录',
				  showCancel:false
				})
			}
			
		}
	})
	
  },
	 
  sel:function(){
	this.setData({
		text4:''
	})
	db.collection('todos').get({
		success:res =>{
			resu=''
			for(i=0;i<res.data.length;i++){
				resu=resu+res.data[i].who+': '+res.data[i].name+' '+res.data[i].num+'吨 单价 '+res.data[i].price+' 元/吨'+'\n'
			}
			this.setData({
				text4:resu
			})
		}
	})
  },
  pick_1: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  ins: function(){
	wx.redirectTo({
      url: '../insert/insert',
    })
  },
  onLoad: function(){
	wx.getSetting({
		success:res =>{
			console.log(res)
			wx.getUserInfo({
				success:res =>{
					console.log(res.userInfo)
				}
			})
		}
	})
	db.collection('spmc').get({
		success:res =>{
			for(i=0;i<res.data.length;i++){
				array3[i]=res.data[i].sp
			}
			this.setData({
				array:array3
			})
		}
	})
  }

})