/*
 * @Author: TR
 * @Date: 2021-06-16 09:37:00
 * @LastEditors: no BUG
 * @LastEditTime: 2021-06-18 09:07:08
 * @Description:
 */
$(function () {
  // 点击“去注册账号”的链接
  $("#link_reg").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });
  // 点击“去登录”的链接
  $("#link_login").on("click", function () {
    $(".login-box").show();
    $(".reg-box").hide();
  });

  // 从 layui 中获取 form 对象
  var form = layui.form;
  //获取layer内置模块
  var layer = layui.layer
  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    repwd: function (value) {
      // console.log(value); //再次输入的密码
      //属性选择器
      var pwd = $(".reg-box [name=password]").val();
      if (pwd !== value) {
        return "两次输入密码不一致";
      }
    },
  });

  //注册
  $("#form_reg").on("submit", function (e) {
    // console.log(111);
    e.preventDefault();
    let data = $(this).serialize();
    $.ajax({
      method: "post",
      url: '/api/reguser',
      data,
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg('注册成功，请重新登录');
        //清空表单
        $("#form_reg")[0].reset()
        //模拟人的点击行为，跳转到登录页面
        $("#link_login").click()
      }
    });
  });
  //登录
  $('#form_login').submit(function (e) {
    e.preventDefault();
    $.ajax({
      method: "post",
      url: '/api/login',
      data: $(this).serialize(),
      success: function (res) {
        // console.log(res);
        if (res.status !== 0) {
          return layer.msg('登录失败');
        }
        layer.msg('登录成功');

        localStorage.setItem('token', res.token)
        // 跳转到后台主页
        location.href = '/index.html'
      }

    })
  })

})
