import React, { useContext, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { createVacancy } from '../../http/vacancyAPI';
import { Context } from '../../index';
import { observer } from 'mobx-react-lite';


const CreateVacancyModal = observer(({ show, onHide }) => {
    const {user} = useContext(Context)
    const [file, setFile] = useState('')
    const [message, setMessage] = useState('')
    const [vacancyForm, setVacancyForm] = useState({
        title: '',
        description: '',
        salary_min: '',
        salary_max: '',
    })
    const Submit = () => {
        const formData = new FormData()
        formData.append('image', file)
        formData.append('title', vacancyForm.title)
        formData.append('description', vacancyForm.description)
        formData.append('salary_min', vacancyForm.salary_min)
        formData.append('salary_max', vacancyForm.salary_max)
        formData.append('userId', user.userId)
        createVacancy(formData).then(({data}) => {
            if (data.message){
                setMessage(data.message)
            }else{
                onHide()
            }
        })
    }

    const selectFile = (e) => {
        setFile(e.target.files[0])
    }


    const changeHandler = (event) => {
        setVacancyForm({ ...vacancyForm, [event.target.name]: event.target.value })
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Создание вакансии
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>

                    <Form.Group className='mb-3'>
                        <Form.Label className='h5'>Изображение на вакансию</Form.Label>
                        <Form.Control

                            onChange={selectFile}
                            type="file"
                            name='image'

                        />
                    </Form.Group>
                    <hr />
                    <Form.Control
                        name='title'
                        onChange={changeHandler}
                        className="mt-3"
                        placeholder="Вакансия"
                    />
                    <Form.Control
                        name='description'
                        onChange={changeHandler}
                        className="mt-3"
                        placeholder="О вакансии"
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
                </Form>
            </Modal.Body>
            <Modal.Footer>
                { message.length ? message : null }
   
                <Button variant="outline-success" onClick={() => Submit()}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
})

export default CreateVacancyModal;