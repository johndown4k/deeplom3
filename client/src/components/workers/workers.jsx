import { useEffect, useState } from "react"
import Table from 'react-bootstrap/Table';
import './workers.scss'
import { getAllResume } from "../../http/resumeAPI";
import { Link } from "react-router-dom";

const Workers = () => {
    const [resume, setResume] = useState([])
    useEffect(() => {
        getAllResume().then(({data}) => {
            setResume(data)
        })
    }, [])
    return (
        <div className="workers">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Желаемая должность</th>
                        <th>Зарплата от</th>
                        <th>Зарплата до</th>
                        <th>Заинтерисованность в поиске работы</th>
                        <th>Ссылка на резюме</th>
                    </tr>

                </thead>
                <tbody>
                    {
                        resume.length ? 
                        resume.map(item => 
                            <tr key={item.id}>
                                <th>{item.title}</th>
                                <th>{item.salary_min}</th>
                                <th>{item.salary_max ? item.salary_max : '-'}</th>
                                <th>{item.hit ? 'Активно ищет работу' : 'Рассматривает предложения'}</th>
                                <th><Link to={'/profile/' + item.id}>Резюме</Link></th>
                            </tr> 
                        )
                        : null
                    }
                </tbody>
            </Table>
        </div>

    )
}

export default Workers