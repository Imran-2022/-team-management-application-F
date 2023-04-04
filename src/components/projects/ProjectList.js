import React, { useEffect, useState } from 'react';
import { useGetTeamsQuery } from '../../features/team/teamApi';
import Layout from '../../Layout';
import Project from './Project';
import { filterBySearch } from '../../features/team/teamSlice';
import { useDispatch, useSelector } from 'react-redux';

const ProjectList = () => {

    const { data: teams, isSussess, isLoading, isError, error } = useGetTeamsQuery();
    const [search, setSearch] = useState('');
    const dispatch = useDispatch()
    const { searchProjects } = useSelector((state) => state.teams);

    const filterBy=(dt)=>{
        if(dt.teamName.toLowerCase().includes(searchProjects?.toLowerCase())){
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
        content = <p>Not found!</p>
    }

    if (!isLoading && !isError && teams?.length > 0) {
        content = teams
        .filter(filterBy)
        .map((dt) => <Project key={dt._id} dt={dt} />);
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
        dispatch(filterBySearch(e.target.value))
    }

    useEffect(()=>{
        dispatch(filterBySearch(''))
    },[dispatch])

    return (
        <Layout title="Team List" className="bg-[#f5f7f9] h-[89.9vh]">
            <div className='w-10/12 m-auto flex py-2 justify-between pb-6'>
                <p className='underline underline-offset-4'>Projects </p>
                <div className='flex gap-2 justify-center items-center border'>
                    <input  value={search} onChange={handleSearch} type="text" placeholder="Search projects " className="px-2 border-gray-300 focus:outline-none" />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 17l-5-5m0 0l5-5m-5 5h12" />
                    </svg>
                </div>
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