import Myspinner from 'components/Spinners/Myspinner';
import { useFormik, Form, Formik, Field, ErrorMessage } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';


const MovieForm = ({ onFormSubmit, initialData, isPending, isEditMode }) => {
    const [fileError, setFileError] = useState(null);
    const initialValues = {
        title: initialData?.title || '',
        director: initialData?.director || '',
        description: initialData?.description || '',
        newImage: null
    };

    const validationSchema = Yup.object({
        title: Yup.string()
            .required('Title is required')
            .min(2, 'Title must be at least 2 characters')
            .max(100, 'Title can\'t be more than 100 characters'),
        director: Yup.string()
            .required('Director is required')
            .min(2, 'Director name must be at least 2 characters')
            .max(50, 'Director name can\'t be more than 50 characters'),
        description: Yup.string(),
    });
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            if (fileError) {                           
                return; 
            }
            if (onFormSubmit) {
                onFormSubmit(values, resetForm);
            }
        },
    });

    const handleFileChange = (event) => {
        const file = event.currentTarget.files[0];
        formik.setTouched({ ...formik.touched, newImage: true });

        if (!file) {
            if (isEditMode) {
                formik.setFieldValue('newImage', null);
                setFileError(null);
            }
        } else {
            const validExtensions = ['image/jpg', 'image/jpeg', 'image/png'];
            const maxSizeMB = 10;
            if (!validExtensions.includes(file.type)) {
                setFileError('Invalid file type. Only JPG and PNG are allowed.');
            } else if (file.size > maxSizeMB * 1024 * 1024) {
                setFileError(`File too large. Max size is ${maxSizeMB}MB.`);
            } else {
                formik.setFieldValue('newImage', file);
                setFileError(null);
            }
        };
    }
        

        return (
            <div className="container mt-4">
                <form onSubmit={formik.handleSubmit}>
                    <div className="row">
                        <div className="col-md-5">
                            <label htmlFor="file_input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload movie poster</label>
                            <br />
                            <input
                                type="file"
                                id="file_input"
                                onChange={handleFileChange}
                            // className="form-control"
                            />
                            {formik.touched.newImage && fileError && (
                                <div className="text-danger">{fileError}</div>
                            )}
                        </div>
                        <div className="col-md-7">
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input
                                    id="title"
                                    type="text"
                                    className="form-control"
                                    {...formik.getFieldProps('title')}
                                />
                                {formik.touched.title && formik.errors.title ? (
                                    <div className="text-danger">{formik.errors.title}</div>
                                ) : null}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="director" className="form-label">Director</label>
                                <input
                                    id="director"
                                    type="text"
                                    className="form-control"
                                    {...formik.getFieldProps('director')}
                                />
                                {formik.touched.director && formik.errors.director ? (
                                    <div className="text-danger">{formik.errors.director}</div>
                                ) : null}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea
                                    id="description"
                                    // @ts-ignore
                                    rows="3"
                                    className="form-control"
                                    {...formik.getFieldProps('description')}
                                ></textarea>
                                {formik.touched.description && formik.errors.description ? (
                                    <div className="text-danger">{formik.errors.description}</div>
                                ) : null}
                            </div>
                            {!isPending && <button type="submit" className="btn btn-outline-success">Save Changes</button>}
                            {isPending && <Myspinner />}
                        </div>
                    </div>
                </form>
            </div>
        );
    };

    export default MovieForm;
