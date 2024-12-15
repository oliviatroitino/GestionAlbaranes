export const apiRequest = async (url, method = 'GET', data) => {
    try {
        const token = localStorage.getItem('token')
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            return await response.json();
        } else {
            console.log(`Error: ${response.status} ${response.statusText}`);
            return null;
        }
    } catch (error) {
        console.error(`Error with ${method} request:`, error);
        return null;
    }
};