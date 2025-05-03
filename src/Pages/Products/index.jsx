import React, { useContext} from 'react'
import { useState } from 'react'
import { Layout, Mycontext } from '../../App'
import Sidebar from '../../Components/Sidebar'
import Header from '../../Components/Header'
import { Button } from '@mui/material'
import { IoMdAdd } from "react-icons/io";
import { Search } from '@mui/icons-material';
import { InputAdornment} from '@mui/material';
import { deleteData } from '../../../utils/api'
import { fetchDataFromApi } from '../../../utils/api'
import { useEffect } from 'react'
import {
  TextField,Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Checkbox, MenuItem, Select, FormControl, InputLabel,Tooltip,
    Typography, Avatar, Box, IconButton, TablePagination, LinearProgress
  } from '@mui/material';
  import { Edit, Delete, Visibility } from '@mui/icons-material';


 
  
  const Product = () => {
    const [productdata, setProductdata] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);
    const [selectedProductIds, setSelectedProductIds] = useState([]);

  
    const context = useContext(Mycontext);
  
    const handleChangePage = (event, newPage) => setPage(newPage);
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    useEffect(() => {
      if (!context.isScreenPanelopen.open) {
        refreshProductList();
      }
    }, [context.isScreenPanelopen.open]);
  
    const refreshProductList = () => {
      fetchDataFromApi('/api/product')
        .then((res) => {
          if (res && res.rootProducts) {
            setProductdata(res.rootProducts);
          } else {
            console.warn("products not found in API response");
          }
        })
        .catch((err) => console.error("API Fetch Error:", err));
    };
  
    const deleteProduct = (_id) => {
      deleteData(`/api/product/${_id}`).then(() => {
        refreshProductList();
      });
    };
  
    // Get Unique Categories
    const uniqueCategories = [...new Set(productdata.map(item => item.catName))];
  
    // Filtered Products based on category selected
    const filteredProducts = categoryFilter
      ? productdata.filter((item) => item.catName === categoryFilter)
      : productdata;

  
      const bulkDeleteProducts = async () => {
        if (selectedProductIds.length === 0) {
          alert("No products selected.");
          return;
        }
      
        const confirmDelete = window.confirm("Are you sure you want to delete selected products?");
        if (!confirmDelete) return;
      
        try {
          const res = await fetch('http://localhost:8000/api/product/deleteMultiple', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ids: selectedProductIds }),
          });
      
          const result = await res.json();
      
          if (result.success) {
            alert("Products deleted successfully!");
            setSelectedProductIds([]);
            refreshProductList();
          } else {
            alert("Error deleting products: " + result.message);
          }
        } catch (error) {
          console.error("Bulk delete error:", error);
          alert("Something went wrong while deleting products.");
        }
      };
      

    
    return (
      <Box sx={{ padding: 3 }}>
        {/* Top Global Buttons */}
        <Box display="flex" justifyContent="flex-end" gap={2} mb={2}>
  <Button
    variant="contained"
    color="error"
    onClick={bulkDeleteProducts}
    disabled={selectedProductIds.length === 0}
  >
    Delete Selected
  </Button>
  <Button variant="contained" color="success">Export</Button>
  <Button
    variant="contained"
    color="primary"
    onClick={() => context.setisScreenPanelopen({
      open: true,
      model: 'Add Product'
    })}
  >
    Add Product
  </Button>
</Box>

  
        {/* Main Table Card */}
        <Paper sx={{ padding: 3 }}>
          {/* Title and Search */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Box>
              <Typography variant="h6">
                Product List <Typography component="span" color="text.secondary"></Typography>
              </Typography>
  
              {/* Dynamic Category Filter */}
              <FormControl size="small" sx={{ mt: 1, minWidth: 200 }}>
                <InputLabel>Category By</InputLabel>
                <Select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  label="Category By"
                >
                  <MenuItem value=""><em>All</em></MenuItem>
                  {uniqueCategories.map((category, index) => (
                    <MenuItem key={index} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
  
            {/* Search Bar (not connected yet) */}
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
  
          {/* Product Table */}
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: '#f5f5f5', padding: 2, borderRadius: 2 }}>
                <TableRow>
                <TableCell padding="checkbox">
  <Checkbox
    checked={
      filteredProducts.length > 0 &&
      selectedProductIds.length ===
        filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).length
    }
    indeterminate={
      selectedProductIds.length > 0 &&
      selectedProductIds.length <
        filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).length
    }
    onChange={(e) => {
      const isChecked = e.target.checked;
      const currentPageIds = filteredProducts
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((item) => item._id);

      setSelectedProductIds((prev) =>
        isChecked
          ? Array.from(new Set([...prev, ...currentPageIds]))
          : prev.filter((id) => !currentPageIds.includes(id))
      );
    }}
  />
</TableCell>

                  <TableCell sx={{ fontWeight: 'bold' }}>Image</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Product Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>
  Sub&nbsp;Category
</TableCell>

                  <TableCell sx={{ fontWeight: 'bold' }}>Price</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Sales</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts?.length !== 0 && filteredProducts
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .reverse()
                  .map((item, index) => (
                    <TableRow key={index}>
                      <TableCell padding="checkbox">
  <Checkbox
    checked={selectedProductIds.includes(item._id)}
    onChange={(e) => {
      const isChecked = e.target.checked;
      setSelectedProductIds((prev) =>
        isChecked
          ? [...prev, item._id]
          : prev.filter((id) => id !== item._id)
      );
    }}
  />
</TableCell>

  
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Avatar src={item.images} variant="square" sx={{ width: 60, height: 60 }} />
                        </Box>
                      </TableCell>
  
                      <TableCell sx={{ fontWeight: 500 }}>
  <Typography variant="body1" fontWeight={600}>
    {item.name}
  </Typography>
  <Typography variant="body2" color="text.secondary">
    {item.brand}
  </Typography>
</TableCell>
                      <TableCell>{item.catName}</TableCell>
                      <TableCell>{item.subcatName}</TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                          ₹{item.oldPrice}
                        </Typography>
                        <Typography fontWeight="bold">₹{item.price}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography fontWeight={500}>{item.sales} sale</Typography>
                        <LinearProgress variant="determinate" value={80} sx={{ width: 100, mt: 0.5 }} />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Tooltip title="View">
                            <Visibility sx={{ cursor: 'pointer' }} fontSize="small" />
                          </Tooltip>
                          <Tooltip title="Edit">
                            <Edit
                              sx={{ cursor: 'pointer' }}
                              fontSize="small"
                              onClick={() => context.setisScreenPanelopen({
                                open: true,
                                model: 'Edit Product',
                                id: item._id,
                                editData: item
                              })}
                            />
                          </Tooltip>
                          <Tooltip title="Delete">
                            <Delete
                              sx={{ cursor: 'pointer', color: 'red' }}
                              fontSize="small"
                              onClick={() => deleteProduct(item._id)}
                            />
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
              count={filteredProducts.length}
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
