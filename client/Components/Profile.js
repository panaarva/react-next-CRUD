import React, {Fragment} from "react";
import {Cake as CakeIcon, Work} from '@material-ui/icons';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {
    ListItemText,
    ListItemAvatar,
    Divider,
    ListItem,
    List,
    Avatar,
    CssBaseline,
    Typography,
    Fab,
    Toolbar
} from "@material-ui/core";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(15),
        paddingBottom: theme.spacing(20),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    toolbar: {
        backgroundColor: "#3f51b5",
        color: "white",
        flexDirection: 'column',
        alignItems: 'center',
        '@media (max-width:1300px)': {
            width: "100%",
            flexDirection: 'column',
            alignItems: 'center',
        }
    },
    avatar: {
        width: theme.spacing(12),
        height: theme.spacing(12),
    },
    header: {
        marginTop: theme.spacing(4),
        fontSize: 40,
        '@media (max-width:600px)': {
            fontSize: 20
        }
    },
    fabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -55,
        left: 0,
        right: 0,
        margin: '0 auto',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    box: {
        width: "40%",
        '@media (max-width:1300px)': {
            width: "100%"
        }
    }

}));

export default ({data}) => {
    const {id,fname,lname,deptid,startdate} = data[0]
    const classes = useStyles();
    return (

        <Fragment>
            <CssBaseline/>
            <div className={classes.root}>
                <Box boxShadow={3} className={classes.box} borderRadius={16}>
                    <Toolbar className={classes.toolbar}>
                        <Fab color="primary" aria-label="add" className={classes.fabButton}>
                            <Avatar color="primary" className={classes.avatar}/>
                        </Fab>
                        <Typography className={classes.header}>{`${fname} ${lname}`}</Typography>
                        <Typography variant="h6">{`Code: ${id}`}</Typography>
                    </Toolbar>
                    <List>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <Work/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary='Department' secondary={deptid}/>
                        </ListItem>
                        <Divider variant="inset" component="li"/>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <CakeIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary='Start Date'
                                          secondary={String(startdate).slice(0, 10)}/>
                        </ListItem>
                    </List>
                </Box>
            </div>

        </Fragment>
    )
}