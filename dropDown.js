;
(function () {
    var DropDown = function (dropId = 'dropDwon', distance = 100, callBack = () => {}, tip = '努力加载中...') {
        this.dropDown = document.getElementById(dropId);
        this.tip = tip;
        this.parentEle = this.dropDown.parentNode;
        this.tipDiv = null;
        this.distance = distance;
        this.isLock = false;
        this.isDone=false;
        this.startPoint = null;
        this.movePoint = null;
        this.endPoint = null;
        this.initEle();
        this.initCss();
        this.dropDown.addEventListener('touchstart',this.touchStart.bind(this),false);
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
        styleEle.innerHTML += '.dropDown .tipDiv{height:50px;line-height:50px;text-align:center;width:100%;border:1px solid #ccc}';
        styleEle.innerHTML += `.dropDown{width:100%;border:solid 1px blue; transform:translate(0px,-61px)}`;
        document.head.appendChild(styleEle);
    }

    DropDown.prototype.setTransform = function (dis) {
        this.dropDown.webkitTranform = `translate(0,${dis}px)`;
        this.dropDown.transform = `translate(0,${dis}px)`;
    }
    DropDown.prototype.setTransition = function (time) {
        this.dropDown.webkitTransition = `all ${time}s)`;
        this.dropDown.transition = `all ${time}s)`;
    }
    DropDown.prototype.back = function () {
        this.setTransform(-this.distance);
        this.isLock = false;
    }
    DropDown.prototype.touchStart = function (e = window.event) {
        this.startPoint = e.touches[0];
        if (this.parentEle.scrollTop()<=0&&!this.isLock) {
            this.isLock=true;
            this.isDone=true;
            let start=this.startPoint.pageY;
            this.setTransition(0);
        }
        
        console.log(e);
    }
    DropDown.prototype.touchMove=function(e=window.event){
        this.movePoint=e.touches[0];
        this.setTransform(this.movePoint.pageY-this.startPoint.pageY);
        this.setTransition(1);
    }
    DropDown.prototype.touchEnd=function(e=window.event){
        this.endPoint = e.changedTouches[0];
        console.log(e);
    }
    this.DropDown=DropDown;
})();