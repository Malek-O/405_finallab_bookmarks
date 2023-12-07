import { Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { useState, useEffect } from "react"
import axios from "axios"

const PersistLogin = () => {

    const [isLoading, setIsLoading] = useState(true)
    const { auth, setAuth } = useAuth()

    useEffect(() => {
        const verifySession = async () => {
            try {
                const response = await axios('http://localhost/finallab/api/session.php', {
                    withCredentials: true
                })
                if (response.data.username) {
                    setAuth(prev => ({ ...prev, username: response.data.username }))
                }
            } catch (error) {
                console.log(error);
            }
            finally {
                setIsLoading(false)
            }
        }
        !auth?.username ? verifySession() : setIsLoading(false)
    }, [])


    return (
        <>
            {isLoading ?
                <p>Loading....</p>
                : <Outlet />
            }
        </>
    )
}

export default PersistLogin