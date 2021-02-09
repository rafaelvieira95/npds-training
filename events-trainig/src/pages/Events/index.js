import {Container, Col, Row, Card, Button , Modal, Form} from "react-bootstrap";
import React, {useState,useEffect, useRef} from "react";
//import {CardLink} from 'react-router-dom';

import api from '../../services/api';

export default function Events(){

    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState(false);
    
    const [name , setName] = useState('');
    const [description, setDescription] = useState('');
    const [organizer, setOrganizer] = useState('');
    const [localization, setLocalization] = useState('');
    const [beginDate, setBeginDate] = useState('');
    const [finishDate, setFinishDate] = useState('');
    
    const isSubscribed = useRef(true);

    const postNewEvent = async () =>{
       
    const eventData = {
        
           name: name,
           description: description,
           organizer: organizer,
           localization: localization,
           beginDate: beginDate,
           finishDate: finishDate
         }
        await api.post('events', eventData);           
        isSubscribed.current = true;
     }

    useEffect(() =>{
              
        isSubscribed.current = true;

        async function retriveEvent(){    
            const eventsList = await api.get('events');
            setEvents(eventsList.data);
        }

        if(isSubscribed.current)
            retriveEvent();
        
        return () => isSubscribed.current = false;
        
    }, [events]);


    return (
      <>
      <Container fluid>
          <Row>
            <Col sm={4} md={8}>
                   <h1>Eventos</h1>
             </Col>
              <Col>
                  <Button variant="primary" onClick={() => setNewEvent(true)}>Novo evento</Button>
              </Col>

            <Modal show={newEvent} onHide={() => setNewEvent(false)}>

                <Modal.Title> Criação de um novo Evento</Modal.Title>
                     <Modal.Header> Entre com dos dados do Evento </Modal.Header>
                 <Modal.Body>

                    <Form>
                        <Form.Group controlId="name">
                        <Form.Label> Nome do Evento</Form.Label>
                        <Form.Control type="text"  value={name}  onChange={(e) => setName(e.target.value)}/>
                        </Form.Group>

                        <Form.Group controlId="description">
                        <Form.Label> Descrição </Form.Label>
                        <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)}/>
                        </Form.Group>

                        <Form.Group controlId="organizer">
                        <Form.Label> Organizador </Form.Label>
                        <Form.Control type="text" value={organizer} onChange={(e) => setOrganizer(e.target.value)}/>
                        </Form.Group>

                        <Form.Group controlId="localization">
                        <Form.Label> Localização </Form.Label>
                        <Form.Control type="text" value={localization} onChange={(e) => setLocalization(e.target.value)}/>
                        </Form.Group>

                        <Form.Group controlId="beginDate">
                        <Form.Label> Data de Início </Form.Label>
                        <Form.Control type="text" value={beginDate} onChange={(e) => setBeginDate(e.target.value)}/>
                        </Form.Group>

                        <Form.Group controlId="finishDate">
                        <Form.Label> Data de Término </Form.Label>
                        <Form.Control type="text" value={finishDate} onChange={(e) => setFinishDate(e.target.value)}/>
                        </Form.Group>

                     </Form>

                 </Modal.Body>
                     <Modal.Footer>
                       <Button variant="danger" onClick={() => setNewEvent(false)}> Cancelar </Button>
                       <Button variant="success" onClick={() => {postNewEvent(); setNewEvent(false);}}> Criar evento </Button>
                     </Modal.Footer>
            </Modal>

          </Row>

              <Row>
                  {events.map((e) =>
                  <Col key={e.id} md={3}>
                    <Card style={{width: '18rem', margin: '10px'}}>
                          <Card.Body>
                              <Card.Title>{e.name}</Card.Title>
                              <Card.Subtitle className="mb-2 text-muted">{e.organizer}</Card.Subtitle>
                              <Card.Text>
                                  {e.description}
                              </Card.Text>
                              <Card.Footer> Data inicio {e.beginDate}  <br/> Data fim {e.finishDate}</Card.Footer>
                              <Card.Link to={`/programations/${e.id}`} href={`/programations/${e.id}`}> Programação do evento </Card.Link> 
                          </Card.Body>
                      </Card>
                  </Col>) }
              </Row>

      </Container>
   </>
  );
}