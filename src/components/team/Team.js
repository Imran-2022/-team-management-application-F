import React from 'react';
import { useSelector } from 'react-redux';
import Layout from '../../Layout';

const Team = () => {
    const {user} = useSelector(state => state.auth);
    return (
        <Layout>
            {
               !user.isVerified? <div className='text-red-600 font-bold'>
                <p>not varified.</p>
                <p>you won't be able to make any changes until you verify your email.</p>
               </div>:<div className='text-yellow-400 font-bold'>verified</div>
            }
            <p>Hello from team page</p>
        </Layout>
    );
};

export default Team;