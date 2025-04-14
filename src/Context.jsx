import { createContext, useContext, useEffect } from 'react'
import useFetch from './hooks/Use-Fetch';
import { getCurrentUser } from './db/apiAuth';

const URLcontext = createContext();

const URLprovider = ({ children }) => {
    const { data: user, loading, fn: fetchUser } = useFetch(getCurrentUser)

    const isAuthenticated = user?.role === "authenticated";     // This will check if user is logged in(return boolean)

    useEffect(() => {
        fetchUser();        // This will make sure whenever our app loads for the very first time, this auth check will run on every single page every single time
    }, [])

    return <URLcontext.Provider value={{ user, fetchUser, loading, isAuthenticated }}>{children}</URLcontext.Provider>
}

export const URLstate = () => {
    return useContext(URLcontext);
}

export default URLprovider