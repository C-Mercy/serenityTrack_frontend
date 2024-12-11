import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from "axios";
import { toast } from 'react-toastify';

const severityOptions = [
  { value: 'Low', label: 'low' },
  { value: 'Medium', label: 'medium' },
  { value: 'High', label: 'high' },
];

const communicationLevels = [
  { value: 'Verbal', label: 'Verbal' },
  { value: 'Non-verbal', label: 'Non-verbal' },
  { value: 'Limited verbal', label: 'Limited verbal' },
  { value: 'Augmentative and Alternative Communication (AAC)', label: 'AAC' },
];


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
      user_id: userId,
      user:userId
    };

    try {
      let response;
      if (profile) {
        response = await axios.put(`http://localhost:8000/api/v1/user/${userId}/profile/${profile.id}/update/`, profileDataWithUserId);
      } else {
        response = await axios.post('http://localhost:8000/api/v1/create_profile', profileDataWithUserId);
      }
      toast.success(profile ? 'Profile updated successfully!' : 'Profile created successfully!');
      onClose();
      if (refreshProfiles) {
        refreshProfiles();
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
      await axios.delete(`http://localhost:8000/api/v1/profile/delete/${profile.id}`);
      toast.success('Profile deleted successfully!');
      onClose();
      if (refreshProfiles) {
        refreshProfiles();
      }
      window.location.reload();
    } catch (err) {
      console.error('Failed to delete profile:', err);
      toast.error('An error occurred while deleting the profile.');
    }
  };
    const today = new Date().toISOString().split('T')[0];

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
            inputProps={{ max: today }}
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
            inputProps={{ max: today }}
          />

          {/* Severity Dropdown */}
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="severity-label">Severity</InputLabel>
            <Select
              labelId="severity-label"
              name="severity"
              value={formData.severity}
              onChange={handleChange}
              label="Severity"
              required
            >
              {severityOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Communication Level Dropdown */}
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="communication-level-label">Communication Level</InputLabel>
            <Select
              labelId="communication-level-label"
              name="communication_level"
              value={formData.communication_level}
              onChange={handleChange}
              label="Communication Level"
              required
            >
              {communicationLevels.map((level) => (
                <MenuItem key={level.value} value={level.value}>
                  {level.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box mt={2} display="flex" justifyContent="space-between">
            <Button onClick={onClose} color="secondary" variant="outlined">
              Cancel
            </Button>
            <Button type="submit" color="primary" variant="contained">
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