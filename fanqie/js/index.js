// 获取所有的list
window.onload = () => {

    // 获取轮播图盒子
    let div = document.querySelector('.carousel-box')
    // console.log(div);
    // 轮播图
    let ul = document.querySelector('.carousel-box ul')
    // console.log(ul);
    let img = document.querySelector('.carousel-box ul li img')
    // console.log(img);
    let dots = document.querySelectorAll('.carousel-dot span')
    // console.log(dots);
    // 获取头部盒子
    let header = document.querySelector('.head-nav-box')
    // console.log(header);
    // 图片的宽度
    let imgWidth = parseInt(getComputedStyle(img).width)
    let imgIndex = 0
    // 定义一个颜色数组
    let colorArr = ['#bce3fe', '#b1e09b', '#fc7708', '#fff7e7', '#fbf5ed', '#e5faff', '#f7f4ee', '#f4f9fc']
    // 封装一个定时器函数
    function interval() {
        // 开始之前先清空之前的定时器
        clearInterval(ul.timer)

        ul.timer = setInterval(() => {
            dots.forEach((item, index) => {
                if (item.classList.contains('active')) {
                    imgIndex = index
                }
                item.classList.remove('active')
            })
            imgIndex++
            if (imgIndex == 8) {
                // clearInterval(timer)
                ul.style.left = 0 + 'px'
                imgIndex = 0
                dots[imgIndex].classList.add('active')
                header.style.backgroundColor = colorArr[imgIndex]

                return
            }
            header.style.backgroundColor = colorArr[imgIndex]
            dots[imgIndex].classList.add('active')
            ul.style.left = -(imgIndex * imgWidth) + 'px'
            // console.log(parseInt(getComputedStyle(ul).left));

        }, 1500)
    }
    // 开启定时器
    interval()
    // 小圆点的点击事件
    dots.forEach((item, index) => {
        item.onclick = () => {
            // 排他
            dots.forEach(value => {
                value.className = ''
            })
            item.className = 'active'
            // 实现切换功能
            ul.style.left = -(imgWidth * index) + 'px'
            header.style.backgroundColor = colorArr[index]
        }
    })
    // 鼠标进入div清除定时器
    div.onmouseenter = () => {
        clearInterval(ul.timer)
    }
    // 鼠标离开,重新开启定时器
    div.onmouseleave = () => {
        interval()
    }

    // 获取侧边栏
    let side = document.querySelector('.side-nav')
    console.log(side);
    // 页面滚动超过390px(头部和轮播图盒子的高度),页面头部的颜色固定不变
    window.onscroll = () => {
        side.style.right = 37 + 'px'
        // console.log(window.scrollY);
        if (window.scrollY >= 390) {
            header.style.backgroundColor = '#fff'
            clearInterval(ul.timer)
        } else {
            let i = 0
            dots.forEach((item, index) => {
                if (item.classList.contains('active')) {
                    i = index
                }
            })
            header.style.backgroundColor = colorArr[i]
            interval()
        }
        if (window.scrollY >= 4200) {
            side.style.right = -30 + 'px'
        }
    }


    // 作家部分轮播图

    // 获取作家ul
    let writerUl = document.querySelector('.writer-container ul')
    // console.log(writerUl);
    // 获取左右按钮
    let leftDot = document.querySelector('.writer-box .left-dot')
    // console.log(leftDot);
    let rightDot = document.querySelector('.writer-box .right-dot')
    // console.log(rightDot);

    // 获取li的宽度
    let writeLi = writerUl.querySelector('li')
    // console.log(writeLi);
    let liWidth = parseInt(getComputedStyle(writeLi).width)
    let liIndex = 0
    if (liIndex > 1) {
        leftDot.style.display = 'block'
    }

    rightDot.onclick = () => {
        // let left = parseInt(getComputedStyle(writerUl).left)
        leftDot.style.display = 'block'
        liIndex += 1
        // console.log(left);
        if (liIndex == 11) {
            rightDot.style.display = 'none'
        }
        // console.log(liIndex);
        writerUl.style.left = -((liWidth * 5) * liIndex) + 'px'
    }

    leftDot.onclick = () => {
        liIndex--
        let left = parseInt(getComputedStyle(writerUl).left)
        // console.log(left);
        writerUl.style.left = left + ((liWidth * 5)) + 'px'

        if (liIndex == 0) {
            leftDot.style.display = 'none'
        }
        rightDot.style.display = 'block'
        // console.log(liIndex);

    }


    // 榜单的事件

    // 封装一个榜单事件函数
    function enterEvent(dom) {
        dom.forEach(item => {
            // console.log(item.children[1].children[1]);
            // console.log(item.children[2].children[0]);
            item.onmouseenter = () => {
                dom.forEach(value => {
                    value.children[1].children[1].style.display = 'none'
                    value.children[2].children[0].style.display = 'none'
                })
                item.children[1].children[1].style.display = 'block'
                item.children[2].children[0].style.display = 'block'
            }

        })
    }

    // 都市榜
    let city = document.querySelectorAll('.boy-list .boy-city-list .boy-list-container .boy-list-item')
    enterEvent(city)
    // 玄幻榜
    let fantasy = document.querySelectorAll('.boy-list .boy-fantasy-list .boy-list-container .boy-list-item')
    enterEvent(fantasy)
    // 男生小众榜
    let boySmall = document.querySelectorAll('.boy-list .boy-small-list .boy-list-container .boy-list-item')
    enterEvent(boySmall)
    // 现言榜
    let modern = document.querySelectorAll('.girl-list .girl-modern-list .girl-list-container .girl-list-item')
    enterEvent(modern)
    // 古言榜
    let ancient = document.querySelectorAll('.girl-list .girl-ancient-list .girl-list-container .girl-list-item')
    enterEvent(ancient)
    // 女生小众榜
    let girlSmall = document.querySelectorAll('.girl-list .girl-small-list .girl-list-container .girl-list-item')
    enterEvent(girlSmall)

    // 侧边栏事件
    let sideNav = side.children[0]
    // console.log(sideNav);
    let isShow = false
    // 获取弹出框部分
    let message = document.querySelector('.message-box')
    sideNav.onmouseover = () => {
        // 显示弹出框
        isShow = true
        if (isShow) {
            message.style.visibility = 'visible'
        }
        // let timer1 = setTimeout(() => {
        //     message.style.visibility = 'hidden'
        // }, 1500)

        // message.onmouseenter = () => {
        //     clearTimeout(timer1)
        // }

        message.onmouseleave = () => {
            message.style.visibility = 'hidden'
        }
    }

    // sideNav.onmouseout = () => {
    //     if(isShow){
    //         message.style.visibility = 'hidden'
    //     }
        
    // }




    let timer = null
    let sideNavUl = sideNav.querySelector('ul')
    let sideNavLi = sideNav.querySelector('ul li')
    let sideNavLiWidth = parseInt(getComputedStyle(sideNavLi).width)
    // console.log(sideNavLi);
    // console.log(sideNavLiWidth);
    let i = 0
    timer = setInterval(() => {
        // let ulLeft = parseInt(getComputedStyle(sideNavUl).left)
        // console.log(ulLeft);
        // // console.log(-(sideNavLiWidth * 3));
        // if (ulLeft == -(sideNavLiWidth * 2)) {
        //     // sideNavUl.style.left = -(sideNavLiWidth*a)+'px'
        //     sideNavUl.style.left = 0 + 'px'
        // } else {
        //     let speed = 2
        //     // sideNavUl.style.left = -(sideNavLiWidth*a)+'px'
        //     sideNavUl.style.left = ulLeft - speed + 'px'
        // }

        if (i == 2) {
            i = 0
            sideNavUl.style.left = 0 + 'px'
        } else {
            i++
            sideNavUl.style.left = -(sideNavLiWidth * i) + 'px'
        }
    }, 1000)
}
