import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { addpaginatedData, setTotalCount } from "../pagination/paginationSlice";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_API_URL}`,
        prepareHeaders: async (headers, { getState, endpoint }) => {
            const token = getState()?.auth?.token;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ['billingss', 'bill', 'billings','billingsadd','billingsTotal'],
    endpoints: (builder) => ({
        getBillings: builder.query({
            query: (argu) => {
                const { currentPage, limit } = argu;
                return {
                    url: `/billing-list`,
                    method: "GET",
                    // currentPage,limit
                    params: { currentPage, limit },
                    keepUnusedDataFor: 600,
                }

            },
            providesTags: ["billingss"],
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    console.log("result", result?.data)
                    dispatch(addpaginatedData(result?.data))

                } catch (err) {
                    // do nothing
                }
            },
        }),

        getBilling: builder.query({
            query: (id) => `/billing-list/${id}`,
            providesTags: (result, error, arg) => [
                "billings", { type: "bill", _id: arg }
            ],
        }),
        getSearchList: builder.query({
            query: (value) => `/billing-list-search?search=${value}`
        }),
        addBilling: builder.mutation({
            query: (data) => ({
                url: '/add-billing',
                method: 'POST',
                body: data
            }),
            providesTags: ["billingsadd"],
            invalidatesTags: ["billingss","billingsTotal","totalPaid"],
        }),
        editBill: builder.mutation({
            query: ({ id, data }) => ({
                url: `/update-billing/${id}`,
                method: "PUT",
                body: data,
            }),
           
            invalidatesTags: ["billingss","totalPaid"],
            // invalidatesTags: (result, error, arg) => [
            //     "billingss", { type: "bill", _id: arg.id }
            // ],
        }),
        deleteBill: builder.mutation({
            query: (id) => ({
                url: `/delete-billing/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["billingss","billingsTotal","totalPaid"],
        }),
        getTotalOfBill: builder.query({
            query: () => ({
                url: `/billing-list/total`,
                method: "GET",
            }),
            providesTags: ["billingsTotal"],
            invalidatesTags: ["billingss","billingsadd"],
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(setTotalCount(result?.data.total))

                } catch (err) {
                    // do nothing
                }
            },
        }),
        getTotalPaid:builder.query({
            query: () => `/billing-list/totalPaid`,
            providesTags: ['totalPaid']
        })
    }),

});

export const { useGetBillingsQuery, useGetBillingQuery, useGetSearchListQuery, useAddBillingMutation, useEditBillMutation, useDeleteBillMutation, useGetTotalOfBillQuery,useGetTotalPaidQuery } = apiSlice;
