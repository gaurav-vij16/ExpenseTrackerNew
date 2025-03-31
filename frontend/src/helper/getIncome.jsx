export const fetchIncome = async () => {
    try {
        const token = localStorage.getItem("token"); // Get token from localStorage

        const res = await fetch('http://localhost:5000/api/v1/get-income', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`, // Send token in the request
            },
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        return await res.json(); // Return the fetched data
    } catch (error) {
        console.error('Error fetching income:', error);
        return [];
    }
};
