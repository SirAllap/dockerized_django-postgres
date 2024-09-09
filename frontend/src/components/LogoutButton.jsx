import { useNavigate } from 'react-router-dom'

export const LogoutButton = () => {
    const navigate = useNavigate()

    const handleLogOutCTA = () => {
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        return navigate('/login')
    }

    return (
        <button className='border border-red-300 bg-red-500 py-2 px-5 text-white rounded-md hover:bg-transparent hover:text-red-500 transition-all duration-300' onClick={handleLogOutCTA}>Log out</button>
    )
}
