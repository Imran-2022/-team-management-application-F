import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const PleaseVerifyEmailPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            navigate('/teams')
        }, 7000)
    }, [navigate])

    return (
        <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-200 text-gray-700">

            <div className="w-full sm:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
                <div className="px-8 mb-4 text-center">
                    <h3 className="pt-4 mb-2 text-2xl">Thank's for Siging Up !</h3>
                    <p className="mb-4 text-sm text-gray-700">
                        A verification Email has been sent to the email address you provided !
                    </p>
                    <p className="mb-4 text-sm text-gray-700">
                        Please Verify your email to unlock Full site features.
                    </p>
                </div>
            </div>

        </div>
    )
}
export default PleaseVerifyEmailPage;