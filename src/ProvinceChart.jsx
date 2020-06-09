import React, {useEffect, useState} from "react";
import Chart from "chart.js";

const ProvinceChart = (props) => {
    const [lastDate, setLastDate] = useState("");
    const [confirmedCasesData, setConfirmedCasesData] = useState([]);
    const [activeCasesData, setActiveCasesData] = useState([]);
    const [deathData, setDeathData] = useState([]);
    const [provinceData, setProvinceData] = useState([]);

console.error("Province.chart....")
    console.log(props.province);
    console.log(props.data);
    const chartRef = React.createRef();
    useEffect(() => {

       let li = getDataset();
       // console.log(JSON.stringify(li));
        loadLineChart(li);
    }, [props]);

    const getDataset = () =>{
        const li = props.data
            .filter(i => {
                //gets today's date and month

                const today = new Date();
                let currentMonth = parseInt(today.getMonth(), 10) + 1;
                let currentDate = parseInt(today.getDate(), 10) - 1;
                //gets ith date's month and date
                const dateFormat = new Date(i["Date"]);
                let dateFormatMonth = parseInt(dateFormat.getMonth(), 10) + 1;
                let dateFormatDate = parseInt(dateFormat.getDate(), 10) + 1;
                //gets last day of the month
                let dt = new Date(
                    dateFormat.getFullYear(),
                    dateFormat.getMonth() + 1,
                    0
                );
                let dtMonth = parseInt(dt.getMonth(), 10) +1;
                let dtDate = parseInt(dt.getDate(), 10) +1;
                //console.log("date "+ dateFormatDate+"-"+dateFormatMonth +" -X- "+ dtDate+"-"+dtMonth);
                //console.log("date "+ dateFormatDate+"-"+dateFormatMonth +" -X- "+ currentDate+"-"+currentMonth);
                // check if the ith date is l//TODO sorting by month (safe-side)ast date of the month or if it is the current month's date which is before the last day of month
                return (
                    (dateFormatMonth == dtMonth && dateFormatDate == dtDate) ||
                    (dateFormatMonth == currentMonth && dateFormatDate == currentDate)
                );
            })
            .map( (i) => {
                console.log("cases " + i.Cases+" on date " +i['Date']);
              /*  setProvince(i.Province);*/
                let month = i["Date"].substr(5, 2);
                let date = new Date(i["Date"]);
                console.log("date:" + date);
                let cases = {
                    confirmed : parseInt(i.Confirmed, 10),
                    active : parseInt(i.Active, 10),
                    deaths : parseInt(i.Deaths, 10)
                }
                setConfirmedCasesData(data =>data.concat(cases.confirmed));
                setActiveCasesData(data =>data.concat(cases.active));
                setDeathData(data =>data.concat(cases.deaths));

                setLastDate(i["Date"]);
                return {
                    country: i.Country,
                    date: date,
                    confirmed: cases.confirmed,
                    active: cases.active,
                    deaths: cases.deaths,
                    lastDate: lastDate
                };
            });
        console.log(li);
        let active = [].concat(li.map(i => i.active));
        let confirmed = [].concat(li.map(i => i.confirmed));
        let deaths = [].concat(li.map(i => i.deaths));
        let labels = [].concat(li.map(i => {
            //return i.date.getDate();
            let date=new Date(i.date);
            let dt ="";
            dt=dt.concat(date.getDate().toString());
            dt = dt.concat(" - ");
            dt= dt.concat(getMonthMMM(date))
            console.log(dt);
            return dt;
        }));
        /*let province = [...new Set(li.map(i => {
            if(!i.province==""){
                return i.province
            }else{
                return i.country
            }
        }))];*/
        return  {
            active: active,
            confirmed: confirmed,
            deaths:deaths,
            labels:labels,
           /* province:province*/
        };
    }


    const loadLineChart = li => {
        console.log(li)
        const ctx = chartRef.current.getContext("2d");
        new Chart(ctx, {
            type: "bar",
            data: {
                datasets: [{
                    label: 'Active Cases',
                    data: li["active"],

                },
                    {
                        label: 'Deaths',
                        data: li["deaths"],
                        backgroundColor: [
                            'rgba(255, 120, 132, 0.2)',
                            'rgba(255, 120, 132, 0.2)',
                            'rgba(255, 120, 132, 0.2)',
                            'rgba(255, 120, 132, 0.2)',
                            'rgba(255, 120, 132, 0.2)',

                        ],
                    },
                    {
                        label: 'Confirmed Cases',
                        data: li["confirmed"],

                        // Changes this dataset to become a line
                        type: 'line'
                    }],
                labels: li["labels"]
            },
            options: {
                title: {
                    display: true,
                    text: props.province
                },
                responsive: true,
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: false
                            }
                        }
                    ]
                },
                plugins: {
                    filler: {
                        propagate: true
                    }
                }
            }
        });
    };
    return (
        <div>

            <canvas
                id={"myChart"}
                ref={chartRef}
                style={{width: "100vh", height: "80vh"}}
            />
            <p>
                <span style={{color: "darkcyan"}}>Last updated on:</span>
                {lastDate}
            </p>
            <div>
                <br/>
            </div>
        </div>
    );
}
export default ProvinceChart;

/**
 * @param : Date Object
 * @return string month (MMM/ month)
 * To get month name from Date object
 * */
const getMonthMMM = (obj) =>{
    let x = obj.getMonth();
    const month = ["January", "February","March","April","May","June","July","August","September","October","November","December"]
    const mon = ["Jan", "Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"]
    return mon[x];
};