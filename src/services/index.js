import axios from "axios";

const endpoint = 'https://fake-server.onrender.com/tasks'

export async function updateTask(id, name) {
    try {
        const data = await axios.put(`${endpoint}/${id}`, {
            name: name,
            date_of_create: new Date().toLocaleDateString()
        })
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function getTasks() {
    try {
        const data = await axios.get(endpoint)
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function postTask(name) {
    try {

        const data = await axios.post(endpoint, {
            name: name,
            date_of_create: new Date().toLocaleDateString(),
            status: 'available'
        })
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function deleteTask(id, name) {
    try {
        const data = await axios.put(`${endpoint}/${id}`, {
            name: name,
            date_of_create: new Date().toLocaleDateString(),
            status: 'deleted',
        })
        return data
    } catch (error) {
        console.log(error)
    }
}