import React from 'react';
// import { useSelector } from 'react-redux';
import Layout from '../../Layout';

const TeamList = () => {
    // const {user} = useSelector(state => state.auth);
    return (
        <Layout title="Login Page" className="bg-[#f5f7f9] h-[89.9vh]">
            {/* {
               !user.isVerified? <div className='text-red-600 font-bold'>
                <p>not varified.</p>
                <p>you won't be able to make any changes until you verify your email.</p>
               </div>:<div className='text-yellow-400 font-bold'>verified</div>
            }
            <p>Hello from team page</p> */}
            <div className='w-10/12 m-auto'>
                <p className='py-2 underline underline-offset-4'>Teams </p>
            </div>
        </Layout>
    );
};

export default TeamList;