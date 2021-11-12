// 获取文章分类的列表
$(function() {
    var layer = layui.layer
    var form = layui.form

    initArtCateList()

    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                // console.log(res);
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }

    //添加类别按钮
    var indexAdd = null
    $('#btnAddCate').on('click', function() {
        indexAdd = layer.open({
            area: ['500px', '250px'],
            type: 1,
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    })

    //通过代理形式，为form-add绑定submit事件
    $('body').on('click', '#form-add', function(e) {
        e.preventDefault()
            // console.log('ok');
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败！')
                }
                initArtCateList()
                layer.msg('新增分类成功！')
                layer.close(indexAdd)
            }
        })
    })

    //通过代理形式，为btn-edit绑定点击事件
    var indexEdit = null

    $('tbody').on('click', '.btn-edit', function() {
        // console.log('ok');
        indexEdit = layer.open({
            area: ['500px', '250px'],
            type: 1,
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })
        var id = $(this).attr('data-id')
            // console.log(id);

        //发起请求获取对应分类数据
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res) {
                // console.log(res);
                form.val('form-edit', res.data)
            }
        })
    })

    //通过代理形式,为修改表单绑定submit事件
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类数据失败！')
                }
                layer.msg('更新分类数据成功！')
                layer.close(indexEdit)
                initArtCateList()
            }
        })
    })

    //通过代理形式,为删除按钮绑定点击事件
    $('tbody').on('click', '.btn-delete', function() {
        // console.log('ok');
        var id = $(this).attr('data-id')
            //提示用户是否要删除
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败！')
                    }
                    layer.msg('删除成功！')
                    layer.close(index);
                    initArtCateList()
                }

            })

        })
    })

})