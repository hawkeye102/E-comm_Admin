import React, { useContext, useEffect, useState } from 'react';
import { Layout, Mycontext } from '../../App';
import {
  Button, Box, Typography, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, TablePagination, Checkbox, Tooltip
} from '@mui/material';

import { IconButton } from '@mui/material';

import { Visibility, Edit, Delete } from '@mui/icons-material';
import axios from 'axios';
import { fetchDataFromApi } from '../../../utils/api';
import { deleteData } from '../../../utils/api';

const HomeSlider = () => {
  const[sliderdata,setSlidertdata]=useState()
  const [slides, setSlides] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const context = useContext(Mycontext);

   useEffect(() => {
        if (!context.isScreenPanelopen.open) {
          refreshSliderList();
        }
      }, [context.isScreenPanelopen.open]);
    
      const refreshSliderList = () => {
        fetchDataFromApi('/api/homeslider')
          .then((res) => {
            if (res && res.data) {
 setSlides(res.data);
} else {
  console.warn("Slides not found in API response");
}

          })
          .catch((err) => console.error("API Fetch Error:", err));
      };

  const deleteSlide = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this slide?");
    if (!confirm) return;

    try {
      await deleteData(`/api/homeslider/${id}`);
      refreshSliderList();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete slide.");
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      {/* Top Buttons */}
      <Box display="flex" justifyContent="flex-end" gap={2} mb={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            context.setisScreenPanelopen({ open: true, model: 'Add Home Slide' })
          }
        >
          Add Home Slide
        </Button>
      </Box>

      {/* Table Display */}
      <Paper sx={{ padding: 3 }}>
        <Typography variant="h6" mb={2}>Home Slider List</Typography>

        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Images</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {slides.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">No slides found.</TableCell>
                </TableRow>
              ) : (
                slides
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((slide, index) => (
                    <TableRow key={slide._id}>
                      <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                      <TableCell>
                       <Box display="flex" gap={1}>
  {slide.images?.map((img, i) => (
    <Box
      key={i}
      component="img"
      src={img}
      alt="slide"
      width={500}
      height={150}
      sx={{
        objectFit: 'cover',
        borderRadius: 2,
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
          zIndex: 1,
          boxShadow: 3,
        },
      }}
    />
  ))}
</Box>

                      </TableCell>
                      <TableCell>
                        <Box display="flex" gap={1}>
                          <Tooltip title="View">
                            <IconButton size="small">
                              <Visibility fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton
                              size="small"
                              onClick={() =>
                                context.setisScreenPanelopen({
                                  open: true,
                                  model: 'Edit Home Slide',
                                  id: slide._id,
                                  editData: slide,
                                })
                              }
                            >
                              <Edit fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              size="small"
                              onClick={() => deleteSlide(slide._id)}
                            >
                              <Delete fontSize="small" color="error" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          <TablePagination
            component="div"
            count={slides.length}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
          />
        </TableContainer>
      </Paper>
    </Box>
  );
};


export default HomeSlider;
