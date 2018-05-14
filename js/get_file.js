window.onload = function () {
    //屏蔽手机浏览器对onclick的默认操作
    images = document.getElementsByTagName('img');
    for (let index = 0; index < images.length; index++) {
        images[index].onclick = function () {
            return false;
        }
    }
    
    //canvas生成高质量图片
    function convertCanvasToHighqualityImg(imgSorceElem) {
        let targetElem = document.getElementById(imgSorceElem);//待转化的DOM对象
        let width = targetElem.offsetWidth; //获取dom 宽度
        let height = targetElem.offsetHeight; //获取dom 高度
        let canvas = document.createElement("canvas"); //创建一个canvas节点
        let scale = 4; //定义任意放大倍数 支持小数
        canvas.width = width * scale; //定义canvas 宽度 * 缩放
        canvas.height = height * scale; //定义canvas高度 *缩放
        canvas.getContext("2d").scale(scale, scale); //获取context,设置scale 
        // html2canvas参数配置
        var opts = {
            scale: scale, // 添加的scale 参数
            canvas: canvas, //自定义 canvas
            // logging: true, //日志开关，便于查看html2canvas的内部执行流程
            width: width, //dom 原始宽度
            height: height,//dom 原始高度
            useCORS: true // 【重要】开启跨域配置
        };
        // 调用html2canvas插件
        let imgLabel = document.createElement('img');
        html2canvas(targetElem, opts).then(function (canvas) {
            var context = canvas.getContext('2d');
            // 【重要】关闭抗锯齿
            context.mozImageSmoothingEnabled = false;
            context.webkitImageSmoothingEnabled = false;
            context.msImageSmoothingEnabled = false;
            context.imageSmoothingEnabled = false;

            imgLabel.src = canvas.toDataURL('image/png', 1.0);
        })
        return imgLabel;//返回一个img对象
    }

    // 触发图片上传事件
    // 操作获取的本地图片
    let fileInput = document.getElementById('file-input');
    fileInput.onchange = function (e) {
        let file = e.target.files[0];
        console.log(file)
        let imgURL = window.URL.createObjectURL(file);
        let fileType = file.type;
        //文件类型检测
        if (fileType != 'image/png' && fileType != 'image/jpg' && fileType != 'image/gif' && fileType != 'image/jpeg') {
            alert('你上传的不是图片呢');
            return;
        } else {
            //修改页面的display属性
            document.getElementById('page-2').style.display = 'block';
            document.getElementById('page-1').style.display = 'none';
            //贴上用户上传的图片
            let img = document.getElementById('yonghu-img');
            let imgH,imgW;
            // 这里是十分关键的一行
            //不用onload会导致回去图片尺寸不全
            img.onload = function () {
                imgH = this.height;
                imgW = this.width;
                if(imgH > imgW){
                    img.style.width = '100%';
                    img.style.height = 'auto';
                }else{
                    img.style.width = 'auto';
                    img.style.height = '100%';
                }
            }
            img.src = imgURL;
        }

    }

    //更改主题
    let changeTheme = function (colorName, borderColor) {
        //更改头像框的装饰样式
        let touxiangImg = document.getElementsByClassName('decoration-img')[0];
        touxiangImg.src = `./images/avartar/${colorName}/decoration.png`;
        //更改头像框的边框
        avartar.style.borderColor = borderColor;
        //更改底部背景
        let footBg2 = document.getElementById('foot-bg-2');
        footBg2Img = footBg2.getElementsByTagName('img')[0];
        footBg2Img.src = `./images/avartar/${colorName}/bottom_bg.png`
        //更改大背景
        let pageBg = document.getElementById('page-2');
        pageBg.style.backgroundImage = `url(./images/avartar/${colorName}/bg.jpg)`
        //更改顶部title
        let topTitle = document.getElementById('top-title').getElementsByTagName('img')[0];
        topTitle.src = `./images/avartar/${colorName}/head_line.png`
    }
    let blueBtn = document.getElementById('blue-btn').onclick = function () {
        changeTheme('blue', '#00b6ee');
    }
    let greenBtn = document.getElementById('green-btn').onclick = function () {
        changeTheme('green', '#91c720');
    }
    let redBtn = document.getElementById('red-btn').onclick = function () {
        changeTheme('red', '#e7622f');
    }

    //触发保存图片
    let addTrigger = function(loadTrigger){
        let loadTriggerElem = document.getElementById(loadTrigger);
        loadTriggerElem.onclick = function () {
            //显示page-3
            document.getElementById('page-3').style.display = 'block'; 
            //canvas---->高质量图片
            let img = convertCanvasToHighqualityImg('square-box');
            //设置生成img的视觉样式
            img.className = 'show-img';
            document.body.appendChild(img);
        }
    }
    addTrigger('avartar');
    addTrigger('loadTriggerElem');

    //点击page-3/非预览图片区域回到page-2
    document.getElementById('page-3').onclick = function(){
        this.style.display = 'none';
        document.getElementsByClassName('show-img')[0].remove();
    }

    console.log(document.referrer);
}