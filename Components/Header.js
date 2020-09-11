import {AppBar, Tab, Tabs, Toolbar} from "@material-ui/core";
import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useRouter} from 'next/router'

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        position: "relative",
        minHeight: "100vh"
    },
    toolbar: {
        minHeight: "auto"
    },
    grow: {
        flexGrow: 1,
    },
    contentWrap: {
        paddingBottom: "2.5rem"
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
        position: "absolute",
        bottom: 0,
        width: "100%",
    }
}));

function Header() {
    const [value, setValue] = useState();
    const classes = useStyles();
    const router = useRouter()
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <header>
            <div className={classes.contentWrap}>
                <AppBar position="absolute">
                    <Toolbar className={classes.toolbar}>
                        <Tabs value={value} onChange={handleChange}
                              aria-label="simple tabs example">
                            <Tab label="Department" value="department" {...a11yProps(0)}
                                 onClick={() => router.push('/', undefined, {shallow: true})}/>/>
                            <Tab label="Employee" value="employees" {...a11yProps(0)}
                                 onClick={() => router.push('/employees', undefined, {shallow: true})}/>
                        </Tabs>
                        <div className={classes.grow}/>

                    </Toolbar>
                </AppBar>
            </div>
        </header>
    )
}

export default Header