import React, { useState } from 'react';
import { TextField, Button, Grid, FormControl, InputLabel } from '@mui/material';
import { useCreateBehaviorMutation } from '../slices/behaviorSlice';
import {toast} from "react-toastify";

const BehaviorStep = ({ nextStep, profileId, episodeId }) => {
  const [behaviorData, setBehaviorData] = useState({
    behavior_type: '',
    description: '',
    frequency: '',
    context: '',
  });

  const [createBehavior] = useCreateBehaviorMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBehaviorData((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const createdBehavior = await createBehavior({ ...behaviorData, episode: episodeId, profile: profileId }).unwrap();
    nextStep(createdBehavior.id); // Send behaviorId back to parent
    toast.success('Behavior created successfully!');
  } catch (err) {
    console.error('Error creating behavior:', err);
    toast.error('Failed to create behavior. Please try again.');
  }
};


  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="behavior_type-label">Behavior Type</InputLabel>
            <TextField
              label="Behavior Type"
              name="behavior_type"
              value={behaviorData.behavior_type}
              onChange={handleChange}
              required
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            name="description"
            value={behaviorData.description}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Frequency"
            name="frequency"
            inputMode={"numeric"}
            InputProps={{ inputProps: { min: 0 } }}
            value={behaviorData.frequency}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Context"
            name="context"

            value={behaviorData.context}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Next
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default BehaviorStep;