import React, {useEffect, useState} from "react";
import styles from "./CSS/CoronaInfo.module.css"
import CountDisplayContainer from './CountDisplayContainer';
import LineChartContainer from "./LineChartContainer";
import Chart from 'chart.js';
const CoronaInfo = () => {

    const [globalData, setGlobalData] = useState([]);
    const [countriesData, setCountriesData] = useState([]);
    const [dayOneData, setDayOneData] = useState([]);


    const API_summary = `https://api.covid19api.com/summary`;
    const API_DayOne = `https://api.covid19api.com/dayone/country/canada/status/confirmed`;

    useEffect(() => {
     //  getTotalGlobalCount();
        getCountByDayOne();
    }, []);

    const getTotalGlobalCount = async () =>{
        const response = await fetch(API_summary);
        const data = await response.json();
        setGlobalData(data.Global);
        setCountriesData(data.Countries);
    };
    const getCountByDayOne = async () =>{
        const response = await fetch(API_DayOne);
        const data = await response.json();
        setDayOneData(data);
        console.log("DayOne data: "+ data[1].Country);
        console.log("DayOne data: "+ data[1].Province);
       // getProvinceList(data)
    };
/*const getProvinceList = (data) => {
   // const unique = [...new Set(array.map(item => item.age))];
    const uniqueProvinces = [...new Set(data.map(item => item.Province))];
};*/


    return (
          <div className={styles.newsInfo} id="newsInfo">
              <h1 className="text-white-50 align-content-center justify-content-around font-weight-bolder">News Book</h1>
              <CountDisplayContainer
                  heading={"Total"}
                  data0={globalData.TotalConfirmed}
                  data1={globalData.TotalRecovered}
                  data2={globalData.TotalDeaths}
                  labels={["Cases","Recovered","Death"]}
              />
              <hr style={{width: '80%'}}/>
              <CountDisplayContainer
                  heading={"Today Updates"}
                  data0={globalData.NewConfirmed}
                  data1={globalData.NewRecovered}
                  data2={globalData.NewDeaths}
                  labels={["New Cases"," New Recovered","New Death"]}
              />

              <LineChartContainer data={dayOneData}/>
          </div>
    );
};
export default CoronaInfo;



