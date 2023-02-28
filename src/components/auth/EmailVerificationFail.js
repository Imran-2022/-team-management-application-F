import React from 'react';
export const EmailVerificationFail = () => {
	return (
		<div className="flex flex-col items-center justify-center w-full h-screen bg-gray-200 text-gray-700">

			<div className="w-full sm:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
				<div className="px-8 mb-4 text-center">
					<h3 className="pt-4 mb-2 text-2xl">Uh oh... !</h3>
					<p className="mb-4 text-sm text-gray-700">
						!Something went wrong while trying to verify your email.
					</p>
				</div>
			</div>
		</div>
	)
}
export default EmailVerificationFail;