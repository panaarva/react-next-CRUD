import React from 'react'
import FormEmployee from "../../Components/FormEmployee";
import axios from "axios";

export default function AddEmployee({data}) {

    return (
        <FormEmployee data={data}/>
    )
}
export const getServerSideProps = async () => {
    let data;
    data = await axios.get(`/department`);
    return {props: {data: data.data}}
}