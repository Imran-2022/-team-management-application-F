import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../features/auth/authApi';
import Layout from '../../Layout';
import Error from '../ui/Error';
const Login = () => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });


    const handleChange = (e) => {
        // setInputs()
        // e.target.propertyname(name) -> e.target.value.
        setInputs((preValue) => ({ ...preValue, [e.target.name]: e.target.value }))
    }


    const [error, setError] = useState("");

    const [login, { data, isLoading, error: responseError }] =
        useLoginMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if (responseError?.data) {
            setError(responseError.data);
        }
        if (data?.token && data?.user) {
            navigate("/teams");
        }
    }, [data, responseError, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = inputs;
        setError("");

        login({
            email,
            password,
        });
    };


    return (
        <Layout title="Login Page" className="bg-[#f5f7f9] h-[89.9vh]">
            <div className="flex flex-col items-center justify-center w-full h-full py-12  text-gray-700">
                <form className="flex flex-col bg-white rounded shadow-lg p-12 my-10" action="" onSubmit={handleSubmit}>
                    <label className="font-semibold text-xs" htmlFor="usernameField">User Email</label>

                    <input className="flex items-center h-12 px-4 w-64 border shadow mt-2 rounded focus:outline-none focus:ring-2" type="email" name="email" value={inputs.email} onChange={handleChange} required />

                    <label className="font-semibold text-xs mt-3" htmlFor="passwordField">Password</label>

                    <input className="flex items-center h-12 px-4 w-64 border shadow mt-2 rounded focus:outline-none focus:ring-2" type="password" name="password" value={inputs.password} onChange={handleChange} required />

                    <button disabled={isLoading} className="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700">Login</button>
                    <div className="flex mt-6 justify-center text-xs">
                        <Link to="/forget-password" className="text-blue-400 hover:text-blue-500" href="#">Forgot Password</Link>
                        <span className="mx-2 text-gray-300">/</span>
                        <Link to="/register" className="text-blue-400 hover:text-blue-500" href="#">Register</Link>
                    </div>
                    {error !== "" && <p>{error}</p>}
                </form>
            </div>
        </Layout>
    );
};

export default Login;