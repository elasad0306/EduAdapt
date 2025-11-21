import '../App.css'
import Navbar from '../Components/Navbar' 
function Chat(){
    return(
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center text-black">
                <h1 className="text-3xl font-bold">Bienvenue dans le chat EduAdapt !</h1>
            </div>
        </>
    )
}
export default Chat