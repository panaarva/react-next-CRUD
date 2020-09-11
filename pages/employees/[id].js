import React from 'react'
import axios from "axios";
import Profile from "../../Components/Profile";

export default function viewEmployee({data}) {
    return (
        <>
            {(data.length > 0) ? <Profile userID={1} data={data}/> : <h1>Not Found</h1>
            }
        </>
    )
}
export const getServerSideProps = async (context) => {
    const res = await axios.get(`/employee/specific?id=${context.query.id}`);
    return {props: {data: res.data}}
}