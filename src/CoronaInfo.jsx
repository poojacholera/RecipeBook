import React, {useEffect, useState} from "react";
import styles from "./CSS/CoronaInfo.module.css";
import CountDisplayContainer from "./CountDisplayContainer";
import LineChartContainer from "./LineChartContainer";
import Select from '@material-ui/core/Select';
import CountryChart from "./CountryChart";


const CoronaInfo = () => {
    const [globalData, setGlobalData] = useState([]);
    const [countriesData, setCountriesData] = useState([]);
    const [dayOneData, setDayOneData] = useState([]);
    const [provinceList, setProvinceList] = useState([]);
    const [countryList,setCountryList] =useState([]);
    const [selectCountry, setSelectCountry] = React.useState({});

    /*const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);*/

    const API_summary = `https://api.covid19api.com/summary`;
    const API_countryList = `https://api.covid19api.com/countries`;
    var API_DayOne = `https://api.covid19api.com/dayone/country/canada/status/confirmed`;

    useEffect(() => {
        console.log("1 - useEffect ran... ");
        getTotalGlobalCount();
         getCountryList();
    },[]);

    const getTotalGlobalCount = async () => {
        await fetch(API_summary)
            .then(res => res.json())
            .then(data => {
                setGlobalData(data.Global);
                setCountriesData(data.Countries);
            });
    };
    const getCountryList = async() => {
      await fetch(API_countryList)
            .then(res => res.json())
            .then(data => {
                setCountryList(data);
            });
    };
    const handleCountryChange = (event) => {
        console.log(selectCountry);
        //console.log(event.target);
        onCountrySelect(event.target.value).then((res) => {
            setSelectCountry(res[0]);
            getCountByDayOne(res[0].Slug);
        });
    };
    const onCountrySelect = async (c) => {
        console.log(c);
        const selectedObj = countriesData.filter((i)=>{
           // console.log(i.CountryCode +"==="+  c);
            return i.CountryCode ==  c ;
        });
        console.log(selectedObj);
        console.log("-  selected country");
        return selectedObj;
    }

    const getCountByDayOne = async (val) => {
        //fetchData()
        //TODO error check for val
        API_DayOne = `https://api.covid19api.com/dayone/country/${val}`;
        console.log(API_DayOne)
        let data = await fetch(API_DayOne)
            .then(res => res.json());
        setDayOneData( data);
      //  console.log(data);
        // if data is empty ELSE if province is empty
        if(JSON.stringify(data) === '[]' ){
            console.log("province emtpty")
            //  TODO
            //console.log(data);
        }else {
            if(!(data[0].Province === "")){
                const list = getProvinceList(data);
                setProvinceList(list);
            }
        }
    };
    /**
     * get List of names of province
     */
    const getProvinceList = (data) => {
        let unique = [...new Set(data.map(item => {
            if(item.Province == ""){
                return item.Country;
            }else{
                return item.Province;
            }

        }))];
        return unique;
    };
    /*const getProvinceList = (data) => {
     // const unique = [...new Set(array.map(item => item.age))];
      const uniqueProvinces = [...new Set(data.map(item => item.Province))];
  };*/
    const countryOptions = countryList.map(obj =>
            <option value={obj.ISO2} label={obj.Country} >{obj.Country}</option>
        )
    return (
        <div className={styles.newsInfo} id="newsInfo" onLoad={() => getTotalGlobalCount()}>
            <h3 className="text-white-50 align-content-center justify-content-around font-weight-bolder">
                News Book
            </h3>

            <h1><b>C<i className="fas fa-virus fa-x" style={{color:"darkcyan"}}></i>VID-19</b></h1>

            <CountDisplayContainer
                heading={"Total"}
                data0={globalData.TotalConfirmed}
                data1={globalData.TotalRecovered}
                data2={globalData.TotalDeaths}
                labels={["Cases", "Recovered", "Death"]}
            />
            <hr style={{width: "80%"}}/>

            <div >
                <label id="demo-simple-select-label">Select Country</label>
                <Select
                    id="demo-simple-select"
                    value={selectCountry.Country}
                    onChange={(val)=>handleCountryChange(val)}
                >
                    {countryOptions}

                </Select>

                {!(JSON.stringify(selectCountry) === '{}') &&
                    <CountDisplayContainer
                    heading={`${selectCountry.Country}`}
                    data0={selectCountry.TotalConfirmed}
                    data1={selectCountry.TotalRecovered}
                    data2={selectCountry.TotalDeaths}
                    labels={["Cases", "Recovered", "Death"]}
                    />
                }
                {/*<LineChartContainer data={dayOneData} provinceList={provinceList}/>*/}
                <CountryChart data={dayOneData} provinceList={provinceList} />
            </div>
            <p>Source: https://www.covid19api.com/</p>
        </div>
    );
};
export default CoronaInfo;
