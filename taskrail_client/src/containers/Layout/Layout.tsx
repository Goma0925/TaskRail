import React from "react";
import {Container, Row, Col} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
// Jibraan's work
export default class Layout extends React.Component{
    constructor(props: any){
        super(props);
    }

    render(){
        return  <div className="layout">
                    <Container>
                        <Row>
                            <Col>1 of 2</Col>
                            <Col>2 of 2</Col>
                        </Row>
                        <Row>
                            <Col>1 of 3</Col>
                            <Col>2 of 3</Col>
                            <Col>3 of 3</Col>
                        </Row>
                    </Container>
                </div>
    }
}