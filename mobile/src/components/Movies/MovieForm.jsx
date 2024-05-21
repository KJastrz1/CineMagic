import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import MySpinner from 'components/UI/MySpinner';
import MainButton from 'components/UI/MainButton';
import BaseInput from 'components/UI/BaseInput';
import ErrorText from 'components/UI/ErrorText';


const validationSchema = Yup.object({
    title: Yup.string()
        .required('Title is required')
        .min(2, 'Title must be at least 2 characters')
        .max(100, 'Title can\'t be more than 100 characters'),
    director: Yup.string()
        .required('Director is required')
        .min(2, 'Director name must be at least 2 characters')
        .max(50, 'Director name can\'t be more than 50 characters'),
    description: Yup.string()
});

const MovieForm = ({ onFormSubmit, initialData, isPending }) => {
  
    const initialValues = {
        title: initialData?.title || '',
        director: initialData?.director || '',
        description: initialData?.description || '',
        newImage: null
    };
  

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            if (onFormSubmit) {
                onFormSubmit(values, resetForm);
            }
        },
    });

    const handleFileChange = (event) => {
        const file = event.currentTarget.files[0];
        formik.setTouched({ ...formik.touched, newImage: true });
        if (file) {
            const validExtensions = ['image/jpeg', 'image/png'];
            const maxSizeMB = 10;
            if (!validExtensions.includes(file.type)) {
                formik.setFieldError('newImage', 'Invalid file type. Only JPG and PNG are allowed.');
            } else if (file.size > maxSizeMB * 1024 * 1024) {
                formik.setFieldError('newImage', `File too large. Max size is ${maxSizeMB}MB.`);
            } else {
                formik.setFieldValue('newImage', file);
                formik.setFieldError('newImage', null);
            }
        }
    };
    return (
        <View style={styles.container}>
            {/* File Upload Section */}
            {/* TODO: Implement file upload with a third-party library like react-native-document-picker */}

            <View style={styles.formGroup}>
                <Text style={styles.label}>Title</Text>
                <BaseInput
                    onChangeText={formik.handleChange('title')}
                    onBlur={formik.handleBlur('title')}
                    value={formik.values.title}
                />
                {formik.touched.title && formik.errors.title && (
                      <ErrorText error={formik.errors.title}/>
                )}
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Director</Text>
                <BaseInput
                    onChangeText={formik.handleChange('director')}
                    onBlur={formik.handleBlur('director')}
                    value={formik.values.director}
                />
                {formik.touched.director && formik.errors.director && (
                       <ErrorText error={formik.errors.director}/>
                )}
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Description</Text>
                <BaseInput
                    multiline
                    numberOfLines={4}
                    onChangeText={formik.handleChange('description')}
                    onBlur={formik.handleBlur('description')}
                    value={formik.values.description}
                />
                {formik.touched.description && formik.errors.description && (
                    <ErrorText error={formik.errors.description}/>
                )}
            </View>

            {!isPending && (
                <MainButton title="Submit" onPress={formik.handleSubmit} />
            )}
            {isPending && <MySpinner />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#212529',
        marginTop: 20,

    },
    formGroup: {
        marginBottom: 15,
    },
    label: {
        marginBottom: 5,
        fontWeight: 'bold',
        color: 'white',
    },
    errorText: {
        color: 'red',
    },


});

export default MovieForm;
