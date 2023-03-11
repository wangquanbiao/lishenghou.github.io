// 基于准备好的dom，初始化echarts实例
// var myChart = echarts.init(document.getElementById('main'));
// 定时器
let timer = setInterval(() => {
    let now = new Date()
    let day = now.getDate()
    let year = now.getFullYear()
    let mouth = now.getMonth() + 1
    let hour = now.getHours()
    let minute = now.getMinutes()
    let second = now.getSeconds()
    let text = year + '年' + mouth + '月' + day + '日' + hour + '时' + minute + '分' + second + '秒'
    document.querySelector('.title span').textContent = text
    console.log('');
}, 1000)


// 获取相关的dom
let a = document.querySelector('.money-container .char .item-one')
let b = document.querySelector('.money-container .char .item-two')
let c = document.querySelector('.sum-container .char .item-one')
let d = document.querySelector('.sum-container .char .item-two')
let e = document.querySelector('.middle .char')
let f = document.querySelector('.right .item-one')
let g = document.querySelector('.right .item-two')
let h = document.querySelector('.bottom-container .middle .char')
let i = document.querySelector('.bottom-container .right .char')
let j = document.querySelector('.bottom-container .left .char')
// 数据
let data1 = [
    { value: 180, name: '手机' },
    { value: 80, name: '电脑' },
    { value: 65, name: '手表' },
    { value: 151, name: '耳机' }
]
let data2 = [
    { value: 80, name: '皮带' },
    { value: 10, name: '鞋子' },
    { value: 65, name: '奶粉' },
    { value: 51, name: '饮料' }
]

drawCircles(60, '#49bcf7', a, '数量结算率')
drawCircles(30, '#62c98d', b, '金额结算率')
drawCircles(80, '#49bcf7', c, '数量结算率')
drawCircles(90, '#62c98d', d, '金额结算率')
drawCol(e)
rose(f, data1, '热销产品')
rose(g, data2, '滞销产品')
dorwArea(h)
drowLine(i)
drowCake(j)
//  封装一个画圆环的函数
function drawCircles(text, color, dom, text2) {
    // 基于准备好的dom，初始化echarts实例
    let ele = echarts.init(dom)
    // 指定图表的配置项和数据
    const option = {
        title: {
            text: text + '%',
            subtext: text2,
            left: 'center',
            top: '40',
            textStyle: {
                color: '#1890fe',
                fontSize: '14px',
            },
            subtextStyle: {
                color: '#fff'
            }
        },
        visualMap: {
            show: false,
        },
        series: [
            {
                type: 'pie',
                //环形显示饼状图，实际上显示的是50-80之间的部分
                //上限不建议设置为100，echarts自带动画效果，设置为100动画效果很丑
                radius: ['70%', '80%'],
                center: ['50%', '50%'],
                data: [
                    //itemSyle是单项的背景颜色设置。
                    { value: text, itemStyle: { color: color } },
                    { value: 100 - text, itemStyle: { color: '#333957' } },
                ],
                label: {
                    //将视觉引导图关闭
                    show: false,
                },
                // itemStyle: {
                //     //设置的是每项之间的留白
                //     borderWidth: 7,
                //     borderColor: '#fff'
                // },
                // 初始化echarts的动画效果
                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                    return Math.random() * 200;
                }
            }
        ]
    }
    // 使用刚指定的配置项和数据显示图表。
    ele.setOption(option);
}

// 封装一个画柱状图函数
function drawCol(dom) {
    // 基于准备好的dom，初始化echarts实例
    let ele = echarts.init(dom)
    const option = {

        title: {
            text: '产品销量对比情况',
            textStyle: {
                // color: '#fff'
            },
        },

        xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],

        },

        yAxis: {
            type: 'value'
        },
        legend: {
            data: ['2017', '2022']
        },
        series: [{
            name: '2017',
            data: [2, 3, 3, 9, 15, 12, 6, 4, 6, 7, 4, 10],
            type: 'bar'
        },
        {
            name: '2022',
            data: [1, 4, 5, 11, 12, 9, 5, 6, 5, 6, 3, 9],
            type: 'bar'
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    ele.setOption(option);
}

// 封装一个画南丁格尔玫瑰图函数
function rose(dom, data, text) {
    let dataName = []
    data.forEach(item => {
        dataName.push(item.name)
    })
    // 基于准备好的dom，初始化echarts实例
    let ele = echarts.init(dom)
    const option = {
        textStyle: {
            color: '#fff',
            fontSize: 14,   // 调节字体大小
        },
        title: {
            text: text,       // 主标题名称
            subtext: '',    // 副标题名称
            x: 'left'      // 标题的位置
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',         // 标签名称垂直排列
            x: 'right',
            y: '40',                 // 标签的位置
            data: dataName // 标签变量名称
        },
        toolbox: {
            // show: true,
            feature: {
                mark: { show: true },
                // dataView: { show: true, readOnly: false },
                magicType: {
                    show: true,
                    type: ['pie', 'funnel']
                },
                // restore: { show: true },
                // saveAsImage: { show: true }          // 保存图片
            }
        },
        // calculable: true,
        series: [
            {
                name: '面积模式',                    // 图表名称
                type: 'pie',                         // 图表类型
                radius: [30, 50],                 // 图表内外半径大小
                center: ['40%', '50%'],            // 图表位置
                roseType: 'area',
                // label: {
                //     normal: {
                //         show: true,
                //         formatter: '{b}({d}%)'      // 显示百分比
                //     }
                // },
                // data: [
                //     { value: 180, name: '手机' },           // 变量对应的具体数据
                //     { value: 80, name: '电脑' },
                //     { value: 65, name: '手表' },
                //     { value: 151, name: '耳机' }
                // ]
                data: data
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    ele.setOption(option);
}

// 面积图
function dorwArea(dom) {
    // 基于准备好的dom，初始化echarts实例
    let ele = echarts.init(dom)
    const option = {
        title: {
            text: '2022年收益',
            left: '10%',
            textAlign: 'center'
        },
        legend: {
            right: 20,
            orient: 'vertical',
            data: ['今日']
        },
        xAxis: {
            type: 'category',
            name: '月份',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            boundaryGap: false,
            splitLine: {
                show: false,
                interval: 'auto',
                lineStyle: {
                    color: ['#EEEEEE']
                }
            },
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#50697A'
                }
            },
            axisLabel: {
                margin: 10,
                textStyle: {
                    color: '#50697A',
                    fontSize: 13
                }
            }
        },
        yAxis: {
            type: 'value',
            name: '金额(亿)',
            splitLine: {
                lineStyle: {
                    color: ['#EEEEEE']
                }
            },
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#50697A'
                }
            },
            axisLabel: {
                margin: 10,
                textStyle: {
                    color: '#50697A',
                    fontSize: 13
                }
            }
        },
        series: [{
            // name: '今日',
            type: 'line',
            smooth: true,
            showSymbol: false,
            // symbol: 'circle',
            // symbolSize: 6,
            data: [1, 2, 4, 5, 7, 8, 10, 5, 7, 8, 9, 10],
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(16, 79, 193,1)'
                    }, {
                        offset: 1,
                        color: 'rgba(125, 178, 244,1)'
                    }], false)
                }
            },
            // itemStyle: {
            //     normal: {
            //         color: 'rgba(16, 79, 193,1)'
            //     }
            // },
            // lineStyle: {
            //     normal: {
            //         width: 0
            //     }
            // }
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    ele.setOption(option);
}

// 折线图
function drowLine(dom) {
    // 基于准备好的dom，初始化echarts实例
    let ele = echarts.init(dom)

    var xDataArr = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    var yDataArr1 = [120, 132, 101, 134, 90, 230, 210, 123, 200, 120, 140, 100]
    var yDataArr2 = [20, 82, 191, 94, 290, 330, 310, 230, 140, 300, 208, 250]
    var option = {
        title: {
            text: '2017年与2022年月份收益对比',
            left: '140',
            textAlign: 'center'
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            data: xDataArr
        },
        yAxis: {
            type: 'value',
            scale: true
        },
        legend: {
            data: ['2017', '2022'],
            right: 'right'
        },
        series: [
            {
                name: '2017',
                type: 'line',
                data: yDataArr1
            },
            {
                name: '2022',
                type: 'line',
                data: yDataArr2
            }
        ]
    }
    // 使用刚指定的配置项和数据显示图表。
    ele.setOption(option);

}

// 饼图
function drowCake(dom) {
    // 基于准备好的dom，初始化echarts实例
    let ele = echarts.init(dom)
    const option = {
        title: {
            text: '2022年收益占比',
            left: 'left'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'right',
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '40%',
                data: [
                    { value: 1048, name: '广告' },
                    { value: 735, name: '线下商品' },
                    { value: 580, name: '网店' },
                    { value: 484, name: '流量' }
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    ele.setOption(option);

}

