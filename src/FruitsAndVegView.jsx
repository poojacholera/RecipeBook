import React from 'react';
import styles from "./CSS/Recipe.module.css";
import Table from "react-bootstrap/Table";

const FruitsAndVegView = ({tfvname, botname, othname,imageurl,description, uses, propagation,soil, climate, health}) => {
    return (
        <div className={styles.recipe}>
            <h1 className={styles.title}>{tfvname}</h1>
                <p>Botanical Name : {botname}</p>
            <label for='othername'>Other Name(s) : </label><p>{othname}</p>
            <div>
                <label for="Description"><b>Description : </b></label>{description}
            </div>
            <img className={styles.image} src={imageurl} alt={imageurl}/>
            <Table
                responsive="sm"
                borderless
            >
                <tbody>
                <tr>
                    <th>Uses</th>
                    <td>{uses}</td>
                </tr>
                <tr>
                    <th>Propagation</th>
                    <td>{propagation}</td>
                </tr>
                <tr>
                    <th>Soil</th>
                    <td>{soil}</td>
                </tr>
                <tr>
                    <th>Climate</th>
                    <td>{climate}</td>
                </tr>
                <tr>
                    <th>Health</th>
                    <td>{health}</td>
                </tr>
                </tbody>
            </Table>
        </div>
    );
};
export default FruitsAndVegView;