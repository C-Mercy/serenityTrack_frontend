import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button, Modal, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, IconButton, Typography
} from '@mui/material';
import { Edit, Delete, AddCircle } from '@mui/icons-material';
import { toast } from 'react-toastify';
import Navbar from "../components/header";

const Sessions = () => {
  const [sessions, setSessions] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    profile: '',
    session_date: '',
    therapist: '',
    notes: '',
    goals: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState(null);

  useEffect(() => {
    // Fetch sessions on component mount
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/session');
      setSessions(response.data);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await updateSession();
    } else {
      await createSession();
    }
  };

  const createSession = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/session/create', formData);
      setSessions((prevSessions) => [...prevSessions, response.data]);
      toast.success('Session created successfully!');
      closeModal();
    } catch (error) {
      console.error('Error creating session:', error);
      toast.error('Failed to create session');
    }
  };

  const updateSession = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/api/v1/session/update/${currentSessionId}`, formData);
      setSessions((prevSessions) => prevSessions.map((session) =>
        session.id === currentSessionId ? response.data : session
      ));
      toast.success('Session updated successfully!');
      closeModal();
    } catch (error) {
      console.error('Error updating session:', error);
      toast.error('Failed to update session');
    }
  };

  const handleEdit = (session) => {
    setFormData({
      profile: session.profile,
      session_date: session.session_date,
      therapist: session.therapist,
      notes: session.notes,
      goals: session.goals
    });
    setCurrentSessionId(session.id);
    setIsEditing(true);
    setOpenModal(true);
  };

  const handleDelete = async (sessionId) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/session/delete/${sessionId}`);
      setSessions((prevSessions) => prevSessions.filter((session) => session.id !== sessionId));
      toast.success('Session deleted successfully!');
    } catch (error) {
      console.error('Error deleting session:', error);
      toast.error('Failed to delete session');
    }
  };

  const closeModal = () => {
    setOpenModal(false);
    setFormData({ profile: '', session_date: '', therapist: '', notes: '', goals: '' });
    setIsEditing(false);
    setCurrentSessionId(null);
  };

  return (
      <><Navbar/>
    <Box padding={4}>
      <Typography variant="h4" gutterBottom>
        Therapy Sessions
      </Typography>
      <Button onClick={() => setOpenModal(true)} startIcon={<AddCircle />} variant="contained" color="primary" sx={{ marginBottom: 2 }}>
        Create New Session
      </Button>

      {/* Sessions Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Profile</TableCell>
              <TableCell>Session Date</TableCell>
              <TableCell>Therapist</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell>Goals</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sessions.map((session) => (
              <TableRow key={session.id}>
                <TableCell>{session.profile}</TableCell>
                <TableCell>{new Date(session.session_date).toLocaleDateString()}</TableCell>
                <TableCell>{session.therapist}</TableCell>
                <TableCell>{session.notes}</TableCell>
                <TableCell>{session.goals}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(session)} color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(session.id)} color="secondary">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for Creating/Editing Session */}
      <Modal open={openModal} onClose={closeModal}>
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: '8px'
        }}>
          <Typography variant="h6" gutterBottom>
            {isEditing ? 'Edit Session' : 'Create New Session'}
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Profile"
              name="profile"
              value={formData.profile}
              onChange={handleFormChange}
              fullWidth
              required
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Session Date"
              name="session_date"
              type="date"
              value={formData.session_date}
              onChange={handleFormChange}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Therapist"
              name="therapist"
              value={formData.therapist}
              onChange={handleFormChange}
              fullWidth
              required
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Notes"
              name="notes"
              value={formData.notes}
              onChange={handleFormChange}
              fullWidth
              required
              multiline
              minRows={3}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Goals"
              name="goals"
              value={formData.goals}
              onChange={handleFormChange}
              fullWidth
              required
              multiline
              minRows={3}
              sx={{ marginBottom: 2 }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginBottom: 2 }}>
              {isEditing ? 'Update Session' : 'Create Session'}
            </Button>
            <Button onClick={closeModal} variant="outlined" color="secondary" fullWidth>
              Cancel
            </Button>
          </form>
        </Box>
      </Modal>
    </Box>
        </>
  );
};

export default Sessions;
