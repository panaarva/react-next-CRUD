import React, {Fragment} from 'react'
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import {LockOutlined} from "@material-ui/icons";
import {Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import {Formik} from 'formik';
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import {makeStyles} from '@material-ui/core/styles';
import Select from "@material-ui/core/Select";
import axios from "axios";
import {apiUrl} from '../src/config'
import {useRouter} from 'next/router';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        paddingBottom: theme.spacing(20),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    pass: {
        width: "100%",
        margin: theme.spacing(1, 0, 0)
    },
    success: {
        backgroundColor: "green"
    },
    formControl: {
        width: '100%',
        margin: theme.spacing(1, 0, 0),
        minWidth: 120,
    }
}));

export default function FormEmployee({data, employee, flag, id}) {
    const router = useRouter();
    const classes = useStyles()
    return (
        <Fragment>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlined/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        ADD New Employee
                    </Typography>
                    <Formik
                        initialValues={{
                            firstname: (employee) ? employee[0].fname : '',
                            lastname: (employee) ? employee[0].lname : "",
                            startDate: (employee) ? String(employee[0].startdate).slice(0, 10) : "",
                            depId: (employee) ? employee[0].deptid : ""
                        }}
                        validate={values => {
                            console.log(values)
                            const errors = {};
                            if (!values.firstname) {
                                errors.firstname = 'Required';
                            }
                            if (!values.lastname) {
                                errors.lastname = 'Required';
                            }
                            if (!values.startDate) {
                                errors.startDate = 'Required';
                            }
                            return errors;
                        }}
                        onSubmit={(values) => {
                            setTimeout(async () => {
                                if (flag) {
                                    await axios.put(`${apiUrl}/employee/${id}`, values);
                                } else {
                                    await axios.post(`${apiUrl}/employee`, values)
                                }
                                router.push('/employee');
                            }, 400);
                        }}
                    >
                        {({
                              values,
                              errors,
                              touched,
                              handleChange,
                              handleBlur,
                              handleSubmit,
                              isSubmitting,
                          }) => (
                            <form className={classes.form} onSubmit={handleSubmit}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    error={Boolean(errors.firstname && touched.firstname && errors.firstname)}
                                    fullWidth
                                    id="firstname"
                                    value={values.firstname}
                                    label="First Name"
                                    name="firstname"
                                    helperText={errors.firstname && touched.firstname && errors.firstname}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    error={Boolean(errors.lastname && touched.lastname && errors.lastname)}
                                    fullWidth
                                    id="lastname"
                                    value={values.lastname}
                                    label="Last Name"
                                    name="lastname"
                                    helperText={errors.lastname && touched.lastname && errors.lastname}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <TextField
                                    variant="outlined"
                                    margin={"normal"}
                                    error={Boolean(errors.startDate && touched.startDate && errors.startDate)}
                                    fullWidth
                                    type="date"
                                    id="startDate"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={values.startDate}
                                    label="Start Date"
                                    name="startDate"
                                    helperText={errors.startDate && touched.startDate && errors.startDate}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel htmlFor="outlined-age-native-simple">Department</InputLabel>
                                    <Select
                                        native
                                        value={values.depId}
                                        onChange={handleChange}
                                        label="Department"
                                        inputProps={{
                                            name: 'depId',
                                            id: 'depId',
                                        }}
                                    >
                                        <option value='none'> </option>
                                        {data.map((data) => <option value={data.id}>{data.name}</option>)}
                                    </Select>
                                </FormControl>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    type="submit" disabled={isSubmitting}
                                >
                                    SUBMIT
                                </Button>
                            </form>
                        )}
                    </Formik>
                </div>
            </Container>
        </Fragment>
    )
}