//获取用户信息
getUserInfo()
function getUserInfo() {
  $.ajax({
    methods: 'GET',
    url: '/my/userinfo',
    //以 /my 开头的请求路径，需要在请求头中携带 Authorization 身份认证字段
    // Headers: {
    //   Authorization: localStorage.getItem('token') || ''
    // },
    success: res => {
      console.log(res);
      if (res.status !== 0) {
        return layui.layer.msg('获取用户信息失败！')
      }
      renderAvatar(res.data)
    },
    // complete: res => {
    //   if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
    //     localStorage.removeItem('token')
    //     location.href = '/login.html'
    //   }
    // }
  })
}
function renderAvatar(name) {
  //获取用户头像或者名称
  var user = name.nickname || name.username
  // 2. 设置欢迎的文本
  $('#welcome').html('欢迎&nbsp;&nbsp;' + user)
  //渲染用户头像
  if (name.user_pic !== null) {
    // 3.1 渲染图片头像
    $('.layui-nav-img')
      .attr('src', name.user_pic)

      .show()
    $('.text-avatar').hide()
  } else {
    //渲染首字母图头像
    $('.layui-nav-img').hide()
    var arr = user[0].toUpperCase()
    $('.text-avatar').html(arr).show()
  }
}
var layer = layui.layer
$("#logout").on('click', function () {
  layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
    //do something
    //删除本地储存的token
    localStorage.removeItem('token')
    //实现跳转
    location.href = '/login.html'
    // 关闭 confirm 询问框
    layer.close(index);
  });
})