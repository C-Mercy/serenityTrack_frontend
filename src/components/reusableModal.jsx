import React, { useState } from 'react';
import { Modal, Box, Typography, Button, TextField, CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';

const ReusableModal = ({ open, onClose, item, type, onSave, onDelete }) => {
  const [formData, setFormData] = useState(item || {});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const url = `http://localhost:8000/api/v1/${type}/update/${item.id}`;
      await axios.put(url, formData);
      toast.success(`${type} updated successfully`);
      onSave();
    } catch (err) {
      toast.error(`Failed to update ${type}`);
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const url = `http://localhost:8000/api/v1/${type}/delete/${item.id}`;
      await axios.delete(url);
      toast.success(`${type} deleted successfully`);
      onDelete();
    } catch (err) {
      toast.error(`Failed to delete ${type}`);
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  const fields = {
    trigger: ['trigger_type', 'description', 'severity', 'management_strategy'],
    behavior: ['behavior_type', 'description', 'frequency', 'context'],
    intervention: ['intervention_type', 'description', 'effectiveness'],
  }[type];

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ padding: 4, background: '#fff', margin: '10% auto', width: '50%', borderRadius: '8px' }}>
        <Typography variant="h6" gutterBottom>
          {item ? `Edit ${type}` : `Add New ${type}`}
        </Typography>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            {fields.map((field) => (
              <TextField
                key={field}
                label={field.replace('_', ' ').toUpperCase()}
                name={field}
                value={formData[field] || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            ))}
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button variant="outlined" color="secondary" onClick={handleDelete}>
                Delete
              </Button>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default ReusableModal;
