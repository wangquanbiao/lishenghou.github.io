
// 获取相关的dom
// 音频
let audio = document.querySelector('audio')
// 播放按钮
let play = document.querySelector('.control-container .middle .play')
// 歌曲开始时间
let start = document.querySelector('.control-container .right .start')
// 歌曲结束时间
let end = document.querySelector('.control-container .right .end')
// 小图片
let img = document.querySelector('.control-container .left .img-box img')
// 进度条盒子
let bar = document.querySelector('.bar')
// 进度条
let rate = document.querySelector('.bar .rate')
// 顶部图片按钮
let imgChange = document.querySelector('.change-container .change-img')
// 顶部相关按钮
let textChange = document.querySelector('.change-container .change-text')
// 顶部遮罩层
let spanChange = document.querySelector('.change-container span')
// 歌曲信息盒子
let songMsg = document.querySelector('.item-container .song-msg')
// 歌词盒子
let lyricsBox = document.querySelector('.item-container .lyrics-container')
// 获取词的按钮
let word = document.querySelector('.control-container .right .lyrics-control')
// 歌词ul
let $ul = $('.item-container .lyrics-container ul')
// 获取box
let $box = $('.box')
// 获取播放列表盒子
let $songBox = $('.song-list')
// 获取菜单按钮
let $menu = $('.control-container .right .menu')
// 获取播放列表ul
let $playingList = $('.song-list .list-one ul')
// 获取歌曲title
let $songTitle = $('.control-container .left .song-msg-box .song-tltle')
// 获取上一首的按钮
let $prev = $('.control-container .middle .prev')
// 获取下一首的按钮
let $next = $('.control-container .middle .next')
// 获取歌曲标签
let $songName = $('.box .item-container .song-msg .song-name')
// 获取歌手标签
let $singer = $('.box .item-container .song-msg .singer')
// 获取音量滚动条
let $sound = $('.control-container .right .sound-container .sound input[type="range"]')
// 获取音量文字
let $soundSpan = $('.control-container .right .sound-container .sound span')
// 获取音量按钮
let $soundBtn = $('.control-container .right .sound-container')

// 歌曲加载完毕
audio.onloadedmetadata = () => {
    // 更新歌曲总时间
    let endTime = parseInt(audio.duration)
    updateTime(end, endTime)
    console.log();
}
// 封装一个更新时间函数
function updateTime(obj, time) {
    // 分
    let minute = parseInt(time / 60)
    if (minute < 10) {
        minute = '0' + minute
    }
    // 秒
    let second = parseInt(time % 60)
    if (second < 10) {
        second = '0' + second
    }
    obj.textContent = minute + ':' + second
}

// 封装一个函数更新歌曲播放的时间
function updatePlayTime(rateX) {
    // 歌曲的总时长
    let songTime = parseInt(audio.duration)
    // bar的长度
    let barWidth = parseInt(getComputedStyle(bar).width)
    // 歌曲播放时间
    let t = parseInt((songTime * rateX) / barWidth)
    // 更新播放时间
    audio.currentTime = t
    updateTime(start, t)
    // 更新歌词滚动
    lyricsMove(t)
}

// 封装一个歌词滚动的函数
function lyricsMove(time) {
    // 遍历歌词时间数组,进行判断
    songTimeArr.forEach((item, index) => {
        if (time == item) {
            $($('li')[index]).addClass('active').siblings().removeClass('active')
            $ul[0].scrollTop = index * 34

        }
    })
}

// 定义一个歌曲播放状态
let flag = false
// 点击播放按钮开始播放歌曲
play.onclick = () => {
    if (!flag) {
        // 开始播放歌曲
        audio.play()
        // 切换图标
        play.className = 'play icon-pause'
        // 更改歌曲播放状态
        flag = !flag
        // 添加动画
        img.style.animation = 'move 5s linear infinite'
    } else {
        // 暂停播放
        audio.pause()
        // 更改歌曲播放状态
        flag = !flag
        // 切换图标
        play.className = 'play icon-player-play'
        // 暂停动画
        img.style.animationPlayState = 'paused'
    }
}

//  歌曲播放实时更新进度条和时间
audio.ontimeupdate = () => {
    // 歌曲播放时间
    let now = parseInt(audio.currentTime)
    // 歌曲的总时长
    let songTime = parseInt(audio.duration)
    // bar的长度
    let barWidth = parseInt(getComputedStyle(bar).width)
    // 进度条
    let rateWidth = (now * barWidth) / songTime
    rate.style.width = rateWidth + 'px'
    // 更新播放时间
    updateTime(start, now)
    // 歌词滚动
    lyricsMove(now)
    // 歌曲播放完毕
    if (audio.ended) {
        // 更改歌曲播放状态
        flag = !flag
        // 切换图标
        play.className = 'play icon-player-play'
        // 清除动画
        img.style.animation = ''
        // 进度条归零
        rate.style.width = 3 + 'px'
        // 歌词回到顶部
        $ul[0].scrollTop = 0

        songIndex++
        if (songIndex > 2) {
            songIndex = 0
        }

        changeSong(songIndex)
        // 切换图标
        play.className = 'play icon-pause'
        // 更改歌曲播放状态
        flag = !flag
        // 添加动画
        img.style.animation = 'move 5s linear infinite'

        setTimeout(() => {
            audio.play()
        }, 1000)
    }
}

// 鼠标按住移动,拖拽进度条
rate.onmousedown = () => {
    rate.onmousemove = (e) => {
        // 进度条的宽度
        let rateX = e.offsetX
        rate.style.width = 3 + rateX + 'px'
        updatePlayTime(rateX)
    }
}

// 鼠标松开清除移动事件
rate.onmouseup = () => {
    rate.onmousemove = null
}

// 鼠标离开rate清除移动事件
rate.onmouseout = () => {
    rate.onmousemove = null
}

// 鼠标点击bar
bar.onclick = (e) => {
    let rateX = e.offsetX
    rate.style.width = rateX + 'px'
    updatePlayTime(rateX)
}

// 点击按钮进行切换
imgChange.onclick = () => {
    spanChange.style.transform = 'translateX(0%)'
}

textChange.onclick = () => {
    spanChange.style.transform = 'translateX(100%)'
}
// 定义一个歌曲的下标
// 表示从第0首开始播放
let songIndex = 0
// 定义一个数组存放歌词对应的秒数
let songTimeArr = []
// 定义一个数组存放歌手图片
let singerImgArr = []
// 定义正则表达式解析歌词
let reg1 = /\[((\d{2}):(\d{2}.\d{2}))\]([\u2E80-\u9FFF|\-|：|（|）|·|、|\w|\W|. ]*)$/
// 渲染数据
$.ajax({
    type: 'GET',
    url: './js/song.json',
    success(data) {
        // 渲染播放列表数据
        let songList = data
        songList.forEach(item => {
            $playingList.append('<li> <i class="icon-2"></i> <p class="music-name">' + item.song_name + '</p><p class="music-author">' + item.singer + '</p><p class="music-time">' + item.song_time + '</p></li>')
        })
    }

})

// 定义一个歌词状态
let isShow = false
// 歌词显示与隐藏
word.onclick = () => {
    if (!isShow) {
        songMsg.style.transform = 'rotateY(270deg)'
        lyricsBox.style.transform = 'rotateY(0deg)'
        isShow = !isShow
        word.className = 'lyrics-control active'
    } else {
        songMsg.style.transform = 'rotateY(0deg)'
        lyricsBox.style.transform = 'rotateY(270deg)'
        isShow = !isShow
        word.className = 'lyrics-control'
    }

}

// 定义一个背景图片下标
let imgIndex = 0
// 定义一个定时器
let timer = null
// 封装一个函数每隔多少秒更新背景图片
function autoChange() {
    timer = setInterval(() => {
        imgIndex++
        if (imgIndex > 2) {
            imgIndex = 0
        }
        $box.css('background-image', 'url(./' + singerImgArr[imgIndex] + ')')
    }, 3000)
}
// 调用更新背景图片函数
autoChange()

// 定义一个开关
let isShowMenu = false
// 点击菜单按钮展示歌曲列表
$menu.click(() => {
    // 显示播放列表
    if (!isShowMenu) {
        $songBox.css('transform', 'translateX(0)')
        isShowMenu = !isShowMenu
    } else {
        $songBox.css('transform', 'translateX(100%)')
        isShowMenu = !isShowMenu
    }
})
// 封装一个切换歌曲函数
function changeSong(songIndex) {

    audio.ondurationchange = () => {
        // console.log(audio.currentTime);
        rate.style.width = audio.currentTime + 3 + 'px'
    }
    showLyrics(songIndex)
    // 清除之前的定时器
    clearInterval(timer)
    // 调用函数
    autoChange()
    // 改变歌曲状态
    if (flag) {
        // 暂停播放
        audio.pause()
        // 更改歌曲播放状态
        flag = !flag
        // 切换图标
        play.className = 'play icon-player-play'
        // 暂停动画
        img.style.animationPlayState = 'paused'

    }
}
// 给播放列表的li绑定事件实现切换歌曲
$playingList.on('click', 'li', function () {
    songIndex = $(this).index()
    changeSong(songIndex)

})

// 封装一个渲染歌词数据函数
function showLyrics(index) {
    // 渲染数据
    $.ajax({
        type: 'GET',
        url: './js/song.json',
        success(data) {
            // 清空ul里面的li
            $ul.empty()
            // 清空时间数组的数据
            songTimeArr = []
            // 渲染歌词

            // 歌曲数据
            let songData = data[index]
            // console.log(songData);
            // 歌词
            let lyrics = songData.lyrics
            // 歌词数组
            let songArr = lyrics.split('\r\n')
            // 去掉歌词最后一个为空的数据
            songArr = songArr.slice(0, -1)
            songArr.forEach(item => {
                // // 歌词分钟数
                let minute = parseInt(reg1.exec(item)[2])
                // 歌词秒数
                let second = parseInt(reg1.exec(item)[3])
                // 歌词的总秒数(转化为秒数)
                let allTime = minute * 60 + second
                songTimeArr.push(allTime)
                // 歌词文本
                let songText = reg1.exec(item)[4]
                // 创建li并且添加自定义属性
                let $li = $('<li>' + songText + '<span><i class="icon-play"></i></span></li>')
                $ul.append($li)
            })


            // 更新MP3歌曲
            audio.src = songData.song_add
            // 清空之前存放的数据
            singerImgArr = []
            // 更新图片数组
            songData.singer_img.forEach(item => {
                singerImgArr.push(item)
            })
            // 更新旋转图片
            img.src = songData.song_img
            // 更新歌曲名字
            $songTitle.text(songData.song_name)
            $songName.text(songData.song_name)
            $singer.text(songData.singer)
        }

    })
}
// 调用渲染歌词数据函数
showLyrics(songIndex)

// 歌词滚动播放
$ul.on('click', 'i', function () {
    let liIndex = $(this).parent().parent().index()
    // 设置歌曲播放位置
    // console.log(songTimeArr[liIndex]);
    audio.currentTime = songTimeArr[liIndex]
    // 歌词滚动到指定位置
    lyricsMove(songTimeArr[liIndex])
    // 歌曲的总时长
    let songTime = parseInt(audio.duration)
    // bar的长度
    let barWidth = parseInt(getComputedStyle(bar).width)
    // 进度条滚动到指定位置
    let rateWidth = (songTimeArr[liIndex] * barWidth) / songTime
    rate.style.width = rateWidth + 'px'
    audio.play()
    // 如果处于播放状态就继续播放，否则进行播放
    if (!flag) {
        // 更改歌曲播放状态
        flag = !flag
        // 切换图标
        play.className = 'play icon-pause'
    }
})

// 上一首
$prev.click(function () {
    if (songIndex == 0) {
        alert('已经是第一首歌曲了')
    } else {
        songIndex--
    }
    changeSong(songIndex)

})
// 下一首
$next.click(function () {
    if (songIndex == 2) {
        alert('已经是最后一首歌曲了')
    } else {
        songIndex++
    }
    changeSong(songIndex)
})


// 调整音量
$sound.mousemove(function () {
    // console.log($sound.val());   
    let value = $sound.val() + '%'
    $sound.css('backgroundSize', value)
    $soundSpan.text(value)
    audio.volume = Number($sound.val()) / 100
    if (Number($sound.val()) == 0) {
        $soundBtn[0].className = 'icon-gl-volumeCross sound-container'
    } else {
        $soundBtn[0].className = 'icon-uniE90D sound-container'
    }
})
let changeSound = false
$soundBtn.click(function () {
    if (!changeSound) {
        changeSound = !changeSound
        $soundBtn[0].className = 'icon-gl-volumeCross sound-container'
        $sound.val(0)
        $sound.css('backgroundSize', 0)
        $soundSpan.text(0 + '%')
        audio.volume = 0
    } else {
        changeSound = !changeSound
        $sound.val(100)
        $sound.css('backgroundSize', 100)
        $soundSpan.text(100 + '%')
        $soundBtn[0].className = 'icon-uniE90D sound-container'
        audio.volume = 1
    }
})