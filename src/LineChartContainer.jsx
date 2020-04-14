import React, {useEffect, useState} from "react";
import styles from "./CSS/CoronaInfo.module.css"
import Chart from 'chart.js';
import {map} from "react-bootstrap/cjs/ElementChildren";

const LineChartContainer = (props) => {
    //  console.log("props : "+ props.data);

    // var Jan = 0, Feb = 0, Mar = 0, Apr = 0,May = 0, Jun =0, Jul = 0, Aug = 0, Sept=0, Oct =0 , Nov=0, Dec=0;
    //const [status, setStatus] = useState('');
    const [lastDate, setLastDate] = useState('');
    const [province, setProvince] = useState('');
    const [casesData, setCasesData] = useState([]);
    const chartRef = React.createRef();

    useEffect(() => {
        //let li = getOntarioProvince();
        let li = getProvinceData();
        // getQuebecProvince();
        console.log('result: ' + li);
        // getAxis();
          loadLineChart(li);
    });
    const getProvinceData = () => {
        let li = getOntarioProvince();
        const liGroup = groupBy(li,"province");
      console.log(liGroup);
        const formatedLi = liGroup.map((i,index) => {
            console.log("li[index] : " + liGroup[index]["province"]);
           /* let cases = parseInt(i.cases, 10);
            // console.log("cases : "+cases);
            var name = 'province';
            this[name+'_'+i.province] = [];
            setCasesData(casesData => [...casesData, cases]);
            console.log(casesData);*/


        });
        return formatedLi;
    };


    const getOntarioProvince = () => {
        setCasesData([]);
        const li = props.data/*.slice(0,1)*/
            .filter(i => (i.Province === 'Ontario' || i.Province === 'Quebec' ))
            .filter(i => {
                //gets today's date and month
                const today = new Date();
                let currentMonth =parseInt(today.getMonth(),10) +1;
                let currentDate =parseInt(today.getDate(),10)-1 ;
                //gets ith date's month and date
                const dateFormat = new Date(i['Date']);
                let dateFormatMonth =parseInt(dateFormat.getMonth(),10) +1;
                let dateFormatDate =parseInt(dateFormat.getDate(),10) +1;
                //gets last day of the month
                let dt = new Date(dateFormat.getFullYear(), dateFormat.getMonth() +1, 0);
                let dtMonth =parseInt(dt.getMonth(),10) +1;
                let dtDate =parseInt(dt.getDate(),10) +1;
                //console.log("date "+ dateFormatDate+"-"+dateFormatMonth +" -X- "+ dtDate+"-"+dtMonth);
                //console.log("date "+ dateFormatDate+"-"+dateFormatMonth +" -X- "+ currentDate+"-"+currentMonth);
                // check if the ith date is last date of the month or if it is the current month's date which is before the last day of month
                return (dateFormatMonth == dtMonth && dateFormatDate == dtDate) || (dateFormatMonth == currentMonth && dateFormatDate == currentDate);
            })
            .map(function (i) {
              //  console.log("cases " + i.Cases+" on date " +i['Date']);
                setProvince(i.Province);
                let month = i['Date'].substr(5, 2);
                let date = new Date(i['Date']);
                console.log("date:"+date);
                let cases = parseInt(i.Cases, 10);
              // setCasesData(casesData =>casesData.concat(cases));

                setLastDate(i['Date']);
                return {
                    country: i.Country,
                    province: i.Province,
                    date: date,
                    cases: cases,
                    lastDate: lastDate,
                };
            });
//TODO sorting by month (safe-side)

/*const p = li.length;
    for(k =0; k<=li.length; ++k){

    }*/const today = new Date();
        let dt = new Date(today.getFullYear(), today.getMonth() +1, -1);
        /*const lastdt = new Date(lastDate).toString();
        setLastDate(lastdt);    */
        return li;
    };



    const loadLineChart = (li) => {
           console.log(li);
        var ctx = chartRef.current.getContext("2d");
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["Jan", "Feb", "Mar", "Apr"],
                datasets: li,
            },
            options: {
                responsive: true,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    };
    return (
        <div>
            <h5><span style={{color: "darkcyan"}}>Last updated on:</span>{lastDate}</h5>
            <canvas id={"myChart"} ref={chartRef} style={{width: "100vh", height: "80vh"}}></canvas>
        </div>
    );
};
export default LineChartContainer;

function groupBy(arr, prop) {
    const map = new Map(Array.from(arr, obj => [obj[prop], []]));
    arr.forEach(obj => map.get(obj[prop]).push(obj));
    return Array.from(map.values());
}