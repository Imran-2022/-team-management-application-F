import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useVerifyEmailMutation } from '../../features/auth/authApi';
import Loading from '../ui/Loading';
import EmailVerificationFail from './EmailVerificationFail';
import { EmailVerificationSuccess } from './EmailVerificationSuccess';

export const EmailVerificationLandingPage = () => {
    const { verificationString } = useParams()
    const [isLoading, setIsloading] = useState(true)
    const [isSuccess, setIsSuccess] = useState(false)
    const [verifyEmail, { data }] = useVerifyEmailMutation();

    useEffect(() => {
        const loadVarification = async () => {
            try {
                verifyEmail({ verificationString })
                if(data?.user?.isVerified){
                    setIsSuccess(true)
                    setIsloading(false)
                }
            }catch(e){
                setIsSuccess(false)
                setIsloading(false)
            }
        }
        loadVarification()
    }, [verificationString, verifyEmail,data?.user?.isVerified])

    if (isLoading) return <Loading/>
    if (!isSuccess) return <EmailVerificationFail />
    return <EmailVerificationSuccess />
};
