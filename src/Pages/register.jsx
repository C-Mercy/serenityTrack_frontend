import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaHeart } from 'react-icons/fa';


const Register = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    date_of_birth: Yup.date().required('Date of birth is required'),
    diagnosis_date: Yup.date().required('Diagnosis date is required'),
    severity: Yup.string().required('Severity is required'),
    communication_level: Yup.string().required('Communication level is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="container-fluid">
      <div className="w-100 overflow-hidden position-relative flex-wrap d-block vh-100">
        <div className="row">
          <div className="col-lg-6">
            <div className="login-background d-lg-flex align-items-center justify-content-center d-lg-block d-none flex-wrap vh-100 overflow-auto" style={{ backgroundColor: '#FFF5EE', position: 'relative' }}>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <img
                  src="/images/AIkid.png"
                  alt="Autism awareness"
                  style={{height:"92vh",width:"48vw"}}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12">
            <div className="row justify-content-center align-items-center vh-100 overflow-auto flex-wrap">
              <div className="col-md-8 mx-auto p-4">
                <Formik
                  initialValues={{
                   
                    first_name: '',
                    last_name: '',
                    date_of_birth: '',
                    diagnosis_date: '',
                    severity: '',
                    communication_level: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                  }}
                  validationSchema={validationSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    console.log('Form submitted:', values);
                    setSubmitting(false);
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <div>
                        <div className="card">
                          <div className="card-body pb-3">
                            <div className="mb-4">
                              <h2 className="mb-2">Register</h2>
                              <p className="mb-0">Please fill in the details to create an account</p>
                            </div>
                            <div className="mb-3">
                                
                              <label className="form-label">Email Address</label>
                              <Field
                                type="email"
                                name="email"
                                className="form-control"
                                required
                              />
                              <ErrorMessage name="email" component="div" className="invalid-feedback" />
                             

                              <label className="form-label">First Name</label>
                              <Field
                                type="text"
                                name="first_name"
                                className="form-control"
                                required
                              />
                              <ErrorMessage name="first_name" component="div" className="invalid-feedback" />

                              <label className="form-label">Last Name</label>
                              <Field
                                type="text"
                                name="last_name"
                                className="form-control"
                                required
                              />
                              <ErrorMessage name="last_name" component="div" className="invalid-feedback" />

                              <label className="form-label">Date of Birth</label>
                              <Field
                                type="date"
                                name="date_of_birth"
                                className="form-control"
                                required
                              />
                              <ErrorMessage name="date_of_birth" component="div" className="invalid-feedback" />

                              <label className="form-label">Diagnosis Date</label>
                              <Field
                                type="date"
                                name="diagnosis_date"
                                className="form-control"
                                required
                              />
                              <ErrorMessage name="diagnosis_date" component="div" className="invalid-feedback" />

                              <label className="form-label">Severity</label>
                              <Field
                                type="text"
                                name="severity"
                                className="form-control"
                                required
                              />
                              <ErrorMessage name="severity" component="div" className="invalid-feedback" />

                              <label className="form-label">Communication Level</label>
                              <Field
                                type="text"
                                name="communication_level"
                                className="form-control"
                                required
                              />
                              <ErrorMessage name="communication_level" component="div" className="invalid-feedback" />

                              <span className="input-icon-addon">
                                <i className="ti ti-mail" />
                              </span>

                              <label className="form-label">Password</label>
                              <Field
                                type={isPasswordVisible ? "text" : "password"}
                                name="password"
                                className="form-control"
                                required
                              />
                              <ErrorMessage name="password" component="div" className="invalid-feedback" />
                              <span
                                className={`ti toggle-password ${isPasswordVisible ? "ti-eye" : "ti-eye-off"}`}
                                onClick={togglePasswordVisibility}
                              />

                              <label className="form-label">Confirm Password</label>
                              <Field
                                type={isPasswordVisible ? "text" : "password"}
                                name="confirmPassword"
                                className="form-control"
                                required
                              />
                              <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                              <span
                                className={`ti toggle-password ${isPasswordVisible ? "ti-eye" : "ti-eye-off"}`}
                                onClick={togglePasswordVisibility}
                              />
                            </div>
                          </div>
                          <div className="p-4 pt-0">
                            <div className="mb-3">
                              <button
                                type="submit"
                                className="btn btn-primary w-100"
                                disabled={isSubmitting}
                              >
                                Register
                              </button>
                            </div>
                            <div className="text-center">
                              <h6 className="fw-normal text-dark mb-0">
                                Already have an account?{" "}
                                <Link to="/login" className="hover-a">
                                  Sign In
                                </Link>
                              </h6>
                            </div>
                          </div>
                        </div>
                        <div className="mt-5 text-center">
                          <p className="mb-0">Copyright © {new Date().getFullYear()} - SerenityTrack <FaHeart style={{ color: 'red' }} /></p>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
                <ToastContainer 
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  closeOnClick
                  pauseOnHover
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
