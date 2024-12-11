import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaHeart } from 'react-icons/fa';
import { useCreateUserMutation } from '../slices/userSlice';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [createUser] = useCreateUserMutation(); 
  const navigate = useNavigate();


  // Form validation schema
  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
    user_type: Yup.string().required('User type is required'), // Added user_type
  });

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // Form submission handler
  const handleSubmit = async (values, { setSubmitting }) => {
    const userData = {
      username: values.username,
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      password: values.password,
      user_type: values.user_type, // Added user_type
    };
  
    try {
      // Try to create the user using the createUser function
      await createUser(userData).unwrap(); 
      toast.success("Registration Successful. Login to Continue");
      navigate("/login");
    } catch (error) {
      // If the error contains specific backend messages, display them
      if (error?.data?.username) {
        toast.error(`Username Error: ${error.data.username[0]}`);
      } else if (error?.data?.email) {
        toast.error(`Email Error: ${error.data.email[0]}`);
      } else {
        // Generic error message if no specific error is found
        toast.error("Registration Unsuccessful. Please Try Again");
      }
      console.error("Error creating user:", error);
    } finally {
      setSubmitting(false);
    }
  };
  

  return (
    <div className="container-fluid">
      <div className="w-100 overflow-hidden position-relative flex-wrap d-block vh-100">
        <div className="row">
          <div className="col-lg-6">
            <div className="login-background d-lg-flex align-items-center justify-content-center d-lg-block d-none flex-wrap vh-100 overflow-auto" style={{ backgroundColor: '#FFF5EE', position: 'relative' }}>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <img src="/images/AIkid.png" alt="Autism awareness" style={{height:"92vh",width:"48vw"}} />
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12">
            <div className="row justify-content-center align-items-center vh-100 overflow-auto flex-wrap">
              <div className="col-md-8 mx-auto p-4">
                <Formik
                  initialValues={{
                    username: '',
                    first_name: '',
                    last_name: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    user_type: '', // Initial value for user_type
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
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
                              <label className="form-label">Username</label>
                              <Field type="text" name="username" className="form-control" required />
                              <ErrorMessage name="username" component="div" className="invalid-feedback" />
                              
                              <label className="form-label">Email Address</label>
                              <Field type="email" name="email" className="form-control" required />
                              <ErrorMessage name="email" component="div" className="invalid-feedback" />
                              
                              <label className="form-label">First Name</label>
                              <Field type="text" name="first_name" className="form-control" required />
                              <ErrorMessage name="first_name" component="div" className="invalid-feedback" />

                              <label className="form-label">Last Name</label>
                              <Field type="text" name="last_name" className="form-control" required />
                              <ErrorMessage name="last_name" component="div" className="invalid-feedback" />

                              <label className="form-label">Password</label>
                              <Field type={isPasswordVisible ? "text" : "password"} name="password" className="form-control" required />
                              <ErrorMessage name="password" component="div" className="invalid-feedback" />
                              
                              <label className="form-label">Confirm Password</label>
                              <Field type={isPasswordVisible ? "text" : "password"} name="confirmPassword" className="form-control" required />
                              <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />

                              <label className="form-label">User Type</label>
                              <Field as="select" name="user_type" className="form-control" required>
                                <option value="">Select User Type</option>
                                <option value="autistic">Autistic</option>
                                <option value="parent">Parent</option>
                                <option value="guardian">Guardian</option>
                              </Field>
                              <ErrorMessage name="user_type" component="div" className="invalid-feedback" />
                            </div>
                          </div>
                          <div className="p-4 pt-0">
                            <div className="mb-3">
                              <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
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
