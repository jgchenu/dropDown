;
(function () {
    var DropDown = function (dropId = 'dropDwon', distance = 60, callBack = () => {}, tip = '下拉进行加载', loadingTip = '努力加载中...') {
        //获取下拉元素节点
        this.dropDown = document.getElementById(dropId);
        //下拉之前的提示
        this.tip = tip;
        //下拉之后的提示
        this.loadingTip=loadingTip;
        //下拉之后的回调函数
        this.callBack = callBack;
        //下拉距离，同时也是提示框的高度
        this.distance = distance;
        //获取下拉元素的父节点
        this.parentEle = this.dropDown.parentNode;
        //提示框节点
        this.tipDiv = null;
        this.isLock = false;
        //这两个变量的作用在于防止二次滑动，在第一次滑动没有达到指定距离而触发回调的时候，会强制进行回弹，此时isLock被设置为fasle，防止二次滑动。
        //滑动后数据加载完成之前不允许有第二次的滑动，避免来触发第二次的回调函数。故而isDone是用来控制触发回调的状态的，isDOne为true时候，证明还没有触发回调，可以进行滑动，当触发回调之后，会将isDone设置为fasle，在回调完成前，禁止进行滑动，进而再次触发回调。
        //如果滑动不到距离，那么会将状态复原，如果滑动到达需要距离，那么会进行回调事件次数调用的限制，然后在回调完成后再进行复原。
        this.isDone = false;
        this.startPoint = null;
        this.movePoint = null;
        //初始化提示框元素
        this.initEle();
        //初始化提示框样式
        this.initCss();
        //绑定手指触摸开始事件
        this.dropDown.addEventListener('touchstart', this.touchStart.bind(this), false);
        //绑定手指移动事件
        this.dropDown.addEventListener('touchmove', this.touchMove.bind(this), false);
        //绑定手指触摸结束事件
        this.dropDown.addEventListener('touchend', this.touchEnd.bind(this), false);
    }
    DropDown.prototype.initEle = function () {
        this.tipDiv = document.createElement('div');
        this.tipDiv.setAttribute('class', 'tipDiv');
        this.dropDown.setAttribute('class', 'dropDown')
        this.tipDiv.innerHTML = this.tip;
        let first = this.dropDown.firstChild;
        this.dropDown.insertBefore(this.tipDiv, first);
    }
    DropDown.prototype.initCss = function () {
        let styleEle = document.createElement('style');
        styleEle.innerHTML += `.dropDown .tipDiv{height:${this.distance}px;line-height:${this.distance}px;text-align:center;width:100%;}`;
        styleEle.innerHTML += `.dropDown{width:100%;transform:translate(0px,-${this.distance}px)}`;
        document.head.appendChild(styleEle);
    }

    DropDown.prototype.setTransform = function (dis) {
        this.dropDown.style.webkitTransform = `translate(0px,${dis}px)`;
        this.dropDown.style.transform = `translate(0px,${dis}px)`;
    }
    DropDown.prototype.setTransition = function (time) {
        this.dropDown.style.webkitTransition = `all ${time}s)`;
        this.dropDown.style.transition = `all ${time}s)`;
    }
    DropDown.prototype.back = function () {
        this.tipDiv.innerHTML=this.tip;
        this.setTransform(-this.distance);
        this.isLock = false;
    }
    DropDown.prototype.touchStart = function (e = window.event) {
        if (this.parentEle.scrollTop <= 0 && !this.isLock) {
            this.startPoint = e.touches[0];
            this.isLock = true;
            this.isDone = true;
            this.setTransition(0);
        }
    }
    DropDown.prototype.touchMove = function (e = window.event) {
        if (this.parentEle.scrollTop <= 0 && this.isDone) {
            this.movePoint = e.touches[0];
            let startY = this.startPoint.pageY;
            let moveY = this.movePoint.pageY;
            if (startY < moveY) {
                e.preventDefault();
                this.setTransition(0);
                this.setTransform(moveY - startY - this.distance);
            }

        }

    }
    DropDown.prototype.touchEnd = function (e = window.event) {
        if (this.isDone) {
            this.isDone = false;
            if (this.movePoint.pageY - this.startPoint.pageY >= this.distance) {
                this.tipDiv.innerHTML=this.loadingTip;
                this.setTransition(1);
                this.setTransform(0);
                this.callBack();
            } else {
                this.back();
            }
        }
        this.endPoint = e.changedTouches[0];
    }
    this.DropDown = DropDown;
})();