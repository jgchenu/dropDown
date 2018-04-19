;
(function () {
    var DropDown = function (dropId = 'dropDwon', distance = 100, callBack = () => {}, tip = '努力加载中...') {
        this.dropDown = document.getElementById(dropId);
        this.tip = tip;
        this.tipDiv = null;
    }
    DropDown.prototype.init = function () {
        this.tipDiv = document.createElement('div');
        this.tipDiv.setAttribute('class', 'tipDiv');
        this.tipDiv.innerHTML = this.tip;
        let first = this.dropDown.firstChild;
        this.dropDown.insertBefore(this.tipDiv, first);
        let styleEle = document.createElement('style');
        styleEle.innerHTML += '.tipDiv{height:50px;line-height:50px;text-align:center;width:100%;border:1px solid #ccc}';
        document.head.appendChild(styleEle);
    }
})();