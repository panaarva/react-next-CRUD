import React, {forwardRef} from "react";
import MaterialTable from 'material-table';
import Router, {useRouter} from 'next/router';
import {
    AddBox,
    ArrowDownward,
    Check,
    ChevronLeft,
    ChevronRight,
    Clear,
    ViewColumn,
    Search,
    SaveAlt,
    Remove,
    LastPage,
    FirstPage,
    FilterList,
    Edit,
    DeleteOutline,
    Person as PersonIcon,
} from '@material-ui/icons';
import axios from 'axios';
import AddBoxIcon from '@material-ui/icons/AddBox';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref}/>),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref}/>),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref}/>),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>)
};

export default function Table({title, data, columns, url, updateUrl, localhost}) {
    const router = useRouter();
    const deleteData = async (id) => {
        try {
            if (title === 'Employee') {
                await axios.delete(`http://${localhost}/employee?employeeId=${id}`);
            } else {
                await axios.delete(`http://${localhost}${updateUrl}${id}`);
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <MaterialTable
            icons={tableIcons}
            title={title}
            columns={columns}
            data={data}
            options={{exportButton: true}}
            actions={[
                {
                    icon: PersonIcon,
                    tooltip: "Profile",
                    onClick: (event, rowData) => {
                        const {id} = rowData;
                        if (title === 'Employee')
                            router.push(`/employees/${id}`)
                    }
                },
                {
                    icon: AddBoxIcon,
                    tooltip: `Add new ${title}`,
                    isFreeAction: true,
                    onClick: () => {
                        router.push(url)
                    }
                },
                {
                    icon: Edit,
                    tooltip: `Edit ${title}`,
                    onClick: (event, rowData) => {
                        const {id} = rowData
                        if (title === 'Employee')
                            router.push(`/employees/${id}/edit`)
                        else router.push(`/departments/${id}/edit`)
                    }
                }
            ]}
            editable={{
                onRowDelete: async (oldData) => {
                    await deleteData(data[oldData.tableData.id].id)
                    Router.reload(window.location.pathname);
                }
            }}
        />
    )
}