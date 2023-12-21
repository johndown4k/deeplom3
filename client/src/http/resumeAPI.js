import { $authHost, $host } from "./index";

export const createResume = async (resume) => {
    const {data} = $authHost.post(
        'api/resume/create', 
        resume
        )
    return data
}

export const getResume = async (id) => {
    const data = $host.get('api/resume/find/' + id)
    return data
}

export const getAllResume = async () => {
    const data = $host.get('api/resume/findAll')
    return data
}