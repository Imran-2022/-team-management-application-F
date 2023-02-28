import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useResetEmailMutation } from '../../features/auth/authApi';

const ForgotPassword = () => {
	const navigate = useNavigate();
	const [userEmail, setUserEmail] = useState('')

	const [resetEmail, { data, isLoading, error: responseError, isSuccess }] = useResetEmailMutation();

	const handleSubmit = (e) => {
		e.preventDefault()
		resetEmail(userEmail)
	}
	useEffect(() => {
		console.log("resetEmailData", data);
	}, [data])

	if (isSuccess) {
		setTimeout(() => {
			navigate('/login')
		}, 10000)
	}

	if (isLoading) return <div>Loading Brother please wait for  a second !</div>

	return isSuccess ? <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-200 text-gray-700">

		<div className="w-full sm:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
			<div className="px-8 mb-4 text-center">
				<h3 className="pt-4 mb-2 text-2xl">Success !</h3>
				<p className="mb-4 text-sm text-gray-700">
					Check your Email for a reset Link !
				</p>
			</div>
		</div>
	</div> : (

		<div className="flex flex-col items-center justify-center w-full h-screen bg-gray-200 text-gray-700">

			<div className="w-full sm:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
				<div className="px-8 mb-4 text-center">
					<h3 className="pt-4 mb-2 text-2xl">Forgot Your Password?</h3>
					<p className="mb-4 text-sm text-gray-700">
						We get it, stuff happens. Just enter your email address below and we'll send you a
						link to reset your password!
					</p>
				</div>
				<form className="px-8 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={handleSubmit}>
					{responseError !== "" && <p>{responseError}</p>}
					<div className="mb-4">
						<label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
							Email
						</label>
						<input
							required
							className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
							id="email"
							type="email"
							value={userEmail} onChange={e => setUserEmail(e.target.value)}
						/>
					</div>
					<div className="mb-6 text-center">
						<button
							className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
							disabled={!userEmail}
						>
							Reset Password
						</button>
					</div>
					<hr className="mb-6 border-t" />
					<div className="text-center">
						<Link to="/register"
							className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
							href="./register.html"
						>
							Create an Account!
						</Link>
					</div>
					<div className="text-center">
						<Link to="/login"
							className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
							href="./index.html"
						>
							Already have an account? Login!
						</Link>
					</div>
				</form>

			</div>
		</div>
	);
};


export default ForgotPassword;