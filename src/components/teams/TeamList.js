import React, { useState } from 'react';
import {useGetTeamsQuery } from '../../features/team/teamApi';
import Layout from '../../Layout';
import Modal from './AddTeamModal';
import Team from './Team';

const TeamList = () => {
    
    const {data:teams,isSussess,isLoading,isError,error}=useGetTeamsQuery();

    const [openModal, setOpenModal] = useState(false);
    const controlModal = () => {
        setOpenModal((prevState) => !prevState);
    };

 // decide what to render
 let content = null;

 if (isLoading) {
     content = <p>Loading ...</p>
 }

 if (!isLoading && isError) {
     content = <p>There was an error</p>
 }

 if (!isLoading && !isError && teams?.length === 0) {
     content = <p>No books found!</p>
 }

 if (!isLoading && !isError && teams?.length > 0) {
     content = teams.map((dt) => <Team key={dt._id} dt={dt} />);
 }

    return (
        <Layout title="Team List" className="bg-[#f5f7f9] h-[89.9vh]">
            <div className='w-10/12 m-auto flex py-2 justify-between pb-6'>
                <p className='underline underline-offset-4'>Teams </p>

                <button className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded bg-cyan-300 hover:bg-indigo-500 hover:text-indigo-100" onClick={controlModal}>
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        ></path>
                    </svg>
                </button>
                <Modal open={openModal} control={controlModal} />
            </div>
            {/*  teams */}
            <div className='w-10/12 m-auto'>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4  mt-4 gap-6">
                   {content}
                </div>
            </div>
        </Layout>
    );
};

export default TeamList;