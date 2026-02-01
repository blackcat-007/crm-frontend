const BASE_URL=process.env.NEXT_PUBLIC_API_URL;
export const apiRoutes = {
    users:`${BASE_URL}/api/auth`,
    customers: `${BASE_URL}/api/customers`,
    leads: `${BASE_URL}/api/leads`,

};
