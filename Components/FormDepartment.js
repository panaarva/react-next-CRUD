import React, {Fragment} from 'react'
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import {LockOutlined} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import {Formik} from 'formik';
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import {makeStyles} from '@material-ui/core/styles';
import axios from 'axios';
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
    }
}));

export default function FormDepartment({data, depid, flag}) {
    const router = useRouter();
    const classes = useStyles();
    return (
        <Fragment>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlined/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        ADD New Department
                    </Typography>
                    <Formik
                        initialValues={{name: (data) ? data[0].name : '', id: (data) ? data[0].id : ''}}
                        validate={values => {
                            const errors = {};
                            if (!values.name) {
                                errors.name = 'Required';
                            }
                            if (!values.id) {
                                errors.id = 'Required';
                            }
                            return errors;
                        }}
                        onSubmit={(values, {setSubmitting,setErrors}) => {
                            setTimeout(async () => {
                                if (flag) {
                                    await axios.put(`/department/${depid}`, values);
                                } else {
                                    await axios.post(`/department`, values).then(()=>{
                                        router.push('/');
                                    }).catch(()=>{
                                        setSubmitting(false);
                                        setErrors({id:'This id already used!!'})
                                    })
                                }
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
                                    error={Boolean(errors.id && touched.id && errors.id)}
                                    fullWidth
                                    id="id"
                                    value={values.id}
                                    label="Department ID"
                                    name="id"
                                    helperText={errors.id && touched.id && errors.id}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    error={Boolean(errors.name && touched.name && errors.name)}
                                    fullWidth
                                    id="name"
                                    value={values.name}
                                    label="Name"
                                    name="name"
                                    helperText={errors.name && touched.name && errors.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
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