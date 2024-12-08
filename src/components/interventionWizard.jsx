import React, { useState } from 'react';
import {TextField, Button, Grid, FormControl, InputLabel, MenuItem, Select} from '@mui/material';
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
          <FormControl fullWidth required>
            <InputLabel id="intervention_type-label">Intervention Type</InputLabel>
            <Select
              labelId="intervention_type-label"
              name="intervention_type"
              value={interventionData.intervention_type}
              onChange={handleChange}
              label="Intervention Type"
            >
              <MenuItem value="Calming Down">Calming Down</MenuItem>
              <MenuItem value="Giving Something Comforting">Giving Something Comforting</MenuItem>
              <MenuItem value="Hugging">Hugging</MenuItem>
              <MenuItem value="Distraction with Favorite Activity">Distraction with Favorite Activity</MenuItem>
              <MenuItem value="Using Visual Aids">Using Visual Aids</MenuItem>
              <MenuItem value="Deep Pressure Techniques">Deep Pressure Techniques</MenuItem>
              <MenuItem value="Soft Music or White Noise">Soft Music or White Noise</MenuItem>
            </Select>
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