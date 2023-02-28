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
        }),
        verifyEmail: builder.mutation({
            query: (data) => ({
                url: "/verify-email",
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
                url: `/forgot-password/${email}`,
                method: "PUT",
            }),
        }),

        resetPassword: builder.mutation({
            query: ({new_password,npassword}) => ({
                url: `/${npassword}/reset-password`,
                method: "PUT",
                body: {new_password},
            }),
        }),

    })
});

export const { useLoginMutation, useRegisterMutation,useVerifyEmailMutation,useResetEmailMutation,useResetPasswordMutation } = authApi;