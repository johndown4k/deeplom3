import { useState, useContext, useEffect } from 'react'
import './admin.scss'
import Table from 'react-bootstrap/Table';
import { getUsers } from '../../http/userAPI';
import { getAllResume } from '../../http/resumeAPI';
import { Link } from 'react-router-dom';


const Admin = () => {
    const [users, setUsers] = useState([])
    const [resumes, setResumes] = useState([])
    useEffect(() => {
        getUsers().then(({data}) => {
            setUsers(data)
        })
        getAllResume().then(({data}) => {
            setResumes(data)
        })
    }, [])
    return (
        <>
        <div>
            <h4>Список пользователей</h4>
            <Table striped bordered hover key={1}>
                
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Номер телефона</th>
                        <th>Имя</th>
                        <th>Фамилия</th>
                        <th>Статус</th>     
                    </tr>

                </thead>
                <tbody style={{height: '10%'}}>
                    {
                        users.length ? 
                        users.map(user => 
                            <tr key={user.id}>
                                <th>{user.id}</th>
                                <th>{user.telephone}</th>
                                <th>{user.first_name}</th>
                                <th>{user.last_name}</th>
                                <th>{user.is_employer ? 'Работодатель' : 'Специалист'}</th>
                            </tr> 
                        )
                        : null
                    }
                </tbody>
            </Table>
            <Table striped bordered hover>
                
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Желаемая должность</th>
                        <th>Ссылка на резюме пользователя</th>
                        <th>Статус</th>     
                    </tr>

                </thead>
                <tbody style={{height: '10%'}}>
                    {
                        resumes.length ? 
                        resumes.map(resume => 
                            <tr key={resume.id}>
                                <th>{resume.id}</th>
                                <th>{resume.title}</th>
                                <th><Link to={'/profile/' + resume.id}>Ссылка на резюме</Link></th>
                                <th>{resume.hit ? 'Активно ищет работу' : 'Рассматривает предложения'}</th>
                            </tr> 
                        )
                        : null
                    }
                </tbody>
            </Table>
        </div>
            
        </>

    )
}

export default Admin