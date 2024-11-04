import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-blue-900 py-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">

                {/* Logo a la izquierda */}
                <div className="flex items-center">
                    <img
                        src="../resources/favicon2.webp"
                        alt="Travel Advisors Logo"
                        className="w-16 h-16 rounded-full"
                    />
                    <h1 className="text-2xl font-bold text-white ml-4">MyTinerary</h1>
                </div>

                {/* Menú en pantallas grandes */}
                <ul className="hidden md:flex space-x-6">
                    <li><Link to="/" className="text-white hover:text-red-500">Home</Link></li>
                    <li><Link to="/cities" className="text-white hover:text-red-500">Cities</Link></li>
                </ul>

                {/* Menú hamburguesa en pantallas pequeñas */}
                <div className="md:hidden flex items-center">
                    <button onClick={toggleMenu} className="text-white focus:outline-none">
                        <AiOutlineMenu className="w-6 h-6" />
                    </button>
                </div>

                {/* Avatar */}
                <FaUserCircle className="text-white w-10 h-10 ml-4" />
            </div>

            {/* Menú desplegable en mobile */}
            {isOpen && (
                <ul className="md:hidden bg-blue-900 p-4 space-y-4 text-center">
                    <li><Link to="/" className="block text-white hover:text-red-500">Home</Link></li>
                    <li><Link to="/cities" className="block text-white hover:text-red-500">Cities</Link></li>
                </ul>
            )}
        </nav>
    );
};

export default Navbar;
