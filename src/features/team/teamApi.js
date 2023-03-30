import { apiSlice } from "../api/apiSlice";

export const teamApi = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
        //endpoints here --
        getTeams: builder.query({
            query: () => '/team',
        }),
        addNewTeam: builder.mutation({
            query: (data) => ({
                url: '/team',
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;

                    // start pessimistic way ->
                    if (result.data.teamName) {
                        dispatch(
                            apiSlice.util.updateQueryData(
                                "getTeams",
                                undefined,
                                (draft) => {
                                    draft.push(result.data);
                                }
                            )
                        )
                    }

                    // end pessimistic way ->

                } catch (err) {
                    // do nothing

                }
            },
        }),


    })

});

export const { useAddNewTeamMutation, useGetTeamsQuery } = teamApi;