import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import axios from "axios";
import { toast } from 'react-toastify'; // Import toast

const CreateProfile = ({ isOpen, onClose, userId, profile = null, refreshProfiles }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    diagnosis_date: '',
    severity: '',
    communication_level: '',
  });

  useEffect(() => {
    console.log('userId:', userId);
  }, [userId]);

  useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        date_of_birth: profile.date_of_birth || '',
        diagnosis_date: profile.diagnosis_date || '',
        severity: profile.severity || '',
        communication_level: profile.communication_level || '',
      });
    } else {
      setFormData({
        first_name: '',
        last_name: '',
        date_of_birth: '',
        diagnosis_date: '',
        severity: '',
        communication_level: '',
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const profileDataWithUserId = {
      ...formData,
      user_id: userId,  // Send the user_id in the request body
    };

    try {
      let response;
      if (profile) {
        // If profile exists, update it
        response = await axios.put(`http://localhost:8000/api/v1/user/${userId}/profile/${profile.id}/update/`, profileDataWithUserId);
      } else {
        // If no profile, create a new one
        response = await axios.post('http://localhost:8000/api/v1/create_profile', profileDataWithUserId);
      }
      console.log(response.data);

      // Show success toast
      toast.success(profile ? 'Profile updated successfully!' : 'Profile created successfully!');
      onClose(); // Close the modal after submission
      if (refreshProfiles) {
        refreshProfiles(); // Refresh the list of profiles after update or creation
      }
    } catch (err) {
      console.error('Failed to create or update profile:', err);
      toast.error('An error occurred. Please try again.');
    }
  };

  const handleDelete = async () => {
    if (!profile || !profile.id) {
      toast.error('Profile not found!');
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:8000/api/v1/profile/delete/${profile.id}`);
      console.log(response.data);

      toast.success('Profile deleted successfully!');
      onClose(); // Close the modal after deletion
      if (refreshProfiles) {
        refreshProfiles(); // Refresh the profile list after deletion
      }
    } catch (err) {
      console.error('Failed to delete profile:', err);
      toast.error('An error occurred while deleting the profile.');
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose} aria-labelledby="create-profile-modal">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: '10px',
        }}
      >
        <Typography variant="h6" component="h2" mb={2}>
          {profile ? 'Edit Profile' : 'Create Profile'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="First Name"
            name="first_name"
            fullWidth
            value={formData.first_name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            label="Last Name"
            name="last_name"
            fullWidth
            value={formData.last_name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            label="Date of Birth"
            name="date_of_birth"
            type="date"
            fullWidth
            value={formData.date_of_birth}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            label="Diagnosis Date"
            name="diagnosis_date"
            type="date"
            fullWidth
            value={formData.diagnosis_date}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            label="Severity"
            name="severity"
            fullWidth
            value={formData.severity}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            label="Communication Level"
            name="communication_level"
            fullWidth
            value={formData.communication_level}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button onClick={onClose} color="secondary" variant="outlined">
              Cancel
            </Button>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={false} // Disable if necessary
            >
              {profile ? 'Update Profile' : 'Create Profile'}
            </Button>
          </Box>
        </form>

        {profile && (
          <Box mt={2} display="flex" justifyContent="center">
            <Button
              onClick={handleDelete}
              color="error"
              variant="outlined"
              sx={{ width: '100%' }}
            >
              Delete Profile
            </Button>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default CreateProfile;
