;
(function () {
    var DropDown = function (dropId = 'dropDwon', distance = 100, callBack = () => {}, tip = '努力加载中...') {
        this.dropDown = document.getElementById(dropId);
        this.tip = tip;
        this.tipDiv = null;
        this.distance = distance;
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

    DropDown.prototype.transform = function (dis) {
        this.dropDown.webkitTranform = `translate(0,${dis}px)`;
        this.dropDown.transform = `translate(0,${dis}px)`;
    }
})();