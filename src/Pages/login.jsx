import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaHeart } from "react-icons/fa";
import { useLoginMutation } from '../slices/userSlice';
import { useDispatch } from 'react-redux';
import {login} from "../slices/authSlice";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginUser, { isLoading, error }] = useLoginMutation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    remember: Yup.bool(),
  });

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { email, password } = values;
      const response = await loginUser({ username: email, password }).unwrap();
      const { user, access, refresh } = response;
  
      // Success: Show success toast and navigate
      toast.success("Login Successful");
      navigate('/');
  
      // Store tokens and user info in localStorage
      localStorage.setItem('token', access);
      localStorage.setItem('refresh', refresh);
      localStorage.setItem('user', JSON.stringify(user));
  
      // Dispatch the login action to save the user and token in the Redux store
      dispatch(login({ user, token: access }));
  
    } catch (err) {
      console.error('Login failed:', err);
  
      // Check the error response for specific messages
      if (err?.data?.non_field_errors) {
        // General authentication error (e.g., incorrect credentials)
        toast.error(`Authentication Error: ${err.data.non_field_errors[0]}`);
      } else if (err?.data?.email) {
        // Email errors (e.g., email not found)
        toast.error(`Email Error: ${err.data.email[0]}`);
      } else if (err?.data?.password) {
        // Password errors (e.g., incorrect password)
        toast.error(`Password Error: ${err.data.password[0]}`);
      } else {
        // Generic error message if no specific error is found
        toast.error("Login Failed. Please try again.");
      }
    }
    setSubmitting(false);
  };
  

  return (
    <div className="container-fluid">
      <div className="w-100 overflow-hidden position-relative flex-wrap d-block vh-100">
        <div className="row">
          <div className="col-lg-6">
            <div className="login-background d-lg-flex align-items-center justify-content-center d-lg-block d-none flex-wrap vh-100 overflow-auto" style={{ backgroundColor: '#506EE4', position: 'relative' }}>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <img src="/images/AIkid.png" alt="Autism awareness" />
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12">
            <div className="row justify-content-center align-items-center vh-100 overflow-auto flex-wrap">
              <div className="col-md-8 mx-auto p-4">
                <Formik
                  initialValues={{
                    email: '',
                    password: '',
                    remember: false,
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting, values, handleChange, handleBlur }) => (
                    <Form>
                      <div className="card">
                        <div className="card-body pb-3">
                          <div className="mb-4">
                            <h2 className="mb-2">Welcome</h2>
                            <p className="mb-0">Please enter your details to sign in</p>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Email Address or UserName</label>
                            <div className="input-icon mb-3 position-relative">
                              <Field
                                placeholder="Enter your email address or Username"
                                type="email"
                                name="email"
                                className="form-control"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                              />
                              <ErrorMessage name="email" component="div" className="invalid-feedback" />
                              <span className="input-icon-addon">
                                <i className="ti ti-mail" />
                              </span>
                            </div>

                            <label className="form-label">Password</label>
                            <div className="pass-group mb-3 position-relative">
                              <Field
                                value={values.password}
                                placeholder="Enter your password"
                                type={isPasswordVisible ? "text" : "password"}
                                name="password"
                                className="pass-input form-control"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                              />
                              <ErrorMessage name="password" component="div" className="invalid-feedback" />
                              <span
                                className={`ti toggle-password ${isPasswordVisible ? "ti-eye" : "ti-eye-off"}`}
                                onClick={togglePasswordVisibility}
                                aria-label={isPasswordVisible ? "Hide password" : "Show password"} // Accessibility
                              />
                            </div>
                          </div>
                          <div className="form-wrap form-wrap-checkbox">
                            <div className="d-flex align-items-center">
                              <div className="form-check form-check-md mb-0">
                                <Field
                                  type="checkbox"
                                  name="remember"
                                  className="form-check-input mt-0"
                                />
                              </div>
                              <p className="ms-1 mb-0">Remember Me</p>
                            </div>
                            <ErrorMessage name="remember" component="div" className="invalid-feedback" />
                            <div className="text-end">
                              <Link to="/forgot-password" className="link-danger">
                                Forgot Password?
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 pt-0">
                          <div className="mb-3">
                            <button
                              type="submit"
                              className="btn btn-primary w-100"
                              disabled={isSubmitting}
                            >
                              Sign In
                            </button>
                          </div>
                          <div className="text-center">
                            <h6 className="fw-normal text-dark mb-0">
                              Don’t have an account?{" "}
                              <Link to="/register" className="hover-a">
                                Create Account
                              </Link>
                            </h6>
                          </div>
                        </div>
                        <div className="mt-5 text-center">
        <p className="mb-0">Copyright © {new Date().getFullYear()} - SerenityTrack <FaHeart style={{ color: 'red' }} /></p>
      </div></div>
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

export default Login;
