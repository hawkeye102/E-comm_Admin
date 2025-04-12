import React, { useContext} from 'react'
import { useState } from 'react'
import { Layout, Mycontext } from '../../App'
import Sidebar from '../../Components/Sidebar'
import Header from '../../Components/Header'
import { Button } from '@mui/material'
import { IoMdAdd } from "react-icons/io";
import { Search } from '@mui/icons-material';
import { InputAdornment} from '@mui/material';
import { MdMarkEmailRead } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa6";
import { FaRegCalendarCheck } from "react-icons/fa";

import {
  TextField,Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Checkbox, MenuItem, Select, FormControl, InputLabel,Tooltip,
    Typography, Avatar, Box, IconButton, TablePagination, LinearProgress
  } from '@mui/material';
  import { Edit, Delete, Visibility } from '@mui/icons-material';


  const rows = [
    {
      id: 1,
      image:"/f7.jpg",
      Name:"Rajat Dalal",
      Mail:"Dalalrajat@gmail.com",
      PhoneNumber: "7890345788",
      CreatedAT:"12/10/25"
      
    },
    {
        id: 2,
        image: "User Image",
        Name:"Users Name",
        Mail:"Users Email",
        PhoneNumber: "Users ph",
        CreatedAT:"12/10/25"
        
      },
      {
        id: 3,
        image: "User Image",
        Name:"Users Name",
        Mail:"Users Email",
        PhoneNumber: "Users ph",
        CreatedAT:"12/10/25"
        
      },
      {
        id: 4,
        image: "User Image",
        Name:"Users Name",
        Mail:"Users Email",
        PhoneNumber: "Users ph",
        CreatedAT:"12/10/25"
        
      },
  ];
  
const Users = () => {
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
    
     

      {/* Main Table Card */}
      <Paper sx={{ padding: 3 }}>
        {/* Title and Search */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box>
            <Typography variant="h6">
              Users List
            </Typography>
            <FormControl size="small" sx={{ mt: 1, minWidth: 200 }}>
              <InputLabel>Category By</InputLabel>
              <Select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                label="Category By"
              >
                <MenuItem value=""><em>All</em></MenuItem>
                <MenuItem value="Electronics">Electronics</MenuItem>
                <MenuItem value="Fashion">Fashion</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Search Bar */}
          <TextField
            placeholder="Search Products"
            size="small"
            sx={{
              width: 300,
              mt: 2,
              backgroundColor: '#f1f1f1',
              borderRadius: '8px',
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </Box>
    
          
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: '#f5f5f5'}}>
                <TableRow>
                  <TableCell padding="checkbox"><Checkbox /></TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>image</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap',fontWeight: 'bold' }}>Mail</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>PhoneNumber</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>CreatedAT</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <TableRow key={row.id}>
                    <TableCell padding="checkbox"><Checkbox /></TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={2}>
                      <Box
  sx={{
    width: 60,
    height: 60,
    overflow: 'hidden',
    borderRadius: 1,
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
  <img src={row.image} alt="category" />
</Box>
                        <Box>
                          <Typography fontWeight={600}>{row.title}</Typography>
                          <Typography variant="body2" color="text.secondary">{row.subText}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>{row.Name}</TableCell>
                    <TableCell><Box display="flex" alignItems="center" gap={1}>
                      < MdMarkEmailRead size={18} style={{ color: '#000' }} />
                              {row.Mail}
                          </Box></TableCell>

                          <TableCell><Box display="flex" alignItems="center" gap={1}>
                      < FaPhoneVolume size={18} style={{ color: '#2962ff' }} />
                              {row.PhoneNumber}
                          </Box></TableCell>

                          <TableCell><Box display="flex" alignItems="center" gap={1}>
                      < FaRegCalendarCheck size={18} style={{ color: '#DC143C' }} />
                              {row.CreatedAT}
                          </Box></TableCell>
                   
                     
                    
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
              count={rows.length}
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
  
  export default Users;
