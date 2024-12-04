import React, { useEffect, useState } from 'react';
import { FaUser, FaSchool, FaUserMd } from 'react-icons/fa';
import Countdown from 'react-countdown';
import Navbar from "../components/header";
import { useFetchProfilesQuery } from '../slices/profileSlice';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { data: profiles, isLoading, error } = useFetchProfilesQuery({}); // Fetch profiles from the backend
  const navigate = useNavigate();

  // Mock data for the two schools and autism specialists (This should ideally come from the backend)
  const schoolsForAutism = [
    { name: 'School 1', location: 'Nairobi' },
    { name: 'School 2', location: 'Mombasa' }
  ];

  const autismSpecialists = [
    { name: 'Dr. Jane Doe', specialty: 'Autism Specialist' },
    { name: 'Dr. John Smith', specialty: 'Behavior Analyst' }
  ];

  // Handler for profile creation
  const handleCreateProfile = () => {
    navigate('/create-profile'); // Redirect to profile creation page
  };

  // Countdown to World Autism Day (April 2nd)
  const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span>It's World Autism Day!</span>;
    } else {
      return (
        <div>
          <p>{days} Days</p>
          <p>{hours} Hours</p>
          <p>{minutes} Minutes</p>
          <p>{seconds} Seconds</p>
        </div>
      );
    }
  };

  // Inline styles for the components
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    padding: '20px'
  };

  const cardStyle = {
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
  };

  const buttonStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px'
  };

  const buttonHoverStyle = {
    backgroundColor: '#45a049'
  };

  return (
    <div>
      <Navbar />
      <div style={containerStyle}>
        {/* Welcome Back Card */}
        <div style={cardStyle}>
          <h2>Welcome Back, {profiles && profiles.length > 0 ? profiles[0].first_name : 'User'}</h2>
          <div>
            <FaUser size={50} />
            <p>Your Profile</p>
            <button 
              style={buttonStyle}
              onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
              onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
              onClick={handleCreateProfile}>Create Profile</button>
          </div>
        </div>

        {/* Countdown Card to World Autism Day */}
        <div style={cardStyle}>
          <h3>Countdown to World Autism Day</h3>
          <Countdown
            date={new Date('2024-04-02T00:00:00')}
            renderer={countdownRenderer}
          />
        </div>

        {/* Profile Info Card */}
        <div style={cardStyle}>
          <h3>Your Profiles</h3>
          <div>
            {isLoading ? (
              <p>Loading profiles...</p>
            ) : error ? (
              <p>Error loading profiles</p>
            ) : profiles && profiles.length > 0 ? (
              profiles.map(profile => (
                <div key={profile.id}>
                  <p>{profile.first_name} {profile.last_name}</p>
                  <p>{profile.diagnosis_date}</p>
                  <p>{profile.severity}</p>
                </div>
              ))
            ) : (
              <p>No profiles found</p>
            )}
          </div>
        </div>

        {/* Schools for Autism Card */}
        <div style={cardStyle}>
          <h3>Schools for Autism in Kenya</h3>
          <div>
            {schoolsForAutism.map((school, index) => (
              <div key={index}>
                <p>{school.name} - {school.location}</p>
              </div>
            ))}
            <button 
              style={buttonStyle}
              onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
              onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
              onClick={() => navigate('/schools')}>Read More</button>
          </div>
        </div>

        {/* Autism Specialists Card */}
        <div style={cardStyle}>
          <h3>Autism Specialists</h3>
          <div>
            {autismSpecialists.map((specialist, index) => (
              <div key={index}>
                <p>{specialist.name} - {specialist.specialty}</p>
              </div>
            ))}
            <button 
              style={buttonStyle}
              onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
              onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
              onClick={() => navigate('/specialists')}>Read More</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
