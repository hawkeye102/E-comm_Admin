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


  const rows = [
    {
      id: 1,
      image: "",
      title: "VNEED Women Embroidered Rayon Kurta Pant Set | Kurta set for Women",
      subText: "Books",
      category: "Electronics",
      subCategory: "Women",
      price: "$58.00",
      oldPrice: "$68.00",
      sales: 234,
    },
    {
      id: 2,
      image: "https://via.placeholder.com/50",
      title: "VNEED Women Embroidered Rayon Kurta Pant Set | Kurta set for Women",
      subText: "Books",
      category: "Electronics",
      subCategory: "Women",
      price: "$58.00",
      oldPrice: "$68.00",
      sales: 234,
    },
    {
      id: 3,
      image: "https://via.placeholder.com/50",
      title: "VNEED Women Embroidered Rayon Kurta Pant Set | Kurta set for Women",
      subText: "Books",
      category: "Electronics",
      subCategory: "Women",
      price: "$58.00",
      oldPrice: "$68.00",
      sales: 234,
    },
    {
      id: 4,
      image: "https://via.placeholder.com/50",
      title: "VNEED Women Embroidered Rayon Kurta Pant Set | Kurta set for Women",
      subText: "Books",
      category: "Electronics",
      subCategory: "Women",
      price: "$58.00",
      oldPrice: "$68.00",
      sales: 234,
    },
  ];
  
const Product = () => {
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
          model:'Add Product'
        })}>Add Product</Button>
      </Box>

      {/* Main Table Card */}
      <Paper sx={{ padding: 3 }}>
        {/* Title and Search */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box>
            <Typography variant="h6">
              Products <Typography component="span" color="text.secondary">(Material UI Table)</Typography>
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
              <TableHead sx={{ backgroundColor: '#f5f5f5', padding: 2, borderRadius: 2 }}>
                <TableRow>
                  <TableCell padding="checkbox"><Checkbox /></TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Product</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap',fontWeight: 'bold' }}>Sub Category</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Price</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Sales</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <TableRow key={row.id}>
                    <TableCell padding="checkbox"><Checkbox /></TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Avatar src={row.image} variant="square" />
                        <Box>
                          <Typography fontWeight={600}>{row.title}</Typography>
                          <Typography variant="body2" color="text.secondary">{row.subText}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>{row.category}</TableCell>
                    <TableCell>{row.subCategory}</TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                        {row.oldPrice}
                      </Typography>
                      <Typography fontWeight="bold">{row.price}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight={500}>{row.sales} sale</Typography>
                      <LinearProgress variant="determinate" value={80} sx={{ width: 100, mt: 0.5 }} />
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
  
  export default Product;
