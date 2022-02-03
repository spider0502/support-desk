import axios from 'axios'

const API_URL = '/api/tickets/'

// Add Note
const addNote = async ({ ticketId, text }, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }

    const res = await axios.post(API_URL + ticketId + '/notes', { text }, config)

    return res.data
}

// Get notes
const getNotes = async (ticketId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const res = await axios.get(API_URL + ticketId + '/notes', config)

    return res.data
}

const noteService = {
    getNotes,
    addNote,
}

export default noteService