/*
 * @Author: TR
 * @Date: 2021-06-16 09:37:00
 * @LastEditors: no BUG
 * @LastEditTime: 2021-06-19 10:58:37
 * @Description: 
 */
$(function () {
  var form = layui.form
  form.verify({
    //指定密码校验规则
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    //验证新旧密码不能相同
    samePwd: function (value) {
      if (value == $('name=newPwd').val()) {
        return '新旧密码不能相同'
      }
    },
    //验证两次密码不一致
    rePwd: function (value) {
      if (value !== $('name=rePwd').val()) {
        return '两次密码不一致'
      }
    }
  })
  //表单提交
  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/updatepwd',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取用户信息失败！')
        }
        layer.msg('密码重置成功')
        //清空表单，
        $('.layui-form')[0].reset()
      }
    })
  })
})