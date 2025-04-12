import React, { useContext} from 'react'
import { useState } from 'react'
import { Layout, Mycontext } from '../../App'
import Sidebar from '../../Components/Sidebar'
import Header from '../../Components/Header'
import { Button } from '@mui/material'
import { IoMdAdd } from "react-icons/io";
import { Search } from '@mui/icons-material';
import { InputAdornment} from '@mui/material';

import {
  TextField,Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Checkbox, MenuItem, Select, FormControl, InputLabel,Tooltip,
    Typography, Avatar, Box, IconButton, TablePagination, LinearProgress
  } from '@mui/material';
  import { Edit, Delete, Visibility } from '@mui/icons-material';


  const sliderData = [
    {
      id: 1,
      image: "/images/image five.jpg",
      action: `
        <button class="edit-btn"><i class="fas fa-edit"></i></button>
        <button class="delete-btn"><i class="fas fa-trash-alt"></i></button>
      `,
    },
    {
      id: 2,
      image: "/images/image one.jpg",
      action: `
        <button class="edit-btn"><i class="fas fa-edit"></i></button>
        <button class="delete-btn"><i class="fas fa-trash-alt"></i></button>
      `,
    },
    {
      id: 3,
      image: "/images/image two .jpg",
      action: `
        <button class="edit-btn"><i class="fas fa-edit"></i></button>
        <button class="delete-btn"><i class="fas fa-trash-alt"></i></button>
      `,
    },
    {
      id: 4,
      image:"/images/imagetwo.jpg",
      action: `
        <button class="edit-btn"><i class="fas fa-edit"></i></button>
        <button class="delete-btn"><i class="fas fa-trash-alt"></i></button>
      `,
    },
  ];
  
  
const HomeSlider = () => {
    const [categoryFilter, setCategoryFilter] = React.useState('');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const context=useContext(Mycontext)
  
    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);

      
    };
    return (
      <Box sx={{ padding: 3 }}>
      {/* Top Global Buttons */}
      <Box display="flex" justifyContent="flex-end" gap={2} mb={2}>
        <Button variant="contained" color="success">Export</Button>
        <Button variant="contained" color="primary" onClick={()=>context.setisScreenPanelopen({
          open:true,
          model:'Add Home Slide'
        })}>Add Home Slide</Button>
      </Box>

      {/* Main Table Card */}
      <Paper sx={{ padding: 3 }}>
        {/* Title and Search */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box>
            <Typography variant="h6">
              Home Slide Banner <Typography component="span" color="text.secondary">(Material UI Table)</Typography>
            </Typography>
            
          </Box> 
          </Box>
    
          
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: '#f5f5f5', padding: 2, borderRadius: 2 }}>
                <TableRow>
                  <TableCell padding="checkbox"><Checkbox/></TableCell>  
                  <TableCell sx={{ fontWeight: 'bold' }}>Image</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sliderData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <TableRow key={row.id}>
                    <TableCell padding="checkbox"><Checkbox /></TableCell>
                    <TableCell>
           <Box display="flex" alignItems="center" gap={2}>
           <Box
  sx={{
    width: 500,
    height: 100,
    overflow: 'hidden',
    borderRadius: '4px',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.3s ease-in-out',
    },
    '&:hover img': {
      transform: 'scale(1.1)',
    },
  }}
>
  <img src={row.image} alt="slider" />
</Box>

        </Box>
     </TableCell>

                  
                    <TableCell>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
             <Tooltip title="View">
             <Visibility sx={{ cursor: 'pointer' }} fontSize="small"/>
             </Tooltip>
            <Tooltip title="Edit">
            <Edit sx={{ cursor: 'pointer' }} fontSize="small"/>
            </Tooltip>
           <Tooltip title="Delete">
           <Delete sx={{ cursor: 'pointer', color: 'red' }} fontSize="small"/>
           </Tooltip>
          </Box>
         </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
    
            {/* Pagination */}
            <TablePagination
              component="div"
              count={sliderData.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Paper>
        </Box>
      );
    };
  
  export default HomeSlider;
