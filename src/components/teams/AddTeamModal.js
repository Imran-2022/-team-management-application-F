import React, { useEffect, useState } from 'react'
import { useAddNewTeamMutation } from '../../features/team/teamApi'
import { useSelector } from 'react-redux';
export default function Modal({ open, control }) {
  const [addNewTeam] = useAddNewTeamMutation()
  const { user: loggedUser } = useSelector(state => state.auth);

  const [teamName, setTeamName] = useState('')
  const [teamDetails, setTeamDetails] = useState('')
  const [teamColor, setTeamColor] = useState('')

  const handleForm = () => {
    addNewTeam({ teamName, teamDetails, teamColor, teamMembers: [loggedUser?.email] })
    control();
    setTeamColor('')
    setTeamDetails('')
    setTeamName("")
  }

  return (
    open && (
      <>
        <div
          onClick={control}
          className="fixed w-full h-full inset-0 z-10 bg-black/40 cursor-pointer"
        ></div>
        <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white  p-10 fixed top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <h2 className="text-xl font-mono underline underline-offset-4">Add New Team</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleForm() }}>
            <div className="overflow-hidden  sm:rounded-md">
              <div className="px-4 py-3 sm:p-3 space-y-4">
                {/* Team Name */}
                <div>
                  <label
                    htmlFor="teamName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Team name
                  </label>
                  <input
                    type="text"
                    name="teamName"
                    id="teamName"
                    autoComplete="given-name"
                    className="flex items-center h-12 px-4 w-full border  mt-2 rounded focus:outline-none focus:ring-2"
                    required
                    value={teamName} onChange={(e) => setTeamName(e.target.value)}
                  />
                </div>

                {/* About Your Team */}

                <div>
                  <label
                    htmlFor="teamDetails"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Write about your team
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="teamDetails"
                      name="teamDetails"
                      rows={4}
                      className="flex items-center px-4 w-full border  mt-2 rounded focus:outline-none focus:ring-2"
                      required
                      value={teamDetails} onChange={(e) => setTeamDetails(e.target.value)}
                    />
                  </div>
                </div>
                {/* team color  */}
                <div>
                  <label
                    htmlFor="teamColor"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Team Color (
                    <span className="text-gray-400 font-light">
                      {' '}
                      any valid color - color name or code
                    </span>
                    )
                  </label>
                  <input
                    type="text"
                    name="teamColor"
                    id="teamColor"
                    placeholder="eg. green or #00FFFF or rgb(89,18,100) "
                    autoComplete="given-name"
                    className="flex items-center h-12 px-4 w-full border  mt-2 rounded focus:outline-none focus:ring-2"
                    required
                    value={teamColor} onChange={(e) => setTeamColor(e.target.value)}
                  />
                </div>
              </div>

              <div className=" px-4 py-3 text-right sm:px-6">
                <button
                  type="submit"
                  className="bg-cyan-400 inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal"
                >
                  Add New Team
                </button>
              </div>
            </div>
          </form>
        </div>
      </>
    )
  );
}
