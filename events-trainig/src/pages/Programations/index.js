
import React,{useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Container, Row, Col, Card, Button, Modal, Form, Toast} from 'react-bootstrap';
import api from '../../services/api';

export default function Programation(){
     
  const now = new Date();
  
  const {id} = useParams();
  const eventPath = `events/${id}`;
  
  const [event , setEvent] = useState([]);
  const [newProgramation , setNewProgramation] = useState(false);
  const [show, setShow] = useState(false);
   
    //attr
    const [name, setName] = useState('');
    const [presenter, setPresenter] = useState('');
    const [description, setDescription] = useState('');
    const [beginDate, setBeginDate] = useState(''); 
    const [finishDate, setFinishDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [workload, setWorkload] = useState(0);
    const [beginRegistration, setBeginRegistration] = useState('');
    const [finishRegistration, setFinishRegistration] = useState('');

   
       useEffect(()=> {

        let isSubscribed = true;
  
              async function getNewProgramations(){
                  const response = await api.get(eventPath);
                  setEvent(response.data);  
             }
            
             if(isSubscribed){
               
               getNewProgramations();
               //resetar todos os campos
               setName('');
               setPresenter('');
               setDescription('');
               setBeginDate('');
               setFinishDate('');
               setStartTime('');
               setEndTime('');
               setWorkload(0);
               setBeginRegistration('');
               setFinishRegistration('');
            }

            return () => isSubscribed = false;
            
       }, [eventPath]);


    const hadleNewProgramation = (state) =>{
          setNewProgramation(state);
      }
  

    const postNewProgramation = async () =>{

          if(name !== '' && presenter !== '' && description !== '' && beginDate !== '' &&
             finishDate !== '' && startTime !=='' && endTime !== '' && workload !== 0 &&
             beginRegistration !== '' && finishRegistration !== ''){
                 
                  const programations = {
                     name: name,
                     presenter: presenter,
                     description: description,
                     beginDate: beginDate,
                     finishDate: finishDate,
                     startTime: startTime,
                     endTime: endTime,
                     workload: workload,
                     beginRegistration: beginRegistration,
                     finishRegistration: finishRegistration,
                     event: event,
                  };

                 const response = await api.post(`programations`, programations);
                 event.programations = [response.data, ...event.programations];
                //toda e qualquer alteração, esconder o modal e ativar o toast
                hadleNewProgramation(false);
                setShow(true);
              
            }else{
                console.warn('campos em branco!');
             }
      }

    return (
     
        <Container className="container-fluid"> 
    
          <Row>
          <Col xs={4} sm={4} md={8} xl={8} >
                <Button style={{marginBottom: "10px"}} variant="primary" onClick={hadleNewProgramation}> Adicionar </Button>  
          </Col>

          <Col xs={8} sm={8} md={4} xl={4}>
           <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
              <Toast.Header>
               <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt=""/>
               <strong className="mr-auto">Programação</strong>
               <small>Adicionada em {`${now.getHours()}h${now.getMinutes()}m`}</small>
             </Toast.Header>
          <Toast.Body> Programação adicionada com sucesso!</Toast.Body>
        </Toast>
                </Col>
          </Row>

         <Row>
      
            <Modal show={newProgramation} onHide={() => hadleNewProgramation(false)}>
             <Modal.Title> Nova programação para o evento </Modal.Title>
                  <Modal.Header> preencha os dados da programação</Modal.Header>
              <Modal.Body>
                 <Form>
                      <Form.Group controlId="nameProgramation">
                        <Form.Label>Nome da Programação</Form.Label>
                          <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required autoFocus/>
                      </Form.Group>

                      <Form.Group controlId="presenterProgramation">
                        <Form.Label>Nome do Facilitador</Form.Label>
                          <Form.Control type="text" value={presenter} onChange={(e) => setPresenter(e.target.value)} required autoFocus/>
                      </Form.Group>

                      <Form.Group controlId="descriptionProgramation">
                        <Form.Label>Descrição</Form.Label>
                          <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} required autoFocus/>
                      </Form.Group>

                      <Form.Group controlId="beginDateProgramation">
                        <Form.Label>Data Início</Form.Label>
                          <Form.Control type="text" value={beginDate} onChange={(e) => setBeginDate(e.target.value)} required autoFocus/>
                      </Form.Group>

                      <Form.Group controlId="finishDateProgramation">
                        <Form.Label>Data Fim</Form.Label>
                          <Form.Control type="text" value={finishDate} onChange={(e) => setFinishDate(e.target.value)} required autoFocus/>
                      </Form.Group>

                      <Form.Group controlId="startTimeProgramation">
                        <Form.Label>Horário início</Form.Label>
                          <Form.Control type="text" value={startTime} onChange={(e) => setStartTime(e.target.value)} required autoFocus/>
                      </Form.Group>

                      <Form.Group controlId="endTimeProgramation">
                        <Form.Label>Horário fim</Form.Label>
                          <Form.Control type="text" value={endTime} onChange={(e) => setEndTime(e.target.value)} required autoFocus/>
                      </Form.Group>

                      <Form.Group controlId="worloadProgramation">
                        <Form.Label>Carga horária</Form.Label>
                          <Form.Control type="text" value={workload} onChange={(e) => setWorkload(e.target.value)} required autoFocus/>
                      </Form.Group>

                      <Form.Group controlId="beginRegistrationProgramation">
                        <Form.Label>Início cadastro</Form.Label>
                          <Form.Control type="text" value={beginRegistration} onChange={(e) => setBeginRegistration(e.target.value)} required autoFocus/>
                      </Form.Group>

                      <Form.Group controlId="finishRegistrationProgramation">
                        <Form.Label>Fim cadastro</Form.Label>
                          <Form.Control type="text" value={finishRegistration} onChange={(e) => setFinishRegistration(e.target.value)} required autoFocus/>
                      </Form.Group>
                 </Form>
              </Modal.Body>
              
              <Modal.Footer>
                 <Button variant="danger" onClick={() => hadleNewProgramation(false)}> Cancelar </Button>
                 <Button variant="success" onClick={postNewProgramation}>  Criar programação </Button>
              </Modal.Footer>
            </Modal>
       
      </Row>

      <Row>
         {event.programations && event.programations.map((p) => 
             <Col key={p.id} md={4}>
                 <Card style={{ width: '360px', marginBottom:"15px"}}>
                     <Card.Body>
                        <Card.Title>{p.name}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{p.presenter}</Card.Subtitle>
                               <Card.Text> {p.description} </Card.Text>
                               <Card.Text> Data de inicio: {p.beginDate} </Card.Text>
                               <Card.Text> Data de fim: {p.finishDate} </Card.Text>
                               <Card.Text> Horário início: {p.startTime} </Card.Text>
                               <Card.Text> Horário fim: {p.endTime} </Card.Text>
                               <Card.Text> Carga horária: {p.workload} </Card.Text>
                               <Card.Text> Periodo de cadastro: {p.beginRegistration} até { p.finishRegistration} </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                          <Button variant="danger"> Deletar </Button>
                    </Card.Footer>
                 </Card>
             </Col>
          ) } 
        </Row>
    
        </Container>           
  );

}
