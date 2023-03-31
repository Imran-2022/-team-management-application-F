import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //endpoints here --
        register: builder.mutation({
            query: (data) => ({
                url: '/auth/registration',
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
                url: '/auth/login',
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
        verifyEmail: builder.mutation({
            query: (data) => ({
                url: "/auth/verify-email",
                method: "PUT",
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
                    // do nothing
                }
            },
        }),
        resetEmail: builder.mutation({
            query: (email) => ({
                url: `/auth/forgot-password/${email}`,
                method: "PUT",
            }),
        }),

        resetPassword: builder.mutation({
            query: ({new_password,npassword}) => ({
                url: `/auth/${npassword}/reset-password`,
                method: "PUT",
                body: {new_password},
            }),
        }),
        getUser:builder.query({
            query: () => '/auth/user',
        })

    })
});

export const { useLoginMutation, useRegisterMutation,useVerifyEmailMutation,useResetEmailMutation,useResetPasswordMutation,useGetUserQuery } = authApi;