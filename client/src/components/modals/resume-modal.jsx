import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { createResume } from '../../http/resumeAPI';
import { Context } from '../..';

const CreateResumeModal = observer(({ show, onHide }) => {
    const {user} = useContext(Context)
    const [file, setFile] = useState(null)
    const [hit, setHit] = useState(false)

    const [productForm, setProductForm] = useState({
        title: '',
        description: '',
        salary_min: '',
        salary_max: '',
    })

    const Submit = () => {
        const formData = new FormData()
        formData.append('image', file)
        formData.append('title', productForm.title)
        formData.append('description', productForm.description)
        formData.append('salary_min', productForm.salary_min)
        formData.append('salary_max', productForm.salary_max)
        formData.append('hit', hit)
        formData.append('userId', user.userId)
        createResume(formData).then((data) => {
            onHide()
        })
    }

    const selectFile = (e) => {
        setFile(e.target.files[0])
    }

    const changeHandler = (event) => {
        setProductForm({ ...productForm, [event.target.name]: event.target.value })
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Создание резюме
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>

                    <Form.Group className='mb-3'>
                        <Form.Label className='h5'>Ваше фото</Form.Label>
                        <Form.Control

                            onChange={selectFile}
                            type="file"
                            name='image'

                        />
                    </Form.Group>
                    <hr/>
                    <Form.Control
                        name='title'
                        onChange={changeHandler}
                        className="mt-3"
                        placeholder="Желаемая должность"
                    />
                    <Form.Control
                        name='description'
                        onChange={changeHandler}
                        className="mt-3"
                        placeholder="О вас"
                        as="textarea"
                    />
                    <Form.Control
                        name='salary_min'
                        onChange={changeHandler}
                        className="mt-3"
                        placeholder="Зарплата от"
                        type="number"
                   
                    />
                    <Form.Control
                        name='salary_max'
                        onChange={changeHandler}
                        className="mt-3"
                        placeholder="Зарплата до"
                        type="number"
                    />
                  <hr/>
                    <Form.Check
                        inline
                        label="Активно ищу работу"
                        name="hit"
                        onChange={(event) => setHit(event.target.checked)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={() => Submit()}>Создать</Button>
            </Modal.Footer>
        </Modal>
    )
})

export default CreateResumeModal;