import React from 'react'
import FormDepartment from "../../../Components/FormDepartment";
import axios from "axios";

export default function AddEmployee({data, id}) {

    return (
        <>
            {(data.length > 0) ? <FormDepartment data={data} flag={true} depid={id}/> : <h1>Not found</h1>}
        </>
    )
}
export const getServerSideProps = async (context) => {
    const {id} = context.params
    const data = await axios.get(`http://localhost:9002/department/specific/${id}`);
    return {props: {data: data.data, id}}
}