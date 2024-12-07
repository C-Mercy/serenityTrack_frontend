import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useCreateBehaviorMutation } from '../slices/behaviorSlice'; // Assuming you have a behavior slice

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
      // Create the behavior and capture the returned ID
      const createdBehavior = await createBehavior({ ...behaviorData, episode: episodeId, profile: profileId }).unwrap();

      // Pass the behavior ID back to the parent via nextStep
      nextStep(createdBehavior.id); // Send behaviorId back to parent
    } catch (err) {
      console.error('Error creating behavior:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField label="Behavior Type" name="behavior_type" value={behaviorData.behavior_type} onChange={handleChange} required />
      <TextField label="Description" name="description" value={behaviorData.description} onChange={handleChange} required />
      <TextField label="Frequency" name="frequency" value={behaviorData.frequency} onChange={handleChange} required />
      <TextField label="Context" name="context" value={behaviorData.context} onChange={handleChange} required />
      <Button type="submit">Next</Button>
    </form>
  );
};

export default BehaviorStep;
