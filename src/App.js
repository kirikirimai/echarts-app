import React from 'react';
import ECharts from './componets/ECharts';
import EChartsTest from './componets/TestChart';
import ReactEcharts from 'echarts-for-react';
import EChartsTest2 from './componets/TestChart2';
import EChartsTest3 from './componets/TestChart3';
import WeatherChart from './componets/WeatherChart';
import HeartMap from './componets/HeartMap';

function App() {

  return (
    <div className="App">
      <WeatherChart />
      <HeartMap />
    </div>
  );
}

export default App;
