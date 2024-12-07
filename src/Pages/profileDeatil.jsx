import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchProfileByIdQuery } from "../slices/profileSlice";
import axios from 'axios';
import {
  Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Box, CircularProgress, IconButton, Menu, MenuItem, Button, TextField, TablePagination
} from '@mui/material';
import { Edit, Delete, MoreVert, Sort } from '@mui/icons-material';
import { toast } from 'react-toastify';
import RecordEpisode from "../components/episodeWizard";

const ProfileDetail = () => {
  const { profileId } = useParams();
  const { data: profile, error, isLoading } = useFetchProfileByIdQuery(profileId);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editType, setEditType] = useState(null); // Type to edit: episode, trigger, behavior, or intervention
  const [openEditModal, setOpenEditModal] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleMenuOpen = (event, item, type) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
    setEditType(type); // Specify the type (episode, trigger, behavior, or intervention)
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedItem(null);
    setEditType(null);
  };

  const handleEdit = () => {
    setOpenEditModal(true);
    handleMenuClose();
  };

  const handleDelete = async () => {
    try {
      if (selectedItem) {
        await axios.delete(`http://localhost:8000/api/v1/${editType}/delete/${selectedItem.id}`);
        toast.success('Item deleted successfully');
      }
    } catch (err) {
      toast.error('Failed to delete item');
    }
    handleMenuClose();
  };

  const filterEpisodes = (episodes) => {
    return episodes.filter((episode) => {
      const episodeDate = new Date(episode.episode_date);
      return (
        (!startDate || episodeDate >= new Date(startDate)) &&
        (!endDate || episodeDate <= new Date(endDate)) &&
        (episode.title.toLowerCase().includes(searchTerm.toLowerCase()) || episode.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });
  };

  const sortEpisodes = (episodes) => {
    return episodes.sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      return sortOrder === 'asc' ? titleA.localeCompare(titleB) : titleB.localeCompare(titleA);
    });
  };

  const handlePageChange = (event, newPage) => setPage(newPage);

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page
  };

  const filteredAndSortedEpisodes = sortEpisodes(filterEpisodes(profile?.episodes || []));
  const paginatedEpisodes = filteredAndSortedEpisodes.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  if (isLoading) return <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh"><CircularProgress /></Box>;
  if (error) return <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh"><Typography variant="h6" color="error">Error loading profile</Typography></Box>;

  return (
    <Box padding={2} sx={{ backgroundColor: '#f0f8ff', color: '#00008b' }}>
      {/* Profile Information */}
      <Card sx={{ marginBottom: 4, padding: 2 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {profile.first_name} {profile.last_name}
          </Typography>
          <Typography variant="body1"><strong>Date of Birth:</strong> {profile.date_of_birth}</Typography>
          <Typography variant="body1"><strong>Diagnosis Date:</strong> {profile.diagnosis_date}</Typography>
        </CardContent>
      </Card>

      {/* Filters and Sort */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Start Date"
          type="date"
          variant="outlined"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="End Date"
          type="date"
          variant="outlined"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          style={{ marginRight: '10px' }}
        />
        <Button onClick={() => setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))}>
          <Sort /> Sort {sortOrder === 'asc' ? 'Z-A' : 'A-Z'}
        </Button>
      </Box>

      {/* Episodes Table */}
      <TableContainer component={Paper} sx={{ marginBottom: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Episode Title</strong></TableCell>
              <TableCell><strong>Episode Description</strong></TableCell>
              <TableCell><strong>Episode Date</strong></TableCell>
              <TableCell><strong>Triggers</strong></TableCell>
              <TableCell><strong>Behaviors</strong></TableCell>
              <TableCell><strong>Interventions</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedEpisodes.map((episode) => (
              <TableRow key={episode.id}>
                <TableCell>{episode.title}</TableCell>
                <TableCell>{episode.description}</TableCell>
                <TableCell>{episode.episode_date}</TableCell>
                <TableCell>
                  {profile.triggers.filter((trigger) => trigger.episode === episode.id).map((trigger) => (
                    <Box key={trigger.id} mb={2}>
                      <Typography variant="body2"><strong>Type:</strong> {trigger.trigger_type}</Typography>
                      <Typography variant="body2"><strong>Description:</strong> {trigger.description}</Typography>
                      <IconButton onClick={(event) => handleMenuOpen(event, trigger, 'trigger')}><MoreVert /></IconButton>
                    </Box>
                  ))}
                </TableCell>
                <TableCell>
                  {profile.behaviors.filter((behavior) => behavior.episode === episode.id).map((behavior) => (
                    <Box key={behavior.id} mb={2}>
                      <Typography variant="body2"><strong>Type:</strong> {behavior.behavior_type}</Typography>
                      <Typography variant="body2"><strong>Description:</strong> {behavior.description}</Typography>
                      <IconButton onClick={(event) => handleMenuOpen(event, behavior, 'behavior')}><MoreVert /></IconButton>
                    </Box>
                  ))}
                </TableCell>
                <TableCell>
                  {profile.interventions.filter((intervention) => intervention.episode === episode.id).map((intervention) => (
                    <Box key={intervention.id} mb={2}>
                      <Typography variant="body2"><strong>Type:</strong> {intervention.intervention_type}</Typography>
                      <Typography variant="body2"><strong>Description:</strong> {intervention.description}</Typography>
                      <IconButton onClick={(event) => handleMenuOpen(event, intervention, 'intervention')}><MoreVert /></IconButton>
                    </Box>
                  ))}
                </TableCell>
                <TableCell>
                  <IconButton onClick={(event) => handleMenuOpen(event, episode, 'episode')}>
                    <MoreVert />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredAndSortedEpisodes.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />

      {openEditModal && (
        <RecordEpisode
          profileId={profileId}
          episodeData={selectedItem}
          type={editType}
          onClose={() => setOpenEditModal(false)}
        />
      )}
    </Box>
  );
};

export default ProfileDetail;
