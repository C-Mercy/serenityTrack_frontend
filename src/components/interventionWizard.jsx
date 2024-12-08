import React, { useState } from 'react';
import { TextField, Button, Grid, FormControl, InputLabel } from '@mui/material';
import { useCreateInterventionMutation } from '../slices/interventionSlice';
import {toast} from "react-toastify";

const InterventionStep = ({ onComplete, profileId, episodeId, behaviorId }) => {
  const [interventionData, setInterventionData] = useState({
    intervention_type: '',
    description: '',
    effectiveness: '',
  });

  const [createIntervention] = useCreateInterventionMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInterventionData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!interventionData.intervention_type || !interventionData.description || !interventionData.effectiveness) {
      alert("Please fill all the required fields.");
      return;
    }

    try {
      await createIntervention({
        ...interventionData,
        episode: episodeId,
        profile: profileId,
        behavior: behaviorId
      }).unwrap();
      toast.success('Intervention created successfully!');
      
      onComplete(); // Notify completion of episode recording
    } catch (err) {
      console.error('Error creating intervention:', err);
      toast.error('Intervention creation unsuccessful. Please try again!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="intervention_type-label">Intervention Type</InputLabel>
            <TextField
              label="Intervention Type"
              name="intervention_type"
              value={interventionData.intervention_type}
              onChange={handleChange}
              required
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            name="description"
            value={interventionData.description}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Effectiveness"
            name="effectiveness"
            value={interventionData.effectiveness}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Finish
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default InterventionStep;