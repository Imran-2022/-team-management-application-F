import React, { useState } from 'react';
import {  Link, useParams } from 'react-router-dom';
import { useResetPasswordMutation } from '../../features/auth/authApi';
import PasswordResetFail from './PasswordResetFail';
import PasswordResetSuccess from './PasswordResetSuccess';

const PasswordResetLandingPage = () => {
    const {npassword}=useParams()
    const [inputs,setInputs]=useState({
        new_password:"",
        comfirm_password:"",
    });
    const [resetPassword, { data, isLoading, error: responseError, isSuccess }] = useResetPasswordMutation();
    const handleChange=(e)=>{
        // setInputs()
        // e.target.propertyname(name) -> e.target.value.
        setInputs((preValue)=>({...preValue,[e.target.name]:e.target.value}))
    }

    const {new_password,comfirm_password}=inputs;

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (new_password ===comfirm_password ) {
            resetPassword({
                new_password,npassword
            });
        }
    };
    if(data) return <PasswordResetSuccess/>
    if(responseError) return <PasswordResetFail/>
    return (
        <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-200 text-gray-700">
            <form className="flex flex-col bg-white rounded shadow-lg p-12 my-12 " action=""onSubmit={handleSubmit}>
                <label className="font-semibold text-xs" htmlFor="usernameField">New Password</label>

                <input className="flex items-center h-12 px-4 w-64 border shadow mt-2 rounded focus:outline-none focus:ring-2" type="password" name="new_password" value={inputs.new_password} onChange={handleChange} required />

                <label className="font-semibold text-xs mt-3" htmlFor="passwordField">Comfirm password</label>

                <input className="flex items-center h-12 px-4 w-64 border shadow mt-2 rounded focus:outline-none focus:ring-2" type="password" name="comfirm_password" value={inputs.comfirm_password} onChange={handleChange} required/>

                <button className="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700" disabled={!new_password ||!comfirm_password}>reset password</button>
            </form>
        </div>
    );
};


export default PasswordResetLandingPage;