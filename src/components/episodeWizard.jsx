import React, { useState } from 'react';
import StepWizard from 'react-step-wizard';

const RecordEpisodeWizard = ({ profileId, onClose }) => {
  const [data, setData] = useState({
    trigger: '',
    behavior: '',
    intervention: '',
  });

  const handleChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // API call to save the episode
    console.log({ profileId, ...data });
    alert('Episode recorded successfully!');
    onClose(); // Close wizard after submission
  };

  return (
    <div className="wizard-overlay">
      <div className="wizard-content">
        <h2>Record Episode for Profile ID: {profileId}</h2>
        <StepWizard>
          <Step1 data={data} handleChange={handleChange} />
          <Step2 data={data} handleChange={handleChange} />
          <Step3 data={data} handleSubmit={handleSubmit} />
        </StepWizard>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

const Step1 = ({ data, handleChange }) => (
  <div>
    <h2>Step 1: Record Trigger</h2>
    <input
      type="text"
      value={data.trigger}
      onChange={(e) => handleChange('trigger', e.target.value)}
      placeholder="Describe the trigger"
    />
  </div>
);

const Step2 = ({ data, handleChange }) => (
  <div>
    <h2>Step 2: Record Behavior</h2>
    <input
      type="text"
      value={data.behavior}
      onChange={(e) => handleChange('behavior', e.target.value)}
      placeholder="Describe the behavior"
    />
  </div>
);

const Step3 = ({ data, handleSubmit }) => (
  <div>
    <h2>Step 3: Record Intervention</h2>
    <input
      type="text"
      value={data.intervention}
      onChange={(e) => handleChange('intervention', e.target.value)}
      placeholder="Describe the intervention"
    />
    <button onClick={handleSubmit}>Submit</button>
  </div>
);

export default RecordEpisodeWizard;
