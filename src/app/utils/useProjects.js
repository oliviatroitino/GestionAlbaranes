import { useState, useEffect } from 'react'

export default function useProjects() {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await fetch('https://bildy-rpmaya.koyeb.app/api/project', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                })
                const data = await response.json()
                setProjects(data)
            } catch (err) {
                console.log('Error with GET project request:', err)
            }
        }
        fetchProjects()
    }, [])

    return { projects }
}
