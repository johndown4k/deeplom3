import { $authHost, $host } from "./index";

export const createVacancy = async (vacancy) => {
    const data = $authHost.post(
        'api/vacancy/create', 
        vacancy
        )
    return data
}

export const getVacancy = async (id) => {
    console.log(id)
    const data = $host.get(
        'api/vacancy/find/' + id
    )
    return data
}

export const getAllVacancy = async () => {
    const data = $host.get(
        'api/vacancy/findAll'
    )
    return data
}