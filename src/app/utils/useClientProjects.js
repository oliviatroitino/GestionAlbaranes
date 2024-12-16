export async function useClientProjects(clientId) {
    try {
        const token = localStorage.getItem('token')
        const response = await fetch(`https://bildy-rpmaya.koyeb.app/api/project/${clientId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        
        if (!response.ok) {
            throw new Error('Failed to fetch client projects')
        }

        const data = await response.json()
        return data

    } catch (error) {
        console.error('Error fetching client projects:', error)
        return []
    }
}
