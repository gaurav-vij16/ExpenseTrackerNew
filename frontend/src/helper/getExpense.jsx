export const fetchExpense = async () => {
    try {
        const token = localStorage.getItem("token"); 

        const res = await fetch('http://localhost:5000/api/v1/get-expense', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`, 
            },
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        return await res.json(); // Return the fetched data
    } catch (error) {
        console.error('Error fetching expense:', error);
        return [];
    }
};
