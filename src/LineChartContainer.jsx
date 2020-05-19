import React, {useEffect, useState} from "react";
import Chart from "chart.js";
import {map} from "react-bootstrap/cjs/ElementChildren";
import {ListGroup} from "react-bootstrap";

const LineChartContainer = props => {
    //  console.log("props : "+ props.data);

    // var Jan = 0, Feb = 0, Mar = 0, Apr = 0,May = 0, Jun =0, Jul = 0, Aug = 0, Sept=0, Oct =0 , Nov=0, Dec=0;
    //const [status, setStatus] = useState('');
    const [lastDate, setLastDate] = useState("");
    const [province, setProvince] = useState("");
    const [provinceNames, setProvinceNames] = useState([])
    const [casesData, setCasesData] = useState([]);
    const [provinceData, setProvinceData] = useState([]);
    const chartRef = React.createRef();

    useEffect(() => {
       getProvinceData(props.provinceNames);
        // loadLineChart(li);
       // console.log(props.data);
        console.log("2 - useEffect ran... ");
    }, [props]);

    const getProvinceData =  names => {
        console.log(names);
        console.log("getProvinceData()");
        const li =  getOntarioProvince();

        // console.log(names);
        for (let i = 0; i < names.length; ++i) {
            console.log(names[i]);
            var result = li.filter(e => {
                return names[i] === e.province;
            });
//TODO use accumulator here for array of objects in which get the list of cases
            console.log(result);
            setProvinceData([
                ...provinceData,
                result
            ]);
        }

        console.log(JSON.stringify(provinceData));
        //console.log(JSON.stringify(li));


        // const formatedLi = liGroup.map((i, index) => {
        //  console.log("li[index] : " + liGroup[index]["province"]);
        //const innerData = li[index];
        // setCasesData([]);
        //console.log("innerData : " + innerData);
        //console.log("Data : " + innerData.cases + " - " + innerData.province);
        /*let cases = parseInt(j.cases, 10);
            console.log("cases : " + cases);
            setCasesData(casesData => [...casesData, cases]);
            console.log(casesData);
            p=j.province;

          });*/
        /* setProvinceData([
            ...provinceData,
            {
              cases: casesData,
              province: province
            }
          ]);*/
        //   console.log("provinceDAta: " + provinceData);
        //  });
        //return formatedLi;
    };

    const getOntarioProvince =  () => {
        console.log("getOntarioProvince()");
      //  console.log((JSON.stringify(props.data[0])));
        console.log(props.data);
        const li = props.data.filter(i => { return i.Province === "Ontario" || i.Province === "Quebec"})
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
                let dtMonth = parseInt(dt.getMonth(), 10) + 1;
                let dtDate = parseInt(dt.getDate(), 10) + 1;
                //console.log("date "+ dateFormatDate+"-"+dateFormatMonth +" -X- "+ dtDate+"-"+dtMonth);
                //console.log("date "+ dateFormatDate+"-"+dateFormatMonth +" -X- "+ currentDate+"-"+currentMonth);
                // check if the ith date is last date of the month or if it is the current month's date which is before the last day of month
                return (
                    (dateFormatMonth == dtMonth && dateFormatDate == dtDate) ||
                    (dateFormatMonth == currentMonth && dateFormatDate == currentDate)
                );
            })
            .map(function (i) {
                //  console.log("cases " + i.Cases+" on date " +i['Date']);
                setProvince(i.Province);
                let month = i["Date"].substr(5, 2);
                let date = new Date(i["Date"]);
                 console.log("date:" + date);
                let cases = parseInt(i.Cases, 10);
                 setCasesData(casesData =>casesData.concat(cases));

                setLastDate(i["Date"]);
                return {
                    country: i.Country,
                    province: i.Province,
                    date: date,
                    cases: cases,
                    lastDate: lastDate
                };
            });
        //TODO sorting by month (safe-side)

        const today = new Date();
        let dt = new Date(today.getFullYear(), today.getMonth() + 1, -1);
        /*const lastdt = new Date(lastDate).toString();
            setLastDate(lastdt);    */
        console.log(li);
        return li;
    };

    const loadLineChart = li => {
        //  console.log(li);
        var ctx = chartRef.current.getContext("2d");
        new Chart(ctx, {
            type: "line",
            data: {
                labels: ["Jan", "Feb", "Mar", "Apr"],
                datasets: [3, 15, 1048, 6648]
            },
            options: {
                responsive: true,
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true
                            }
                        }
                    ]
                }
            }
        });
    };
    return (
        <div>
            <h5>
                <span style={{color: "darkcyan"}}>Last updated on:</span>
                {lastDate}
            </h5>
            <canvas
                id={"myChart"}
                ref={chartRef}
                style={{width: "100vh", height: "80vh"}}
            />
        </div>
    );
};
export default LineChartContainer;

function groupBy1(arr, prop) {
    const map = new Map(Array.from(arr, obj => [obj[prop], []]));
    arr.forEach(obj => map.get(obj[prop]).push(obj));
    return Array.from(map.values());
}

function groupByFields(xs, groupFields) {
    groupFields = [].concat(groupFields);
    return xs.reduce(function (rv, x) {
        let groupKey = groupFields.reduce((keyObject, field) => {
            keyObject[field] = x[field];
            return keyObject;
        }, {});
        (rv[JSON.stringify(groupKey)] = rv[JSON.stringify(groupKey)] || []).push(x);
        return rv;
    }, {});
}

const groupBy2 = (data, key) => {
    return data.reduce(function (acc, item) {
        (acc[item[key]] = acc[item[key]] || []).push(item);
        return acc;
    }, {});
};
var groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};
//console.log(groupBy(['one', 'two', 'three'], 'length'));
// => {3: ["one", "two"], 5: ["three"]}
