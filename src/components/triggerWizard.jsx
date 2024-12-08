// TriggerStep.js
import React, { useState } from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Grid } from '@mui/material';
import { useCreateTriggerMutation} from "../slices/triggersSlice";
import {toast} from "react-toastify";

const TriggerStep = ({ nextStep, profileId, episodeId }) => {
  const [triggerData, setTriggerData] = useState({

    trigger_type: '',
    description: '',
    severity: '',
    management_strategy: '',
  });

  const [createTrigger] = useCreateTriggerMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTriggerData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const trigger = await createTrigger({ ...triggerData, episode: episodeId, profile: profileId }).unwrap();
      nextStep();
      toast.success('Trigger created successfully!');
    } catch (err) {
      console.error('Error creating trigger:', err);
      toast.error('Trigger creation unsuccessful. Try Again!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="trigger_type-label">Trigger Type</InputLabel>
            <Select
              labelId="trigger_type-label"
              name="trigger_type"
              value={triggerData.trigger_type}
              onChange={handleChange}
              label="Trigger Type"
              required
            >
              <MenuItem value="External">External</MenuItem>
              <MenuItem value="Internal">Internal</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {triggerData.trigger_type === 'Other' && (
          <Grid item xs={12}>
            <TextField
              label="Custom Trigger Type"
              name="trigger_type"
              value={triggerData.trigger_type}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <TextField
            label="Description"
            name="description"
            value={triggerData.description}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Severity"
            name="severity"
            value={triggerData.severity}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Management Strategy"
            name="management_strategy"
            value={triggerData.management_strategy}
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

export default TriggerStep;
