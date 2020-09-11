import React from 'react'
import FormDepartment from "../../../Components/FormDepartment";
import axios from "axios";

export default function AddEmployee({data, id, localhost}) {

    return (
        <>
            {(data.length > 0) ? <FormDepartment data={data} localhost={localhost} flag={true} depid={id}/> :
                <h1>Not found</h1>}
        </>
    )
}
export const getServerSideProps = async (context) => {
    const {id} = context.params
    const {req} = context;
    const localhost = req.headers.host;
    const data = await axios.get(`http://${localhost}/department/specific/${id}`);
    return {props: {data: data.data, id, localhost}}
}