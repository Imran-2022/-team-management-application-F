import React, { useState } from 'react';
import { useGetTeamsQuery } from '../../features/team/teamApi';
import Layout from '../../Layout';
import Modal from './AddTeamModal';
import Team from './Team';
import { useSelector } from 'react-redux';

const TeamList = () => {

    const { data: teams, isSussess, isLoading, isError, error } = useGetTeamsQuery();
    const { user: loggedUser } = useSelector(state => state.auth);

    const [openModal, setOpenModal] = useState(false);
    const controlModal = () => {
        setOpenModal((prevState) => !prevState);
    };

    const dtFilter = (dt) => {
        if(dt.teamMembers.includes(loggedUser.email)){
          return true;
        }
        return false;
    }

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
        content = teams
            .filter(dtFilter)
            .map((dt) => <Team addM={dt?.teamMembers?.[0]==(loggedUser?.email)} key={dt._id} dt={dt} />);
    }

    return (
        <Layout title="Team List" className="bg-[#f5f7f9] h-[89.9vh]">
            <div className='w-10/12 m-auto flex py-2 justify-between pb-6'>
                <p className='underline underline-offset-4'>Teams </p>
                {
                    (loggedUser?.isVerified) ? <>
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
                    </> : <>
                        <p className="flex items-center justify-center px-2 rounded bg-cyan-100 hover:bg-cyan-200 text-red-600 font-bold">Not isVerified</p>
                    </>
                }

            </div>
            {/*  teams */}
            <div className='w-10/12 m-auto'>
                {
                    !loggedUser.isVerified && <div>
                        <p className=''>Please check your login email and verify for access this page !</p>
                    </div>
                }
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4  mt-4 gap-6">
                    {content}
                </div>
            </div>
        </Layout>
    );
};

export default TeamList;