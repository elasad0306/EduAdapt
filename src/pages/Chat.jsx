import '../App.css'
import LogoWhite from '../assets/picture/logoEduAdaptWhiteVersion.png'
import Bell from '../assets/picture/bell.png'
import Profile from '../assets/picture/profile.jpg'

function Navbar() {
    return (
        <nav className="flex justify-between items-center bg-gray-800 p-2">
            <a href="/Chat">
                <img
                    src={LogoWhite}
                    alt="Logo"
                    className="h-15 cursor-pointer transition-transform duration-200 hover:scale-110"
                />
            </a>
            <div className="flex space-x-6">
            <img
                src={Bell}
                alt="Bouton 1"
                className="h-10 cursor-pointer transition-transform duration-200 hover:scale-110"
            />
            <img
                src={Profile}
                alt="Bouton 2"
                className="h-10 cursor-pointer transition-transform duration-200 hover:scale-110"
            />
            </div>
        </nav>
    );
}

export default Navbar;
