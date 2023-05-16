import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';
import { google } from 'googleapis';


const CLIENT_ID = "510982909444-9rf5u0tj822l8ugmqtdrd98t7g42iir0.apps.googleusercontent.com"
const CLIENT_SECRET = "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"
const REDIRECT_URL = "http://localhost:3000/kabuchart"


const analytics = new GoogleAnalytics({
    clientId: '510982909444-9rf5u0tj822l8ugmqtdrd98t7g42iir0.apps.googleusercontent.com',
    clientSecret: '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',
    redirectUri: 'http://localhost:3000/kabuchart',
  });


const KabuChart = () => {
    const chartRef = useRef(null);
    const [data, setData] = useState([]);

  useEffect(() => {

    analytics.report({
        query: {
          metrics: 'ga:sessions',
          dimensions: 'ga:date',
          'start-date': '30daysAgo',
          'end-date': 'yesterday',
        },
      })
      .then((response) => {
        setData(response.result.reports[0].data.rows);
      })
      .catch((error) => {
        console.error(error);
      });

      
      const mychart = echarts.init(chartRef.current)
      const option = {

      }

      mychart.setOption(option)
      
  }, []);

    return (
        <>
            <p>株価チャートの練習</p>
            <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
        </>
    )
}

export default KabuChart;