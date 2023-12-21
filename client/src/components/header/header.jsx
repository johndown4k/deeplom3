import './header.scss'
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../index';
import { Link } from 'react-router-dom';
import { ABOUT_ROUTE, SIGNIN_ROUTE, VACANCIES_ROUTE, WORKERS_ROUTE } from '../../utils/consts';
import { observer } from 'mobx-react-lite';
import CreateVacancyModal from '../modals/vacancy-modal';

const Header = observer(() => {
    const { user } = useContext(Context)
    const [vacancyVisible, setVacancyVisible] = useState(false)

    const logOut = () => {
        user.setUser([])
        user.setIsAuth(false)
        localStorage.setItem('token', '')
    }
    return (
        <>
            <header className='header'>
                <div className="header__top">
                    <div className="header__top__logo"><Link to={ABOUT_ROUTE}><span>Work </span>Up</Link></div>
                    <div className="header__top__tools">

                        {

                            !user.isAuth ?


                                <Link className="header__top__auth" to={SIGNIN_ROUTE}>Авторизация</Link>

                                : !user.isEmployer ?
                                    <React.Fragment>
                                        <Link className="header__top__auth" to={'/profile/' + user.userId}>Профиль</Link>
                                        <Link className="header__top__auth" to={SIGNIN_ROUTE} onClick={() => logOut()}>Выход</Link>
                                    </React.Fragment>
                                    :
                                    <React.Fragment>
                                        <button className="header__top__auth" onClick={() => setVacancyVisible(true)}>Создать вакансию</button>
                                        <Link className="header__top__auth" to={SIGNIN_ROUTE} onClick={() => logOut()}>Выход</Link>
                                    </React.Fragment>

                        }
                    </div>
                </div>
                <div className="header__middle">
                    <ul>
                        <Link to={ABOUT_ROUTE}>О нас</Link>
                        <Link to={VACANCIES_ROUTE}>Вакансии</Link>
                        {user.isEmployer ? <Link to={WORKERS_ROUTE}>Специалисты</Link> : null}
                </ul>
            </div>
        </header >
            <CreateVacancyModal show={vacancyVisible} onHide={() => setVacancyVisible(false)} />
        </>
    )
})

export default Header