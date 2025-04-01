const api_url = import.meta.env.VITE_API_URL;

export const fetchIncome = async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No authentication token found. Please log in.");

        const response = await fetch(`${api_url}/api/v1/get-income`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Error ${response.status}: ${errorMessage}`);
        }

        const data = await response.json();
        return data || [];
    } catch (error) {
        console.error("Error fetching income:", error.message);
        return [];
    }
};
