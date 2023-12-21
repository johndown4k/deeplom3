import { useContext, useEffect, useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { Context } from "../../index"
import { observer } from "mobx-react-lite"
import './vacancies.scss'
import { getAllVacancy } from '../../http/vacancyAPI'
import { Link } from 'react-router-dom'
import { VACANCY_ROUTE } from '../../utils/consts'


const Vacancies = observer(() => {
    const { user } = useContext(Context)
    const [vacancies, setVacancies] = useState([])
    useEffect(() => {
        getAllVacancy().then(({ data }) => {
            setVacancies(data)
        })
    }, [])
    return (
        <div className="vacancies">
            {
                vacancies.length ?
                vacancies.map(vacancy => 
                    <Card key={vacancy.id} style={{ width: '18rem' }}>
                        <Card.Img variant="top" />
                        <Card.Body>
                            <Card.Title>{vacancy.title}</Card.Title>
                            <Card.Text>
                                <p>{!vacancy.salary_max ? `от ${vacancy.salary_min} руб.` : `от ${vacancy.salary_min} до ${vacancy.salary_max} руб.`}</p>
                                {vacancy.description.slice(0, 100) + '...'}

                            </Card.Text>
                            <Link to={'/vacancy/' + vacancy.id} className='vacancies__button'>Узнать больше</Link>
                        </Card.Body>
                    </Card>
                )
                
                : null
            }

        </div>
    )
})

export default Vacancies