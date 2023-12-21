import Admin from "../components/admin/admin"
import SignIn from "../components/auth/signin"
import SignUp from "../components/auth/signup"
import { About } from "../components/about/about"
import Profile from "../components/profile/profile"
import Workers from "../components/workers/workers"
import Vacancies from "../components/vacancies/vacancies"
import {
    SIGNIN_ROUTE,
    SIGNUP_ROUTE,
    ABOUT_ROUTE,
    ADMIN_ROUTE,
    PROFILE_ROUTE,
    WORKERS_ROUTE,
    VACANCIES_ROUTE,
    VACANCY_ROUTE,
} from "../utils/consts"
import Vacancy from "../components/vacancies/vacancy"





export const authRoutes = [
    {
        path: SIGNIN_ROUTE,
        Component: SignIn
    },
    {
        path: SIGNUP_ROUTE,
        Component: SignUp
    }
]

export const publicRoutes = [
    {
        path: ABOUT_ROUTE,
        Component: About
    },
    {
        path: PROFILE_ROUTE,
        Component: Profile
    },
    {
        path: WORKERS_ROUTE,
        Component: Workers
    },
    {
        path: VACANCIES_ROUTE,
        Component: Vacancies
    },
    {
        path: VACANCY_ROUTE,
        Component: Vacancy
    }
]

export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    }
]