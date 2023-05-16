import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts';

const EChartsDemo = () => {
  const chartRef = useRef(null);
  
  useEffect(() => {
    const chart = echarts.init(chartRef.current);
    chart.setOption({
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisLabel: {
            rotate: 45, // 軸ラベルを45度回転する
            color: '#333', // ラベルの文字色
            fontSize: 14, // ラベルの文字サイズ
            margin: 10, // ラベルと軸線の距離
            formatter: function(value) { // ラベルのフォーマット関数
                return value + '日';
            }
        }
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'line',
        symbol: 'circle', // シンボルの形状を円に設定する
        symbolSize: 8, // シンボルのサイズを8pxに設定する
      }]
    });
  }, []);


  return (
    <div
      ref={chartRef}
      style={{ width: '100%', height: '400px' }}
    />
  );
};

export default EChartsDemo;
