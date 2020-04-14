import React, {useEffect, useState} from 'react';
import FruitsAndVegView from "./FruitsAndVegView";
import styles from "./CSS/FruitsAndVeg.module.css";

const FruitsAndVeg = () => {
    const [information, setInformation] = useState("");
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState("Mango");
    //const API_Request = ;
    const APP_ID = "732a00fc";
    const APP_KEY = "4a3ea286fc60d80a22746e51a1befaaa";


    useEffect(() => {
        getInfo();
        console.log("use Effect run");
    }, [query]);

    const getInfo = async () => {
        console.log("query : " + query);
        //const response = await
        /*fetch("http://tropicalfruitandveg.com/api/tfvjsonapi.php?tfvitem=Mango",*/
        // const myurl = new URL('http://tropicalfruitandveg.com/api/tfvjsonapi.php?tfvitem=mango');
        const myurl = new URL('https://api.npms.io/v2/search?q=react');
        const params = {tfvitem: query};
        myurl.search = new URLSearchParams(params).toString();

        /*const response = await fetch("http://tropicalfruitandveg.com/api/tfvjsonapi.php?tfvitem="+query, {
            mode: "no-cors",
            headers: {
                "Access-Control-Allow-Origin" : "*",
                "Access-Control-Allow-Credentials" : false
            }
        });
        const data = await response.json();
        console.log("data : " +data);*/

        // GET request using fetch with error handling
        fetch("https://api.npms.io/v2/search?q=react")
            .then(async response => {
                const data = await parseJSON(response);

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response statusText
                    const error = (data && data.message) || response.statusText;
                    console.log("NOT OKAY");
                    return Promise.reject(error);
                }
                console.log("OKAY");
                console.log(data.results[0].package.description);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });

        // return setInformation(data);
// empty dependency array means this effect will only run once (like componentDidMount in classes)
    };
    const parseJSON = (response) => {
        return response.text().then(function(text) {
            return text ? JSON.parse(text) : []
        });
    };
    const updateSearch = e => {
        setSearch(e.target.value);
    };
    const getSearch = e => {
        e.preventDefault();
        setQuery(search);
        setSearch('');
    };
    return (

        <div className='newsInfo' id="newsInfo">
            <h1 className="text-white-50">Know your Tropical Fruits and vegetables</h1>
            <form className={styles.searchForm} onSubmit={getSearch}>
                <input
                    className={styles.searchBar}
                    type='text'
                    value={search}
                    onChange={updateSearch}
                />
                <button
                    className={styles.searchButton}
                    type='submit'
                >
                    Search
                </button>
            </form>
            <div className={styles.recipes} id="demo">
                <p>{console.log("information  is : "+information)}</p>
            </div>
        </div>

    );
};
export default FruitsAndVeg;
/* <FruitsAndVegView
                       tfvname={i.tfvname}
                       botname={i.botname}
                       othname={i.othname}
                       imageurl={i.imageurl}
                       description={i.discription}
                       uses={i.uses}
                       propagation={i.propogation}
                       soil={i.soil}
                       climate={i.climate}
                       health={i.health}
                       />
                   */