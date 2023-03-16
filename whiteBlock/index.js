// 获取相关dom
let container = document.querySelector('.container')
let btn = document.querySelectorAll('button')
let block = document.querySelectorAll('.col')
let score = document.querySelector('.score')
// 定义一个变量是否开始游戏
let start = false
// 定义一个定时器
let timer = null
// 定义一个成绩
let scores = 0
// 定义一个速度
let speed = 2
// 是否重新开始
let restart = false
// 点击开始游戏，页面开始滚动
btn[0].onclick = () => {
    if (start) {
        alert('已开始游戏')
        return
    }
    if (restart) {
        alert('游戏已结束，请重新开始游戏')
        return
    }
    start = true


    if (start) {

        timer = setInterval(() => {

            let top = parseInt(getComputedStyle(container).top)
            container.style.top = speed + top + 'px'
            if (top >= 0) {


                // 创建元素
                let row = document.createElement('div')
                row.className = 'row'
                let num = random()
                for (let i = 0; i < 4; i++) {
                    let col = document.createElement('div')
                    if (num == i) {
                        col.className = 'col active'
                    } else {
                        col.className = 'col'
                    }
                    row.appendChild(col)
                }
                container.insertBefore(row, container.firstElementChild)
                container.style.top = -100 + 'px'


                if (container.childElementCount > 5) {
                    // 删除最后一个元素
                    container.removeChild(container.lastElementChild)
                }

                // 触底检测
                let children = container.lastElementChild.children
                for (let i = 0; i < children.length; i++) {
                    if (children[i].classList.contains('active')) {
                        clearInterval(timer)
                        start = true
                        restart = true
                        alert('游戏结束')
                    }
                }

            }
        }, 20)
    }


}

// 生成随机数函数
function random() {
    return Math.floor(Math.random() * 4)
}

container.onclick = (e) => {
    if (e.target.classList.contains('col')) {

        if (!start) {
            if (restart) {
                alert('请重新开始游戏')
            } else {
                alert('请开始游戏')
            }

        } else {
            if (e.target.classList.contains('active')) {
                scores++
                if (!(scores % 10)) {
                    speed += 2
                }
                score.innerText = scores
                e.target.className = 'col'
            } else {
                start = false
                restart = true
                alert('游戏结束')
                clearInterval(timer)
            }

        }

    } else {


    }
}

// 重新开始游戏
btn[1].onclick = () => {
    location.reload()
}