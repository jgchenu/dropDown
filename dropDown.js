;
(function () {
    var DropDown = function (dropId = 'dropDwon', distance = 60, callBack = () => {}, tip = '下拉进行加载', loadingTip = '努力加载中...') {
        this.dropDown = document.getElementById(dropId);
        this.tip = tip;
        this.loadingTip=loadingTip;
        this.callBack = callBack;
        this.distance = distance;
        this.parentEle = this.dropDown.parentNode;
        this.tipDiv = null;
        this.isLock = false;
        this.isDone = false;
        this.startPoint = null;
        this.movePoint = null;
        this.endPoint = null;
        this.initEle();
        this.initCss();
        this.dropDown.addEventListener('touchstart', this.touchStart.bind(this), false);
        this.dropDown.addEventListener('touchmove', this.touchMove.bind(this), false);
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