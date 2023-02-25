import React, { useEffect, useState } from 'react';
import Layout from '../../Layout';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../../features/auth/authApi';
import Error from '../ui/Error';

const Register = () => {
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
        comfirm_password: ""
    });

    const handleChange = (e) => {
        // setInputs()
        // e.target.propertyname(name) -> e.target.value.
        setInputs((preValue) => ({ ...preValue, [e.target.name]: e.target.value }))
    }


    const [agreed, setAgreed] = useState(false);
    const [error, setError] = useState("");

    const [register, { data, isLoading, error: responseError }] = useRegisterMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if (responseError?.data) {
            setError(responseError.data);
        }
        if (data?.token && data?.user) {
            navigate("/");
        }
    }, [data, responseError, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (inputs.comfirm_password !== inputs.password) {
            setError("Passwords do not match");
        } else {
            const { name, email, password } = inputs;
            register({
                name,
                email,
                password,
            });
        }
    };
    return (
        <Layout title="registration Page" className="bg-[#f5f7f9] ">
            <div className="flex flex-col items-center justify-center w-full py-6  text-gray-700">

                <form className="flex flex-col bg-white rounded shadow-lg p-12 my-12" action="" onSubmit={handleSubmit}>

                    <label className="font-semibold text-xs" htmlFor="usernameField">User name</label>
                    <input className="flex items-center h-12 px-4 w-64 border shadow mt-2 rounded focus:outline-none focus:ring-2" type="text" name="name" value={inputs.name} onChange={handleChange} required />

                    <label className="font-semibold text-xs mt-3" htmlFor="useremailField">User Email</label>
                    <input className="flex items-center h-12 px-4 w-64 border shadowmt-2 rounded focus:outline-none focus:ring-2" type="email" name="email" value={inputs.email} onChange={handleChange} required />

                    <label className="font-semibold text-xs mt-3" htmlFor="passwordField">Password</label>
                    <input className="flex items-center h-12 px-4 w-64 border shadow mt-2 rounded focus:outline-none focus:ring-2" type="password" name="password" value={inputs.password} onChange={handleChange} required />

                    <label className="font-semibold text-xs mt-3" htmlFor="comfirm_passwordField">ComFirm Password</label>
                    <input className="flex items-center h-12 px-4 w-64 border shadow mt-2 rounded focus:outline-none focus:ring-2" type="password" name="comfirm_password" value={inputs.comfirm_password} onChange={handleChange} required />

                    <button disabled={isLoading} className="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700">Register</button>

                    <div className="flex mt-6 justify-center text-xs">
                        <p>Already Have an account ? </p>
                        <span className="mx-2 text-gray-300">/</span>
                        <Link to="/login" className="text-blue-400 hover:text-blue-500" href="#">Login</Link>
                    </div>
                    {error !== "" && <p>{error}</p>}
                </form>
            </div>
        </Layout>
    );
};

export default Register;