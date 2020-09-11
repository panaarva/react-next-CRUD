import Table from '../Components/Table'
import React from "react";
import axios from "axios";

function Home({data,localhost}) {
    const columns = [
        {id: "id", title: 'Id Department', field: 'id', type: 'string'},
        {title: "Name Department", field: 'name', type: 'string', id: 'name'}
    ];

    return (
        <Table title={"Department"} data={data} columns={columns} url='/departments/new'
               updateUrl='/department?departId=' localhost={localhost}/>
    )
}

export const getServerSideProps = async ({req}) => {
    const localhost = req.headers.host;
    let data;
    data = await axios.get(`${localhost}/department`);
    return {props: {data: data.data,localhost}}
}

export default Home