import React, { useContext} from 'react'
import { useState } from 'react'
import { Layout, Mycontext } from '../../App'
import Sidebar from '../../Components/Sidebar'
import Header from '../../Components/Header'
import { Button } from '@mui/material'
import { IoMdAdd } from "react-icons/io";
import { Search } from '@mui/icons-material';
import { InputAdornment} from '@mui/material';
import Chip from '@mui/material/Chip';
import { useEffect } from 'react'
import { fetchDataFromApi } from '../../../utils/api'
import { FaChevronDown, FaChevronRight, FaEdit, FaTrash } from 'react-icons/fa';
import {deleteData} from '../../../utils/api'


import {
  
    Paper, 
    Typography,  Box, 
  } from '@mui/material';
  
 

 
  const SubCategoryList = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [catdata, setCatdata] = useState([]);
    const [openCategory, setOpenCategory] = useState(null);
    const context = useContext(Mycontext);
  
    const toggleCategory = (category) => {
      setOpenCategory((prev) => (prev === category ? null : category));
    };
  
    useEffect(() => {
      if (!context.isScreenPanelopen.open) {
        refreshCategoryList();
      }
    }, [context.isScreenPanelopen.open]);
  
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
  
    
     const deleteSubCat=(_id)=>[
          deleteData(`/api/category/${_id}`).then((res)=>{
            refreshCategoryList();
          })
        ]
       
        
        
    return (
      <Box sx={{ padding: 3 }}>
        
        <Box display="flex" justifyContent="flex-end" gap={2} mb={2}>
          <Button variant="contained" color="success">
            Export
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              context.setisScreenPanelopen({
                open: true,
                model: 'Add New Sub Category',
              })
            }
          >
            Add New Sub Category
          </Button>
        </Box>
  
        {/* Category UI */}
        <Paper sx={{ padding: 3 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h6">SubCategory List</Typography>
          </Box>
  
          <div className="w-full max-w-3xl mx-auto mt-6">
            {catdata.map((cat) => (
              <div key={cat._id} className="border rounded mb-4 shadow-sm">
                {/* Parent Category */}
                <div
                  className="flex items-center justify-between bg-gray-100 px-4 py-3 cursor-pointer"
                  onClick={() => toggleCategory(cat._id)}
                >
                  <span className="font-semibold text-lg">{cat.name}</span>
                  {openCategory === cat._id ? (
                    <FaChevronDown className="text-gray-500" />
                  ) : (
                    <FaChevronRight className="text-gray-500" />
                  )}
                </div>
  
                {/* Subcategories */}
                {openCategory === cat._id && (
                  <div className="bg-white px-4 py-4 space-y-4">
                    {(cat.children || []).length === 0 ? (
                      <p className="text-sm text-gray-400">No subcategories available.</p>
                    ) : (
                      cat.children.map((subcat) => (
                        <div
                          key={subcat._id}
                          className="flex items-center justify-between border-b py-2"
                        >
                          <span className="text-gray-800">{subcat.name}</span>
                          <div className="flex gap-3">
                            <FaEdit
                              className="text-blue-600 cursor-pointer hover:text-blue-800"
                              onClick={() => {
                                context.setisScreenPanelopen({
                                  open: true,
                                  model: 'Edit Sub Category',
                                  data: subcat,
                                });
                              }}
                            />
                            <FaTrash
                              className="text-red-500 cursor-pointer hover:text-red-700"
                              onClick={() => {
                                alert(`Delete ${subcat.name}`);
                               deleteSubCat(subcat?._id); 
                              }}
                            />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Paper>
      </Box>
    );
  };
  
  
  export default  SubCategoryList;
