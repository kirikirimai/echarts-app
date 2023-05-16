import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

const EChartsTest2 = () => {
    const chartRef = useRef(null);


    useEffect(() => {

        const data = [];
        const data2 = [];
        for (let i = 0; i < 7; i++) {
            data.push(Math.floor(Math.random() * 200));
            data2.push(Math.floor(Math.random() * 200));
        }

        const mychart = echarts.init(chartRef.current);

        const option = {
            title: {
                text: '折れ線グラフとバーの例'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'cross',
                  crossStyle: {
                    color: '#ffff00'
                  }
                }
              },
            legend: {
                // Try 'horizontal'
                orient: 'horizontal',
                right: 10,
                top: '10',
                selected: {
                    'シリーズ1': true,
                    'シリーズ2': true
                }
            },
            xAxis: {
                type: 'category',
                data: ['月', '火', '水', '木', '金', '土', '日'],
                axisLabel: {
                    color: 'red', // ラベルの文字色
                    fontSize: 12, // ラベルの文字サイズ
                    fontFamily: 'sans-serif', // ラベルのフォントファミリー
                    fontWeight: 'bold', // ラベルのフォントウェイト
                }
            },
            yAxis: [
                {
                    type: 'value',
                    min: 0,
                    max: 200,
                    interval: 50,
                    axisLabel: {
                        color: 'blue', // ラベルの文字色
                        fontSize: 12, // ラベルの文字サイズ
                        fontFamily: 'sans-serif', // ラベルのフォントファミリー
                        fontWeight: 'bold', // ラベルのフォントウェイト
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#333',
                            width: 2,
                            type: 'solid'

                        }
                    }

                }
            ],
            series: [
                {
                    name: 'シリーズ1',
                    data: data.map((item) => item),
                    type: 'line',
                    color: 'red'
                },
                {
                    name: 'シリーズ2',
                    data: data2.map((item) => item),
                    type: 'bar',
                    color: 'blue'
                }
            ]
        }

        mychart.setOption(option)
    }, []);


    return (
        <>
            <p>コンポーネント</p>
            <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
        </>
    )

}

export default EChartsTest2;