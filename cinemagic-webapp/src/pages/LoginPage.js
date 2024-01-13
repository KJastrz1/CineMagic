import { useLogin } from 'Hooks/useLogin';
import usePost from 'Hooks/usePost';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useFormik } from 'formik';
import { gapi } from 'gapi-script';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import LoginGoogleButton from '../components/Authentication/LoginGoogleButton';
import LogoutGoogleButton from '../components/Authentication/LogoutGoogleButton';
import Myspinner from '../components/Spinners/Myspinner';

const clientId = process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID;

function LoginPage() {
    const url = '/Auth/login';
    const { sendRequest, responseData, isPending, error } = usePost();

    useEffect(() => {
        function start() {
            gapi.client.init({
                'clientId': clientId,
                'scope': 'profile email'
            });
        };
        gapi.load('client:auth2', start);
    }, []);

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required')

    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: values => {
            sendRequest(url, 'POST', values);
        },
    });


    useLogin(responseData);


    return (
        <div className='container col-md-6 col-lg-4 mt-5'>
            <h1>Login</h1>
            <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="text-danger">{formik.errors.email}</div>
                    ) : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className="text-danger">{formik.errors.password}</div>
                    ) : null}
                </div>

                <button type="submit" className="btn btn-outline-success">Submit</button>
                {isPending && <Myspinner />}
                {error && <div>{error}</div>}
            </form>
            <div className='mt-3 d-flex flex-column align-items-center'>
                <div className='mb-2 text'>Or login with Google</div>
                <LoginGoogleButton />
            </div>
        </div>
    );
}

export default LoginPage;
