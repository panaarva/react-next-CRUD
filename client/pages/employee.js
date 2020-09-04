import Table from "../Components/Table";
import React from "react";
import axios from 'axios'

function Employee({employee, department}) {
    let depart = {};
    department.forEach((dep) => {
        depart = {...depart, [dep.id]: dep.name}
    })
    const columns = [
        {id: "fname", title: 'FirstName', field: 'fname'},
        {id: "lname", title: "LastName", field: 'lname', type: 'string'},
        {title: "StartDate", field: 'startdate', type: 'date', id: 'startdate'},
        {
            id: "deptid",
            title: "Department",
            field: "deptid",
            lookup: depart,
        },
    ];

    return (
        <Table title="Employee" columns={columns} data={employee} url='/employee/new'/>
    )
}

export const getServerSideProps = async () => {
    let data;
    let department;
    data = await axios.get('http://localhost:9002/employee');
    department = await axios.get('http://localhost:9002/department');
    return {props: {employee: data.data, department: department.data}}
}

export default Employee