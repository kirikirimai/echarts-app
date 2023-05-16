import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';


//https://covid19-japan-web-api.vercel.app/api/v1/prefectures
//
const SEARCH_BASE = `https://geocoding-api.open-meteo.com/v1/search?count=20&language=en&format=json`
const WEATHER_API = "https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,relativehumidity_2m&timezone=Asia%2FTokyo&"

const WeatherChart = () => {

    const chartRef = useRef(null);
    const [jsonTemp, setJsonTemp] = useState([]);
    const [jsonRelative, setJsonRelative] = useState([]);
    const [formattedDates, setFormattedDates] = useState([]);

    const [cityInfo, setCityInfo] = useState([]);
    const [selectedOption, setSelectedOption] = useState({ name: "japan", latitude: 43.43, longitude: 142.93 });



    useEffect(() => {
        const SEARCH_URL = SEARCH_BASE + `&name=${selectedOption.name}`;
        const getCityName = async () => {
            const response = await fetch(SEARCH_URL);
            const data = await response.json();
            console.log("data", data.results);
            setCityInfo(data.results);
        }
        getCityName();
    }, [])

    useEffect(() => {
        const getJsonData = async () => {
            console.log("selectedOption", selectedOption);
            const response = await fetch(WEATHER_API + `latitude=${selectedOption.latitude}&longitude=${selectedOption.longitude}`);
            const data = await response.json();
            setJsonTemp(data.hourly.temperature_2m);
            setJsonRelative(data.hourly.relativehumidity_2m);
            console.log("湿度", data.hourly.relativehumidity_2m);

            const formatted = data.hourly.time.map((time) => {
                const date = new Date(time);
                return `${date.getMonth() + 1}/${date.getDate()}`;
            });
            setFormattedDates(formatted);
        }

        getJsonData();

    }, [selectedOption]);


    useEffect(() => {
        const mychart = echarts.init(chartRef.current);

        const option = {
            title: {
                text: '天気グラフ',
                left: 'center'
            },
            legend: {
                data: ['気温', '降水確率'],
                top: 'bottom'
            },
            xAxis: {
                type: 'category',
                data: formattedDates.map((time) => time)
            },
            yAxis: [
                {
                    type: 'value',
                    name: 'Temperature',
                    min: -20,
                    max: 40,
                    interval: 5,
                    axisLabel: {
                        formatter: '{value} °C'
                    }
                },
                {
                    type: 'value',
                    name: 'Precipitation',
                    min: 0,
                    max: 100,
                    interval: 20,
                    axisLabel: {
                        formatter: '{value} %'
                    },
                    axisLine: {
                        symbol: 'arrow',
                        lineStyle: {
                            type: 'dashed'
                            // ...
                        }
                    }
                },

            ],
            series: [
                {
                    name: '気温',
                    data: jsonTemp.map((data) => data),
                    type: 'line',
                    symbol: 'circle',
                    symbolSize: 8,
                    yAxisIndex: 0
                },
                {
                    name: '降水確率',
                    data: jsonRelative.map((data) => data),
                    type: 'line',
                    symbol: 'circle',
                    symbolSize: 2,
                    yAxisIndex: 1
                },

            ]
        }

        mychart.setOption(option)

    }, [jsonTemp, jsonRelative, formattedDates]);

    const handleDropdownChange = (e) => {
        setSelectedOption(JSON.parse(e.target.value));
    }

    return (
        <>
            <p>天気APIのテスト</p>
            <form>
                <label>知りたい都市：</label>
                <select onChange={handleDropdownChange} value={selectedOption} name="city">
                    {cityInfo.map((city) => (
                        <option key={city.id} value={JSON.stringify({ name: city.country, latitude: city.latitude, longitude: city.longitude })}>{city.name}</option>
                    )
                    )}

                </select>
            </form>
            <div ref={chartRef} style={{ width: '100%', height: '500px' }} />

        </>
    )

}

export default WeatherChart;