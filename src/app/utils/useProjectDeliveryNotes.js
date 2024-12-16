export async function useProjectDeliveryNotes(projectId) {
    try {
        const token = localStorage.getItem('token')
        const response = await fetch(`https://bildy-rpmaya.koyeb.app/api/deliverynote/project/${projectId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        if (!response.ok) {
            throw new Error('Failed to fetch delivery notes')
        }
        const data = await response.json()
        return data
    } catch (err) {
        console.error('Error fetching project delivery notes:', err)
        return []
    }
}
