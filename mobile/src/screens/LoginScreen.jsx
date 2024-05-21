import React from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLogin } from 'src/Hooks/useLogin';
import usePost from 'src/Hooks/usePost';
import MySpinner from 'components/UI/MySpinner';
import MainButton from 'components/UI/MainButton';
import ErrorText from 'components/UI/ErrorText';
import BaseInput from 'components/UI/BaseInput';


const LoginScreen = () => {
    const url = '/Auth/login';
    const { sendRequest, responseData, isPending, error } = usePost();


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
            sendRequest(url, 'POST', values).then(() => {

            });
        },
    });
    const { isLoadingLogin, errorLogin } = useLogin(responseData);



    if (isLoadingLogin) {
        return <MySpinner />
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <View style={styles.formGroup}>
                <BaseInput
                    onChangeText={formik.handleChange('email')}
                    onBlur={formik.handleBlur('email')}
                    value={formik.values.email}
                    placeholder="Email address"
                    keyboardType="email-address"
                    placeholderTextColor="#fff"
                />
                {formik.touched.email && formik.errors.email && <ErrorText error={formik.errors.email} />}
            </View>
            <View style={styles.formGroup}>
                <BaseInput
                    onChangeText={formik.handleChange('password')}
                    onBlur={formik.handleBlur('password')}
                    value={formik.values.password}
                    placeholder="Password"
                    placeholderTextColor="#fff"
                    secureTextEntry
                />
                {formik.touched.password && formik.errors.password && <ErrorText error={formik.errors.password} />}
            </View>

            <MainButton
                onPress={formik.handleSubmit}
                title="Submit"

            />
            {isPending && <ActivityIndicator size="large" />}
            {error && <ErrorText error={error} />}
            {errorLogin && <ErrorText error={errorLogin} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#212529',
        color: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
    },
    formGroup: {
        width: '100%',
        marginBottom: 15,
        color: 'white',
    }, 
});

export default LoginScreen;
