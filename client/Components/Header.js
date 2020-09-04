import Link from 'next/link'
import {AppBar, Link as LinkMaterial, Tab, Tabs, Toolbar} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

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
    const [value, setValue] = React.useState();
    const classes = useStyles();
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
                            <Link href="/" as="/">
                                <Tab label="Department" value="department" {...a11yProps(0)}/>
                            </Link>
                            <Link href="/employee" as="/employee">
                                <Tab label="Employee" value="employee" {...a11yProps(0)}/>
                            </Link>
                        </Tabs>
                        <div className={classes.grow}/>

                    </Toolbar>
                </AppBar>
            </div>
        </header>
    )
}

export default Header