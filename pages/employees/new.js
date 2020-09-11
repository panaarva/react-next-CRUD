import React from 'react'
import FormEmployee from "../../Components/FormEmployee";
import axios from "axios";

export default function AddEmployee({data, localhost}) {

    return (
        <FormEmployee data={data} localhost={localhost}/>
    )
}
export const getServerSideProps = async ({req}) => {
    let data;
    const localhost = req.headers.host;
    data = await axios.get(`http://${localhost}/department`);
    return {props: {data: data.data, localhost}}
}