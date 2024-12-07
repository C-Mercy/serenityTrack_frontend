// InterventionStep.js
import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useCreateInterventionMutation } from '../slices/interventionSlice'; // Assuming you have an intervention slice

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
    console.log(behaviorId,"beg")

    onComplete(); // Notify completion of episode recording
  } catch (err) {
    console.error('Error creating intervention:', err);
  }
};


  return (
    <form onSubmit={handleSubmit}>
      <TextField label="Intervention Type" name="intervention_type" value={interventionData.intervention_type} onChange={handleChange} required />
      <TextField label="Description" name="description" value={interventionData.description} onChange={handleChange} required />
      <TextField label="Effectiveness" name="effectiveness" value={interventionData.effectiveness} onChange={handleChange} required />
      <Button type="submit">Finish</Button>
    </form>
  );
};

export default InterventionStep;
