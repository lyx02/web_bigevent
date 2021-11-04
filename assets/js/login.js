$(function() {
    //点击去注册账号的连接
    $('#link-reg').on('click', function() {
            $('.login-box').hide()
            $('.reg-box').show()
        })
        //点击去登录的连接
    $('#link-login').on('click', function() {
        $('.reg-box').hide()
        $('.login-box').show()
    })


    //从layui获取form对象
    var form = layui.form
    var layer = layui.layer
        //通过form.verify自定义规则
    form.verify({
        //自定义一个pwd规则
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        //校验两次密码是否一致的规则
        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码输入不一致！'
            }
        }
    })

    //监听注册表单提交事件
    $('#form_reg').on('submit', function(e) {
        // 1.阻止默认提交请求
        e.preventDefault()
            // 2.发起Ajax请求
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password').val() }
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) {
                // return console.log(res.message);
                return layer.msg(res.message)
            }
            // console.log('注册成功');
            layer.msg('注册成功，请登录')

            $('#link-login').click()
        })
    })


    $('#form_login').submit(function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    // console.log(res);
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                    // console.log(res.token);
                    //将登录成功得到的token字符串保存到localStorage
                localStorage.setItem('token', res.token)


                //跳转到后台主页
                location.href = '/index.html'
            }
        })
    })



})