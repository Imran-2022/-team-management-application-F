import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { userLoggedOut } from './features/auth/authSlice';
import useAuth from './hooks/useAuth';

const MenuBar = () => {
    const [menuShow, setMenuShow] = useState(false)
    const handleMenuShow = () => {
        setMenuShow(!menuShow)
    }

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogOut = () => {
        dispatch(userLoggedOut());
        localStorage.removeItem('auth');
        navigate("/login");
    }

    return (
        <div>
            <nav className="bg-white border-gray-200 lg:mx-60 sm:px-4 py-2.5 rounded dark:bg-gray-900">
                <div className="container flex flex-wrap items-center justify-between mx-auto">
                    <Link to='/' className="flex items-center">
                        {/* you can add logo  */}
                        <img width="30px" src="teamicon.png" alt="" />
                        {/* <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Team-manager</span> */}
                    </Link>

                    <div className="flex  md:hidden  items-center md:order-2">
                        <button onClick={handleMenuShow} data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>
                    <div className={menuShow ? "items-center justify-between w-full md:flex md:w-auto md:order-1" : "items-center justify-between hidden w-full md:flex md:w-auto md:order-1"} id="mobile-menu-2">
                        <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <NavLink to={`/`} className="block py-2 pl-3 pr-4 text-gray-700 rounded md:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white" aria-current="page">Home</NavLink>
                            </li>

                            <li>
                                <NavLink to={`/about`} className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</NavLink>
                            </li>
                            {
                                !useAuth() &&
                                <li>
                                    <NavLink to={`/login`} className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Login</NavLink>
                                </li>

                            }

                            {
                                useAuth() && <li>
                                    <span className="cursor-pointer block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" onClick={handleLogOut}>LogOut</span>
                                </li>
                            }

                        </ul>
                    </div>
                </div>
            </nav>

        </div>
    );
};

export default MenuBar;