import { useState, useEffect } from 'react'

export default function useClients() {
    const [clients, setClients] = useState([])

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await fetch('https://bildy-rpmaya.koyeb.app/api/client', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                })
                const data = await response.json()
                setClients(data)
            } catch (err) {
                console.log('Error with GET client request:', err)
            }
        }
        fetchClients()
    }, [])

    return clients
}