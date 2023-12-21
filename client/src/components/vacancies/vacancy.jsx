import { useState, useEffect, useContext } from "react"
import { getVacancy } from "../../http/vacancyAPI"
import { useParams, useNavigate } from 'react-router-dom';
import { observer } from "mobx-react-lite"
import './vacancy.scss'
import { Context } from "../../index";
import { SIGNIN_ROUTE } from "../../utils/consts"
const Vacancy = observer(() => {
    const { user } = useContext(Context)
    const [vacancy, setVacancy] = useState([])
    const [telephone, setTelephone] = useState(false)
    const param = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        if (!user.isAuth) {
            navigate(SIGNIN_ROUTE)
        }
        getVacancy(param.id).then(({ data }) => {
            setVacancy(data)
        })
    }, [param])
    return (

        <div className="vacancy" >
            {
                vacancy.length ?
                    <>
                        <div className="vacancy__header">
                            <div className="header__info">
                                <div className="header__title">{vacancy[0].vacancy.title}</div>
                                <hr />
                                <div className="header__telephone">{!telephone ? <button onClick={() => setTelephone(true)}>Номер для связи</button> : 'Номер для связи: ' + vacancy[0].user.telephone}</div>

                            </div>
                            <div className="header__salary">{!vacancy[0].vacancy.salary_max ? `от ${vacancy[0].vacancy.salary_min} руб.` : `от ${vacancy[0].vacancy.salary_min} до ${vacancy[0].vacancy.salary_max} руб.`}</div>
                        </div>
                        <hr />
                        <div className="vacancy__body">
                            {vacancy[0].vacancy.description}
                        </div>
                    </>
                    : <h1>Данной вакансии не существует</h1>
            }
        </div >

    )
})

export default Vacancy