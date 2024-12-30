import React, { useState } from 'react';
import { Cross as Hamburger } from 'hamburger-react'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NavBar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(prevState => !prevState);
    };

    const menuItems = [
        { name: 'Home', Link: '/'},
        { name: 'Shop', Link: '/shop'},
        { name: 'About', Link: '/about'},
        { name: 'Contact', Link: '/contact'}
    ]
    
    return (
        <div className="nav font-poppins">
            <div className="flex justify-between items-center p-4 text-white bg-gray-800">
                {/* Logo */}
                <div className="text-xl font-bold">MyBrand</div>

                <div className='hidden lg:flex'>
                    <ul className="flex space-x-12">
                        { menuItems.map((item, index) => (
                            <li key={index}>
                                <Link to={item.Link} className="text-lg">{item.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Hamburger Menu Icon */}
                <div className=''>
                    <Hamburger rounded toggled={isMenuOpen} toggle={toggleMenu} size={24} duration={0.3}/>
                </div>
            </div>

            {/* Menu Content (Toggleable) */}
            <motion.div
                className={`menu-content ${isMenuOpen ? 'block' : 'hidden'} text-black bg-gray-200 p-4`}    
                initial={{ opacity: 0 }}
                animate={{ opacity: isMenuOpen ? 1 : 0, zIndex: isMenuOpen ? 1 : -1 }}
                transition={{ duration: 0.3 }}
            >
                <ul className="space-y-4">
                    { menuItems.map((item, index) => (
                        <li key={index}>
                            <Link to={item.Link} className="text-lg">{item.name}</Link>
                        </li>
                    ))}
                </ul>
            </motion.div>
        </div>
    );
}

export default NavBar;