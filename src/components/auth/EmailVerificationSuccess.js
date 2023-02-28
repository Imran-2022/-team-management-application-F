import React from 'react';
import { Link } from 'react-router-dom';
export const EmailVerificationSuccess=()=>{
    return (
        <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-200 text-gray-700">

		<div className="w-full sm:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
			<div className="px-8 mb-4 text-center">
				<h3 className="pt-4 mb-2 text-2xl">success !</h3>
				<p className="mb-4 text-sm text-gray-700">
					Thanks for verifying your email, now you can use all the app's features  !
				</p>
				<div className="flex flex-col items-center justify-center w-full">
                <button className="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700"><Link to="/teams">Go back To Team Page</Link></button>
                </div>
			</div>
		</div>

	</div>
    )
}