const api_url = import.meta.env.VITE_API_URL; 

export const fetchExpense = async () => {
    try {
        const token = localStorage.getItem("token"); 
        const res = await fetch(`${api_url}/api/v1/get-expense`, {  
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`, 
            },
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();

        if (!Array.isArray(data) || data.length === 0) {
            console.warn("No expense data received from API.");
        }

        return data;
    } catch (error) {
        console.error('Error fetching expense:', error);
        return [];
    }
};
