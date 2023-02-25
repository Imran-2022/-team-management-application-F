import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //endpoints here --
        register: builder.mutation({
            query: (data) => ({
                url: '/registration',
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;

                    localStorage.setItem('auth', JSON.stringify({
                        token: result.data.token,
                        user: result.data.user
                    }));

                    dispatch(userLoggedIn({
                        token: result.data.token,
                        user: result.data.user
                    }))

                } catch (err) {
                    // nothing to do ......
                }
            }
        }),
        login: builder.mutation({
            query: (data) => ({
                url: '/login',
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;

                    localStorage.setItem('auth', JSON.stringify({
                        token: result.data.token,
                        user: result.data.user
                    }));

                    dispatch(userLoggedIn({
                        token: result.data.token,
                        user: result.data.user
                    }))

                } catch (err) {
                    // nothing to do ......
                }
            }
        })

    })
});

export const { useLoginMutation, useRegisterMutation } = authApi;