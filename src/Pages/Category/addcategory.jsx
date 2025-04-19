import React, { useContext, useEffect} from 'react'
import { useState } from 'react'
import { Layout, Mycontext } from '../../App'
import Sidebar from '../../Components/Sidebar'
import Header from '../../Components/Header'
import { Button } from '@mui/material'
import { IoMdAdd } from "react-icons/io";
import { Search } from '@mui/icons-material';
import { InputAdornment} from '@mui/material';
import { fetchDataFromApi } from '../../../Utils/api'


import {
  TextField,Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Checkbox, MenuItem, Select, FormControl, InputLabel,Tooltip,
    Typography, Avatar, Box, IconButton, TablePagination, LinearProgress
  } from '@mui/material';
  import { Edit, Delete, Visibility } from '@mui/icons-material';


 
  
const CategoryList = () => {
    const [categoryFilter, setCategoryFilter] = React.useState('');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const context=useContext(Mycontext)
  
    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const [catdata,setCatdata]=useState([])
    

    useEffect(() => {
      refreshCategoryList();
    }, []);
    
    const refreshCategoryList = () => {
      fetchDataFromApi('/api/category')
        .then((res) => {
          if (res && res.rootCategories) {
            setCatdata(res.rootCategories);
          } else {
            console.warn("rootCategories not found in API response");
          }
        })
        .catch((err) => console.error("API Fetch Error:", err));
    };
    
   
    

    
    return (
      <Box sx={{ padding: 3 }}>
      {/* Top Global Buttons */}
      <Box display="flex" justifyContent="flex-end" gap={2} mb={2}>
        <Button variant="contained" color="success">Export</Button>
        <Button variant="contained" color="primary" onClick={()=>context.setisScreenPanelopen({
          open:true,
          model:'Add New Category'
        })}>Add New Category</Button>
      </Box>

      {/* Main Table Card */}
      <Paper sx={{ padding: 3 }}>
        {/* Title and Search */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box>
            <Typography variant="h6">
              Category List<Typography component="span" color="text.secondary"></Typography>
            </Typography>
            
          </Box> 
          </Box>
    
          
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: '#f5f5f5', padding: 2, borderRadius: 2 }}>
                <TableRow>
                  <TableCell padding="checkbox"><Checkbox/></TableCell>  
                  <TableCell sx={{ fontWeight: 'bold' }}>Image</TableCell>
                   <TableCell sx={{ fontWeight: 'bold' }}>Category Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {catdata?.length!==0 && catdata.map((item,index) => (
                  <TableRow key={index}>
                    <TableCell padding="checkbox"><Checkbox /></TableCell>
                    <TableCell>
           <Box display="flex" alignItems="center" gap={2}>
           <Box
  sx={{
    width: 100,
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
  <img src={item.image} alt="slider" />
  
</Box>


        </Box>
        
     </TableCell>
     <TableCell sx={{ fontWeight: 500 }}>{item.name}</TableCell>

                  
                    <TableCell>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
             <Tooltip title="View">
             <Visibility sx={{ cursor: 'pointer' }} fontSize="small"/>
             </Tooltip>
            <Tooltip title="Edit">
            <Edit sx={{ cursor: 'pointer' }} fontSize="small" 
            onClick={()=>context.setisScreenPanelopen({
          open:true,
          model:'Edit Category',
          id:item?._id
        })}/>
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
              count={catdata.length}
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
  
  export default  CategoryList;
