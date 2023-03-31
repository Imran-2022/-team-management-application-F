import React from 'react';
import { useGetTeamsQuery } from '../../features/team/teamApi';
import Layout from '../../Layout';
import Project from './Project';

const ProjectList = () => {

    const {data:teams,isSussess,isLoading,isError,error}=useGetTeamsQuery();

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
     content = teams.map((dt) => <Project key={dt._id} dt={dt} />);
 }

    return (
        <Layout title="Team List" className="bg-[#f5f7f9] h-[89.9vh]">
            <div className='w-10/12 m-auto flex py-2 justify-between pb-6'>
                <p className='underline underline-offset-4'>Projects </p>
            </div>
            <div className='w-10/12 m-auto'>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4  mt-4 gap-6">
                   {content}
                </div>
            </div>
        </Layout>
    );
};

export default ProjectList;