import React from 'react'
import FormDepartment from "../../Components/FormDepartment";

export default function AddEmployee({localhost}) {
    console.log(localhost);
    return (
        <FormDepartment flag={false} localhost={localhost}/>
    )
}
export const getServerSideProps = async ({req}) => {
    const localhost = req.headers.host;
    console.log(req.headers.host);
    return {props: {localhost}}
}