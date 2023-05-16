import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';


//https://covid19-japan-web-api.vercel.app/api/v1/prefectures
const EChartsTest3 = () => {
    const chartRef = useRef(null);
    const [jsonData, setJsonData] = useState([]);

    useEffect(() => {
        const mychart = echarts.init(chartRef.current);


        const getJsonData = async () => {
            const response = await fetch('https://covid19-japan-web-api.vercel.app/api/v1/prefectures');
            const data = await response.json();
            console.log(data);
            setJsonData(data);
        }

        getJsonData();
       

        const option = {
            title: {
                text: 'コロナ感染者数',
                left: 'center'
            },
            
            legend: {
                data: ['感染者数', '死亡者数'],
                top: 'bottom'
            },
           
            xAxis: {
                type: 'category',
                data: jsonData.map((item) => item.name_ja),
                boundaryGap: [0, 0.01],
                name: '人数',
                nameLocation: 'center',
            },
            yAxis: {
                type: 'value',
            },
            series: [
               
                {
                    name: '感染者数',
                    data: jsonData.map((item) => item.cases),
                    type: 'bar',
                    color: 'red'
                },
                {
                    name: '死亡者数',
                    data: jsonData.map((item) => item.pcr),
                    type: 'line',
                    color: 'blue'
                }
            ]
        }

        mychart.setOption(option)
    }, [jsonData]);

    return (
        <>
            <p>EChartsTest3</p>
            <div ref={chartRef} style={{ width: '100%', height: '500px' }} />
        </>
    )

}

export default EChartsTest3;