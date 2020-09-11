import React from 'react'
import FormEmployee from "../../../Components/FormEmployee";
import axios from "axios";

export default function AddEmployee({data, employee, id,localhost}) {
    return (
        <FormEmployee data={data} employee={employee} localhost={localhost} flag={true} id={id}/>
    )
}
export const getServerSideProps = async (context) => {
    const {id} = context.params
    const {req} = context;
    const localhost = req.headers.host;
    const res = await axios.get(`http://${localhost}/employee/specific?id=${id}`);
    const data = await axios.get(`http://${localhost}/department`);
    return {props: {data: data.data, employee: res.data, id,localhost}}
}