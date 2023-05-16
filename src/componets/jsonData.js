import React, { useEffect, useState, useRef } from "react";
import * as echarts from "echarts";

const ECharsJsonData = () => {
  const [data, setData] = useState([]);
  const [chart, setChart] = useState(null);
  const chartRef = useRef(null);

  const initChart = () => {
    const chart = echarts.init(chartRef.current);
    setChart(chart);
    console.log("initchat")
  };
  useEffect(() => {
    initChart();
    const intervalId = setInterval(() => {
      const newData = [];
      for (let i = 0; i < 50; i++) {
        newData.push({
          label: `Label ${i}`,
          value: Math.random() * 400,
        });
      }
      setData(newData);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (chart) {
      const option = {
        xAxis: {
          type: "category",
          data: data.map((item) => item.label),
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: data.map((item) => item.value),
            type: "line",
          },
        ],
      };
      chart.setOption(option);
    }
  }, [data, chart]);

  return (
    <div>
      <h1>JsonDataから値を取ってきて表示させる</h1>
      <div ref={chartRef} style={{ width: "100%", height: "400px" }} />
    </div>
  );
};

export default ECharsJsonData;
