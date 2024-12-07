import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Grid, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useCreateEpisodeMutation } from "../slices/episodeSlice"; // Assuming you have this slice for episodes
import { useCreateTriggerMutation } from "../slices/triggersSlice"; // Your slice for triggers
import TriggerStep from "./triggerWzard";
import BehaviorStep from "./behaviorWizard";
import InterventionStep from "./interventionWizard";

const RecordEpisode = ({ profileId, onClose }) => {
  const [episodeData, setEpisodeData] = useState({
    profile: profileId,
    title: '',
    description: '',
    episode_date: '',
    start_time: '',
    end_time: '',
    severity: '',
  });

  const [createEpisode] = useCreateEpisodeMutation();
  const [createTrigger] = useCreateTriggerMutation(); // Trigger creation mutation
  const [currentStep, setCurrentStep] = useState(0); // Track current step
  const [episodeId, setEpisodeId] = useState(null); // Store created episode ID
  const [behaviorId, setBehaviorId] = useState(null); // Store created behavior ID

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEpisodeData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!episodeData.title || !episodeData.description || !episodeData.episode_date || !episodeData.start_time || !episodeData.end_time) {
      alert("Please fill all the required fields.");
      return;
    }

    try {
      // Step 1: Create the episode
      const episode = await createEpisode(episodeData).unwrap();
      setEpisodeId(episode.id); // Store episode ID

      // Step 2: Proceed to the next step (TriggerStep)
      setCurrentStep(1);
    } catch (err) {
      console.error("Error creating episode:", err);
    }
  };

  const handleTriggerComplete = () => {
    // Move to the next step after Trigger
    setCurrentStep(2);
  };

 const handleBehaviorComplete = (behaviorId) => {
  console.log("Behavior ID in parent component:", behaviorId); // Check if behaviorId is passed correctly

  if (behaviorId) {
    setBehaviorId(behaviorId); // Store behavior ID
    setCurrentStep(3); // Move to InterventionStep
  } else {
    console.error("No behavior ID received.");
  }
};


  const handleInterventionComplete = () => {
    setBehaviorId(behaviorId)
    console.log(behaviorId,"veddd")
    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Record Episode</DialogTitle>
      <DialogContent>
        {currentStep === 0 && (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Title"
                  name="title"
                  value={episodeData.title}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Description"
                  name="description"
                  value={episodeData.description}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Episode Date"
                  type="date"
                  name="episode_date"
                  value={episodeData.episode_date}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Start Time"
                  type="datetime-local"
                  name="start_time"
                  value={episodeData.start_time}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="End Time"
                  type="datetime-local"
                  name="end_time"
                  value={episodeData.end_time}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="severity-label">Severity</InputLabel>
                  <Select
                    labelId="severity-label"
                    name="severity"
                    value={episodeData.severity}
                    onChange={handleChange}
                    label="Severity"
                    required
                  >
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Record Episode
                </Button>
              </Grid>
            </Grid>
          </form>
        )}

        {currentStep === 1 && (
          <TriggerStep profileId={profileId} episodeId={episodeId} nextStep={handleTriggerComplete} />
        )}

        {currentStep === 2 && (
          <BehaviorStep profileId={profileId} episodeId={episodeId} nextStep={handleBehaviorComplete} />
        )}

        {currentStep === 3 && (
          <InterventionStep
            profileId={profileId}
            episodeId={episodeId}
            behaviorId={behaviorId}
            onComplete={handleInterventionComplete}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RecordEpisode;
