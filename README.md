# dropDown
用原生js+css3撸的一个下拉（刷新）事件插件

> 对于需要实现下拉事件的的元素，在其外层包裹写一个div元素，以及设置这个div元素的id为你想要的。
<code>
    <div id="dropDown" style="width: 400px;height:400px;background:lightblue;">
        <div>111我只是一个xiaodemo 我只是一个xiaodemo 我只是一个xiaodemo我只是一个xiaodemo 我只是一个xiaodemo 我只是一个xiaodemo我只是一个xiaodemo我只是一个xiaodemo我只是一个xiaodemo我只是一个xiaodemo</div>
    </div>
</code>
> 对于html元素部分，例如我想要给包含xiaodemo的元素设置下拉事件，那么我只要在它的外层包裹一层div，并且设置它的id就行了，至于什么样的样式是随你的。
> 那么js代码部分：
> 首先引入插件文件<script src='./dropDown-es5.js'></script>
> 然后在下面构造函数传入id，实例化一个对象
<code>
        var dropDown = new DropDown('dropDown', 60, function () {
            setTimeout(() => {
                this.back();
            }, 1000);
        }, '下拉进行加载','加载中...');
</code>
> 并且只有id是必须的，其他参数都是默认的，也可以自己传入
> 第一个参数为id，必填
> 第二个参数为下拉距离，同时也是提示框的高度，非必填，默认为60
> 第三个参数为回调函数,回调函数默认绑定到dropDown这个构造函数实例化的对象上，非必填，默认为空函数
> 第四个参数为下拉触发回调函数之前的提示，非必填，默认为'下拉进行加载'
> 第五个参数为下拉触发回调函数后的提示，非必填，默认为'加载中...'
### 注意：第三个参数的回调函数需要在最后调用this.back函数，使得提示框复原。

> 喜欢的话，给我点个star~
