# 动态(不固定)宽度文本超出显示...

我们都知道单行文本超出显示... ,只要设置四个属性即可
```css
.base-demo {
    /*width: 500px;*/
    /* 或 % */
    width: 30%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
```
### 需求
但是如果我们有这样一个需求：
就是在一个表格,这个表格可以拖拉改变宽度,有表格有3列，第1列需要固定宽度，第2列要制定一个最小宽度，第3列指定一个宽度

当增加表格的宽度时 第2列需要跟着扩大， 第1、3 列不随着扩大， 

当压缩表格宽度的时候，小于第3列的宽度的时候，需要压缩这个指定的宽度，文本超出时需要显示..., 但第2列的宽度到最小值时就不允许再压缩了。


### 实现
因为 2,3 列的特殊性，可以用 `div` 来实现 `table`，`div` 采用 `flex` 布局正好能指定空间的分配。

flex 实现这个几个关键的属性：

[flex-grow 属性](https://www.runoob.com/cssref/css3-pr-flex-grow.html)
[flex-shrink 属性](https://www.runoob.com/cssref/css3-pr-flex-shrink.html)
[flex-basis 属性](https://www.runoob.com/cssref/css3-pr-flex-basis.html)
[flex 属性](https://www.runoob.com/cssref/css3-pr-flex.html)

了解了这介个属性后我们来看具体的代码：
布局
```html
    <div id="drag">
        <div class="table">
            <div class="row">
                <div>ID</div>
                <div>人物介绍</div>
                <div>名字</div>
            </div>

            <div class="row">
                <div>1</div>
                <div>孙悟空是中国明代小说家吴承恩的著作《西游记》中的角色之一</div>
                <div>孙悟空</div>
            </div>
            <div class="row">
                <div>2</div>
                <div>玄奘（原名：陈玄奘）（602年—644年/664年），唐朝著名的三藏法师</div>
                <div>唐僧</div>
            </div>
            <div class="row">
                <div>3</div>
                <div>猪八戒是吴承恩所作《西游记》中的角色。法号悟能，是唐僧的二徒弟</div>
                <div>猪八戒</div>
            </div>
        </div>
    </div>
```
flex样式
```css
    .table .row {
        display: flex;
        white-space: nowrap;
    }

    .table .row  div:nth-of-type(1) {
        width: 80px;
    }

    .table .row  div:nth-of-type(2) {
        flex: 1 0 100px;
        /* 上面这条语句是 下面的简写
        flex-grow: 1; flex 的扩展量
        flex-shrink: 0; flex 的收缩量
        flex-basis: 100px; 项目的基础长度
        总结：基础长度为 100px 小于基础长度时不允许收缩，空间大于100px时 按照 1的扩展量扩展
        详见： https://www.runoob.com/cssref/css3-pr-flex.html
        */
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .table .row  div:nth-of-type(3) {
        margin-left: 6%;
        /*margin-left: 20px;*/
        flex: 0 1 80px;
        overflow: hidden;
        text-overflow: ellipsis;
    }
```

[完整代码 传送门](https://github.com/Kayakyx/text-ellipsis.git)

### 效果
![](https://img2020.cnblogs.com/blog/1249006/202108/1249006-20210808215444134-2001233226.gif)

### 参考
[flex 属性](https://www.runoob.com/cssref/css3-pr-flex.html)

[多行文字溢出[...]的实现(text-overflow: ellipsis)](https://www.cnblogs.com/taohuaya/p/7681011.html)

[原生js实现div的拖拽与拉伸](https://www.cnblogs.com/qingsui/p/13853346.html)
