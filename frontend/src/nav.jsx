import { useNavigate } from "react-router";


function Nav(){
    const navigate = useNavigate()

    function logout(){
        localStorage.removeItem('authTokens')
        navigate('/auth/login/')
    }

    function profile(){
        navigate('/profile/')
    }
    return(
        <>
        <nav className="p-6 flex items-center justify-center w-11/12 border-solid mx-auto border-b-2  border-white-700">
            <h2 className="text-violet-300 ml-4 inline font-bold"> Esi Blog </h2>
            <div className="flex items-center ml-auto mr-4 justfiy-center">
                <h6 className="cursor-pointer hover:underline font-bold" onClick={profile}> Profile </h6>
                <h6 className="cursor-pointer ml-8 hover:underline font-bold" onClick={logout}> Sign Out </h6>
            </div>
        </nav>
        </>
    )
}

export default Nav