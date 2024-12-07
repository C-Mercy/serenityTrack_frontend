import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditItemModal = ({ open, onClose, selectedItem }) => {
    const [formData, setFormData] = useState(selectedItem);

    useEffect(() => {
        setFormData(selectedItem);
    }, [selectedItem]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            await axios.put(`http://localhost:8000/api/v1/${formData.type}/update/${formData.id}`, formData);
            toast.success('Item updated successfully');
            onClose(); // Close modal after successful update
        } catch (error) {
            toast.error('Failed to update item');
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ padding: 4 }}>
                <h2>Edit {formData.type}</h2>
                <TextField
                    name="description"
                    label="Description"
                    value={formData.description}
                    onChange={handleChange}
                    fullWidth
                    required
                />
                {/* Add other fields based on the type of item being edited */}
                {formData.type === 'trigger' && (
                    <>
                        <TextField
                            name="trigger_type"
                            label="Trigger Type"
                            value={formData.trigger_type}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <TextField
                            name="severity"
                            label="Severity"
                            value={formData.severity}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <TextField
                            name="management_strategy"
                            label="Management Strategy"
                            value={formData.management_strategy}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </>
                )}
                {formData.type === 'behavior' && (
                    <>
                        <TextField
                            name="behavior_type"
                            label="Behavior Type"
                            value={formData.behavior_type}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <TextField
                            name="frequency"
                            label="Frequency"
                            value={formData.frequency}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <TextField
                            name="context"
                            label="Context"
                            value={formData.context}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </>
                )}
                {/* Add similar fields for interventions and episodes */}
                <Button onClick={handleSubmit} variant="contained">Update</Button>
            </Box>
        </Modal>
    );
};

export default EditItemModal;