import React from 'react'
import FormEmployee from "../../../Components/FormEmployee";
import axios from "axios";

export default function AddEmployee({data, employee, id}) {
    return (
        <FormEmployee data={data} employee={employee} flag={true} id={id}/>
    )
}
export const getServerSideProps = async (context) => {
    const {id} = context.params
    const res = await axios.get(`/employee/specific?id=${id}`);
    const data = await axios.get(`/department`);
    return {props: {data: data.data, employee: res.data, id}}
}