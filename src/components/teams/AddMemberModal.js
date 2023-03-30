import { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import {  useUpdateTeamMutation } from '../../features/team/teamApi';

export default function AddMemberModal({ open, control, id }) {
    const [updateTeam] = useUpdateTeamMutation();
    console.log(id);
    const [email, setEmail] = useState("");
    const hanldeAddTeamMember = (e) => {
        e.preventDefault();
        const data={email}
        updateTeam({ id, data})
        control()
    }

    return (
        open && (
            <>
                <div
                    onClick={control}
                    className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
                ></div>
                <div className="rounded w-[400px] lg:w-[600px] space-y-4 bg-white p-10 fixed top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
                    <h2 className="text-sm font-extrabold text-gray-700">
                        Add New Member
                    </h2>
                    <form onSubmit={hanldeAddTeamMember}>
                        <div className="overflow-hidden sm:rounded-md">
                            <div className="flex w-full items-center">
                                <input
                                    type="email"
                                    name="first-name"
                                    id="first-name"
                                    autoComplete="given-name"
                                    className="block w-full h-12 px-4 border-2 focus:outline-none focus:ring-2"
                                    required
                                    placeholder="user email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                <button
                                    type="submit"
                                    className="inline-flex justify-center border border-transparent 
                                        bg-cyan-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none self-stretch  items-center"
                                >
                                    <AiOutlinePlus className="text-white" />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </>
        )
    );
}
