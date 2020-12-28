import React,{useState,  useEffect} from 'react';
//import api from '../../services/api';
import {Button, Col, Row} from "react-bootstrap";
import {Container} from "react-bootstrap";

export default function Home() {

    const [counter, setCounter] = useState(0);

  useEffect(() =>{
     document.title = `Botao clicado ${counter}x`;
  } ,[counter]);

    return(
        <>
        <Container className="container-fluid">
    <Col>
       <Row> <h2>Sistema de eventos Home</h2> </Row>
       <Button type="button" onClick={() => setCounter(counter + 1)}> Click </Button>
   </Col>
        </Container>
    </>
    );
       
}
