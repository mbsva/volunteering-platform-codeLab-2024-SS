export const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    return !!token; // returns true if token exists, false otherwise
};

export const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
};