import React from 'react';
import Layout from '../../Layout';
import { useGetTeamsQuery } from '../../features/team/teamApi';
import ListTable from './ListTable';


const ProjectsListTable = () => {

    const { data: ProjectList, isSuccess, isError, error, isLoading } = useGetTeamsQuery();


    // decide what to render
    let content = null;

    if (isLoading) {
        content = <p>Loading ...</p>
    }

    if (!isLoading && isError) {
        content = <p>There was an error</p>
    }

    if (!isLoading && !isError && ProjectList?.length === 0) {
        content = <p>Not found!</p>
    }

    if (!isLoading && !isError && ProjectList?.length > 0) {
        content = ProjectList
            .map((dt, idx) => <ListTable key={dt._id} dt={dt} idx={idx} />);
    }

    return (
        <Layout title="Projects List" className="bg-[#f5f7f9] min-h-[89.9vh]">
            <div className='w-10/12 m-auto py-2'>
                <div className='py-8'> 
                    <table className="table-auto w-full border-collapse">
                        <thead class="bg-blue-400">
                            <tr>
                                <th class="px-6 py-3 text-xs font-medium tracking-wider text-white uppercase border-b border-gray-200 text-left">No</th>
                                <th class="px-6 py-3 text-xs font-medium tracking-wider text-white uppercase border-b border-gray-200 text-left">Projects</th>
                                <th class="px-6 py-3 text-xs font-medium tracking-wider text-white uppercase border-b border-gray-200 text-left">Team Members</th>
                                <th class="px-6 py-3 text-xs font-medium tracking-wider text-white uppercase border-b border-gray-200 text-left">Supervisor</th>
                                <th class="px-6 py-3 text-xs font-medium tracking-wider text-white uppercase border-b border-gray-200 text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            {
                                content
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
};

export default ProjectsListTable;