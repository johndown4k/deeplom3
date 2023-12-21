import { useState, useEffect, useContext } from "react"
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Context } from "../../index";
import { getResume } from "../../http/resumeAPI";
import CreateResumeModal from "../modals/resume-modal";
import './profile.scss'
const Profile = observer(() => {
    const { user } = useContext(Context)
    const [resume, setResume] = useState(false)
    const [resumeVisible, setResumeVisible] = useState(false)
    const param = useParams()
    useEffect(() => {
        getResume(param.id).then(({ data }) => {
            setResume(data[0])
        })
    }, [param])
    if (user.isAuth) {
        return (
            <>
                <div className="profile">
                    {
                        !resume ? <button className="profile__button" onClick={() => setResumeVisible(true)}>Создать резюме</button> :

                            <div className="resume">
                                <div className="resume__header">
                                    <div className="resume__info">
                                        {`${resume.user.first_name} ${resume.user.last_name}`}
                                        <p>{resume.user.telephone}</p>
                                    </div>
                                    <img src={process.env.REACT_APP_API_URL + resume.resume.image} width='250' height='250' alt="" />
                                </div>

                                <hr />
                                <div className="resume__title">
                                    <p className="resume__title__caption">Желаемая должность и зарплата</p>
                                    <p className="resume__title__title">{resume.resume.title}</p>
                                    <p className="resume__title__salary">{!resume.resume.salary_max ? `от ${resume.resume.salary_min} руб.` : `от ${resume.resume.salary_min} до ${resume.resume.salary_max} руб.`}</p>
                                </div>
                                <hr />
                                <div className="resume__about">
                                    <p className="resume__about__caption">О себе</p>
                                    <p className="resume__about__description">{resume.resume.description}</p>
                                </div>
                            </div>
                    }
                </div>
                <CreateResumeModal show={resumeVisible} onHide={() => setResumeVisible(false)} />
            </>
        )
    } else {
        return (
            <><h1>Резюме не найдено</h1></>
        )
    }

})


export default Profile