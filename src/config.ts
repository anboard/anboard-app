const config = {
<<<<<<< HEAD
    API_BASE_URL: 'http://localhost:1984/api/anb-broadcaster',
    AUTH_BASE_URL: 'http://localhost:1984/auth',
    API_ADMIN_URL: 'http://localhost:1984/api/admin'
    //  API_BASE_URL: 'https://anboard-api.up.railway.app/api/anb-broadcaster',
    // AUTH_BASE_URL: 'https://anboard-api.up.railway.app/auth',
    // API_ADMIN_URL: 'https://anboard-api.up.railway.app/api/admin'
=======
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
    AUTH_BASE_URL: import.meta.env.VITE_AUTH_BASE_URL,
    API_ADMIN_URL: import.meta.env.VITE_API_ADMIN_URL,
>>>>>>> bff031086e9c230ba68589a0b10f67860586521a
}

export default config
