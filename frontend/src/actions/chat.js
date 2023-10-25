import axios from 'axios'

export const createSession = () => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${localStorage.getItem('access')}`,
            Accept: 'application/json'
        }
    }

    return axios.post(`${process.env.REACT_APP_API_URL}/app/create-session/`, JSON.stringify({}), config)
}

export const deleteSession = (session_id) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${localStorage.getItem('access')}`,
            Accept: 'application/json'
        }
    }

    return axios.post(
        `${process.env.REACT_APP_API_URL}/app/delete-session/`,
        JSON.stringify({
            session_id: session_id
        }),
        config
    )
}

export const AIQuery = (message, session_id) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${localStorage.getItem('access')}`,
            Accept: 'application/json'
        }
    }

    return axios.post(
        `${process.env.REACT_APP_API_URL}/app/ai-query/`,
        JSON.stringify({
            message: message,
            session_id: session_id
        }),
        config
    )
}

export const getSessionList = () => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${localStorage.getItem('access')}`,
            Accept: 'application/json'
        }
    }

    return axios.get(`${process.env.REACT_APP_API_URL}/app/get-sessions/`, config)
}

export const getMessageList = (session_id) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${localStorage.getItem('access')}`,
            Accept: 'application/json'
        }
    }

    return axios.get(`${process.env.REACT_APP_API_URL}/app/get-messages/?session_id=${session_id}`, config)
}
