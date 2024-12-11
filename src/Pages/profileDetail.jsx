import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchProfileByIdQuery } from "../slices/profileSlice";
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Button,
  TextField,
  TablePagination
} from '@mui/material';
import {Edit, Delete, MoreVert, Sort, Person} from '@mui/icons-material';
import { toast } from 'react-toastify';
import ReusableModal from "../components/reusableModal";
import Navbar from "../components/header";

const ProfileDetail = () => {
  const { profileId } = useParams();
  const { data: profile, error, isLoading, refetch } = useFetchProfileByIdQuery(profileId);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editType, setEditType] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleMenuOpen = (event, item, type) => {
    event.stopPropagation(); // Prevent event propagation
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
    setEditType(type);
    setOpenModal(true); // Open modal directly
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedItem(null);
    setEditType(null);
    setOpenModal(false); // Close modal
  };

  const handleDelete = async () => {
    try {
      if (selectedItem) {
        await axios.delete(`http://localhost:8000/api/v1/${editType}/delete/${selectedItem.id}`);
        toast.success('Item deleted successfully');
        refetch(); // Refresh data after deletion
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
        (episode.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
         episode.description.toLowerCase().includes(searchTerm.toLowerCase()))
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
    setPage(0);
  };

  if (isLoading) return <CircularProgress />;

  if (error) return <Typography color="error">Error loading profile</Typography>;

  // Filter and sort episodes
  const filteredAndSortedEpisodes = sortEpisodes(filterEpisodes(profile?.episodes || []));

  // Paginate episodes
  const paginatedEpisodes = filteredAndSortedEpisodes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
     <> <Navbar />
    <Box padding={2}>
      <Card sx={{ marginBottom: 4 }}>
  <CardContent>
    <Box display="flex" alignItems="center">
      <Person sx={{ fontSize: 40, marginRight: 2 }} /> {/* Icon with size and margin */}
      <Typography variant="h4" gutterBottom>
        {profile.first_name} {profile.last_name}
      </Typography>
    </Box>
    <Typography variant="body1" sx={{ marginTop: 1 }}>
      <strong>Date of Birth:</strong> {profile.date_of_birth}
    </Typography>
    <Typography variant="body1">
      <strong>Diagnosis Date:</strong> {profile.diagnosis_date}
    </Typography>
    <Typography variant="body1">
      <strong>Severity:</strong> {profile.severity}
    </Typography>
    <Typography variant="body1">
      <strong>Communication Level:</strong> {profile.communication_level}
    </Typography>
  </CardContent>
</Card>

      {/* Search and Sort Functionality */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <TextField label="Search" variant="outlined" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ marginRight: '10px' }} />
        <TextField label="Start Date" type="date" variant="outlined" value={startDate} onChange={(e) => setStartDate(e.target.value)} InputLabelProps={{ shrink: true }} style={{ marginRight: '10px' }} />
        <TextField label="End Date" type="date" variant="outlined" value={endDate} onChange={(e) => setEndDate(e.target.value)} InputLabelProps={{ shrink: true }} style={{ marginRight: '10px' }} />
        <Button onClick={() => setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))}>
          <Sort /> Sort {sortOrder === 'asc' ? 'Z-A' : 'A-Z'}
        </Button>
      </Box>

      {/* Episodes Table */}
      <TableContainer component={Paper}>
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

                {/* Triggers */}
                <TableCell>
                  {profile.triggers.filter(trigger => trigger.episode === episode.id).map(trigger => (
                    <Box key={trigger.id} mb={2}>
                      <Typography variant="body2"><strong>Type:</strong> {trigger.trigger_type}</Typography>
                      <Typography variant="body2"><strong>Description:</strong> {trigger.description}</Typography>
                      <Button onClick={(event) => handleMenuOpen(event, trigger, 'trigger')}>View</Button>
                    </Box>
                  ))}
                </TableCell>

                {/* Behaviors */}
                <TableCell>
                  {profile.behaviors.filter(behavior => behavior.episode === episode.id).map(behavior => (
                    <Box key={behavior.id} mb={2}>
                      <Typography variant="body2"><strong>Type:</strong> {behavior.behavior_type}</Typography>
                      <Typography variant="body2"><strong>Description:</strong> {behavior.description}</Typography>
                      <Button onClick={(event) => handleMenuOpen(event, behavior, 'behavior')}>View</Button>
                    </Box>
                  ))}
                </TableCell>

                {/* Interventions */}
                <TableCell>
                  {profile.interventions.filter(intervention => intervention.episode === episode.id).map(intervention => (
                    <Box key={intervention.id} mb={2}>
                      <Typography variant="body2"><strong>Type:</strong> {intervention.intervention_type}</Typography>
                      <Typography variant="body2"><strong>Description:</strong> {intervention.description}</Typography>
                      <Button onClick={(event) => handleMenuOpen(event, intervention, 'intervention')}>View</Button>
                    </Box>
                  ))}
                </TableCell>

                {/* Actions */}

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredAndSortedEpisodes.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />

      {/* Reusable Modal for Editing */}
      {openModal && (
        <ReusableModal
          open={openModal}
          onClose={handleMenuClose}
          item={selectedItem}
          type={editType}
          onSave={() => refetch()} // Refresh data after save
          onDelete={() => refetch()} // Refresh data after delete
        />
      )}
    </Box>
       </>
  );
};

export default ProfileDetail;