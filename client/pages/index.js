import Table from '../Components/Table'
import React from "react";
import axios from "axios";
import {apiUrl} from "../src/config";

function Home({data}) {
    const columns = [
        {id: "id", title: 'Id Department', field: 'id', type: 'string'},
        {title: "Name Department", field: 'name', type: 'string', id: 'name'}
    ];

    return (
        <Table title={"Department"} data={data} columns={columns} url='/departments/new'
               updateUrl='/department?departId='/>
    )
}

export const getServerSideProps = async () => {
    let data;
    data = await axios.get(`${apiUrl}/department`);
    return {props: {data: data.data}}
}

export default Home