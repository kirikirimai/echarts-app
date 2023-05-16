import React from 'react';
import ECharts from './componets/ECharts';
import EChartsTest from './componets/TestChart';
import ReactEcharts from 'echarts-for-react';
import EChartsTest2 from './componets/TestChart2';
import EChartsTest3 from './componets/TestChart3';

function App() {

  const option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }
    ]
  };

  return (
    <div className="App">
      <h1>React ECharts</h1>
      <ECharts />

      <hr />
      <h1>React ECharts for React</h1>
      <ReactEcharts option={option} />

      <hr />
      <h1>ECharts の練習</h1>
      <EChartsTest />

      <hr />
      {/* <ECharsJsonData /> */}

      <hr />
      <EChartsTest2 />

      <hr />
      <EChartsTest3/>

    </div>
  );
}

export default App;
