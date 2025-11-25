import LogoWhite from '../assets/picture/logoEduAdaptWhiteVersion.png';
import Profile from '../assets/picture/profile.jpg';

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
                <a href="/Profile">
                <img
                    src={Profile}
                    alt="Bouton 2"
                    className="h-10 cursor-pointer transition-transform duration-200 hover:scale-110"
                />
                </a>
            </div>
        </nav>
    );
}

export default Navbar;