import React from 'react';
import styles from "./CSS/CoronaInfo.module.css"
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

/**
 * A re-usable component
 * currently used twice in CoronaInfo component
* */
const CountDisplayContainer = ({heading,data0,data1,data2, labels}) => {

    return (

            <Container className={styles.counterDisplayContainer}>
                <Row >
                    <Col>
                        <div className={styles.cardHeadingContainer}>
                            <h1 className={styles.cardHeading}>{heading}</h1>
                        </div>
                    </Col>
                    <Col>
                        <Card className={styles.cardViews} >
                            {/*<Card.Img variant="top" src="holder.js/100px180" />*/}
                            <Card.Body className={styles.cardBox}>
                                <p  className={styles.digits}>{numberWithCommas(data0)}</p><br/>
                            </Card.Body>
                            <div className={styles.cardLabel}>
                                <p> {labels[0]}</p>
                            </div>
                        </Card>
                    </Col>
                    <Col>
                        <Card className={styles.cardViews} >
                            {/*<Card.Img variant="top" src="holder.js/100px180" />*/}
                            <Card.Body className={styles.cardBox}>
                                <p  className={styles.digits}>{numberWithCommas(data1)}</p><br/>
                            </Card.Body>
                            <div className={styles.cardLabel}>
                                <p> {labels[1]}</p>
                            </div>
                        </Card>
                    </Col>
                    <Col>
                        <Card className={styles.cardViews} >
                            {/*<Card.Img variant="top" src="holder.js/100px180" />*/}
                            <Card.Body className={styles.cardBox}>
                                <p  className={styles.digits}>{numberWithCommas(data2)}</p><br/>
                            </Card.Body>
                            <div className={styles.cardLabel}>
                                <p> {labels[2]}</p>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>

    );
};
export default CountDisplayContainer;

function numberWithCommas(x) {
    if(typeof(x) == "number"){
        /*return x_string.replace(/\B(?=(\d{3})+(?!\d))/g, ",");*/
        const n = String(x),
            p = n.indexOf('.')
        return n.replace(
            /\d(?=(?:\d{3})+(?:\.|$))/g,
            (m, i) => p < 0 || i < p ? `${m},` : m
        )
    }
    return x;
}