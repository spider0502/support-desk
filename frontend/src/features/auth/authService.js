import axios from 'axios'

const API_URL = '/api/users/'

// Register
const register = async (userData) => {
    const res = await axios.post(API_URL, userData)
    console.log(res.data)
    if (res.data) {
        localStorage.setItem('user', JSON.stringify(res.data))
    }

    return res.data
}

// Login
const login = async (loginData) => {
    const res = await axios.post(`${API_URL}login`, loginData)
    console.log(res.data)
    if (res.data) {
        localStorage.setItem('user', JSON.stringify(res.data))
    }

    return res.data
}

// Logout user
const logout = () => localStorage.removeItem('user')

const authService = {
    register,
    logout,
    login,
}

export default authService