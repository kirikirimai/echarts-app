import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

const EChartsTest = () => {
    const chartRef = useRef(null);
    
    //ランダムのデータを作成する関数
    const randamData = () => {
        const data = [];
        for (let i = 0; i < 7; i++) {
            data.push(Math.floor(Math.random() * 200));
        }
        return data;
    } 

    useEffect(() => {
        const chart = echarts.init(chartRef.current, "dark");

        const option = {
            title: {
                text: '折れ線グラフの例'
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
                data: ['月', '火', '水', '木', '金', '土', '日']
            },
            yAxis: {
                type: 'value',
                min: 0,
                max: 200,
                interval: 10,
                axisLabel: {
                    formatter: '{value}個'
                }
            },
            series: [{
                name: 'シリーズ1',
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'line',
                color: 'red'
            }, {
                name: 'シリーズ2',
                data:randamData(),
                type: 'line',
                color: 'blue'
            }]
        };

        chart.setOption(option);
}, []);


return (
    <>
        <p>コンポーネント</p>
        <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
    </>
)

}

export default EChartsTest;