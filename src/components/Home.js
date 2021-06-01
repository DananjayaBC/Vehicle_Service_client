import React, { useState } from 'react'
import firebase from '../firebase';
import { useAuth } from "../contexts/AuthContext"
import Navb from './layout/Navbar'
import 'firebase/firestore';
import { Link, useHistory } from "react-router-dom"
import moment from 'moment'
import { Form, Button, Card, Container, Col } from "react-bootstrap"

function Home() {
    const { currentUser } = useAuth();
    const currentUserId = currentUser ? currentUser.uid : null;
    const authorId = currentUser ? currentUser.uid : null;
    const currentUserEmail = currentUser ? currentUser.email : null;
    const authorEmail = currentUser ? currentUser.email : null;
    const [title, setTitle] = useState("");
    const history = useHistory()


    const [content, setContent] = useState("");
    const [type, setType] = useState("");
    const [note, setNote] = useState("");
    const [mNumber, setmNumber] = useState("");




    const db = firebase.firestore();




    function addProjects() {
        db.collection('userData')
            .doc(currentUserId)
            .collection('Request')
            .add({
                title,
                content,
                currentUserEmail,
                note,
                mNumber,
                type,
                date: moment().format('YYYY-MM-DD – HH:mm A'),
            })
            .catch((err) => {
                console.error(err);
            });

        db.collection('projects')
            .add({
                title,
                content,
                type,
                note,
                mNumber,
                authorEmail,
                authorId,
                createdAt: new Date()
            })
            .then(res => (window.location.href = '/'))
            .catch((err) => {
                console.error(err);
            });
    }
    return (
        <>
            <Navb />

            <Container
                className="d-flex align-items-center justify-content-center"
            >
                <div className="w-100" style={{ maxWidth: "800px" }}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Register</h2>
                            <Form>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Vehicle Number</Form.Label>
                                        <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Enter Vehicle Number" />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridPassword">
                                        <Form.Label>Vehicle Type</Form.Label>
                                        <Form.Control value={type} onChange={(e) => setType(e.target.value)} as="select" placeholder="Password" >
                                            <option>Choose...</option>
                                            <option>Car</option>
                                            <option>Van</option>
                                            <option>Bus</option>
                                            <option>Bike</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Group controlId="formGridAddress2">
                                    <Form.Label>Vehicle Details</Form.Label>
                                    <Form.Control value={content} onChange={(e) => setContent(e.target.value)} type="text" placeholder="Enetr some Details" />
                                </Form.Group>

                                <Form.Group controlId="formGridAddress2">
                                    <Form.Label>Note</Form.Label>
                                    <Form.Control value={note} onChange={(e) => setNote(e.target.value)} type="text" placeholder="Enetr some Notes" />
                                </Form.Group>

                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridCity">
                                        <Form.Label>Mobile Number</Form.Label>
                                        <Form.Control value={mNumber} onChange={(e) => setmNumber(e.target.value)} type="text" />
                                    </Form.Group>

                                </Form.Row>




                                <Button className="btn btn-primary btn-lg btn-block mb-5" onClick={() => addProjects()}>
                                    Request </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div></Container>
        </>

    )
}
export default Home;