import React from 'react'
import { AiOutlineEye } from "react-icons/ai";
import { useState,useEffect } from 'react';
import {
  TextField,Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Checkbox, MenuItem, Select, FormControl, InputLabel,Tooltip,
    Typography, Avatar, Box, IconButton, TablePagination, LinearProgress
  } from '@mui/material';
  import { Search } from '@mui/icons-material';
import { InputAdornment} from '@mui/material';
import { fetchDataFromApi } from '../../../Utils/api';





const Order = () => {
    const [orders, setOrders] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

useEffect(() => {
    
    fetchDataFromApi('/api/orders')
      .then((res) => {
        if (res?.success !== false) {
          setOrders(res || []);
        } else {
          setOrders([]);
        }
      })
      .catch(() => setOrders([]));
  }, []);
  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`/api/orders/${orderId}/status`, { status: newStatus });
      // Update UI after success
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const filteredOrders = orders.filter((order) =>
  (order.productName || "").toLowerCase().includes(searchTerm.toLowerCase())
);

const getStatusColor = (status) => {
  if (status === "Shipped") return "text-green-600";
  if (status === "Pending") return "text-yellow-500";
  return "text-red-500";
};

  return (
    <div className="card mt-2 shadow-md sm:rounded-lg bg-white">
      <div className="flex items-center justify-between py-3 px-3">
        <h2 className="text-[18px] font-bold">Recent Orders</h2>
        <TextField
          placeholder="Search Products"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
      </div>

      <div className="relative overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead className="text-[14px]">
            <tr className="bg-blue-50">
              <th className="border px-2 py-2">View</th>
              <th className="border px-2 py-2">Order_Id</th>
              <th className="border px-2 py-2">Payment_Id</th>
              <th className="border px-2 py-2">Product_Name</th>
              <th className="border px-2 py-2">Phone_Number</th>
              <th className="border px-2 py-2">Pin_Code</th>
              <th className="border px-2 py-2">Total_Amount</th>
              <th className="border px-2 py-2">Email</th>
              <th className="border px-2 py-2">User_Id</th>
              <th className="border px-2 py-2">Order_Status</th>
              <th className="border px-2 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
  {orders.map((order) => (
    <>
      <tr key={order._id} className="text-gray-700">
        <td className="border px-4 py-2 text-center">
          <button onClick={() => toggleRow(order._id)}>
            <AiOutlineEye className="text-xl text-red-500 cursor-pointer" />
          </button>
        </td>
        <td className="border px-4 py-2">{order.orderId}</td>
        <td className="border px-4 py-2">{order.paymentId}</td>
        <td className="border px-4 py-2">
          {order.product_details.map((prod) => prod.name).join(', ')}
        </td>
        <td className="border px-4 py-2">{order.userId?.phone || "N/A"}</td>
        <td className="border px-4 py-2">{order.deliveryAddress?.pincode || "N/A"}</td>
        <td className="border px-4 py-2">{order.totalAmt}</td>
        <td className="border px-4 py-2">{order.userId?.email}</td>
        <td className="border px-4 py-2">{order.userId?._id}</td>
       <td className="border px-4 py-2">
  <select
    className={`font-[500] ${getStatusColor(order.paymentStatus)} bg-transparent border-none outline-none`}
    value={order.paymentStatus}
    onChange={(e) => handleStatusChange(order._id, e.target.value)}
  >
    <option value="Pending">Pending</option>
    <option value="Shipped">Shipped</option>
    <option value="Delivered">Delivered</option>
    <option value="Cancelled">Cancelled</option>
  </select>
</td>

        <td className="border px-4 py-2">
          {new Date(order.createdAt).toLocaleDateString()}
        </td>
      </tr>

      {expandedRow === order._id && (
        <tr className="bg-gray-100">
          <td colSpan="11" className="border p-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {order.product_details.map((prod, index) => (
                <div key={index} className="flex items-center gap-3">
                  <img src={prod.image} alt="Product" className="w-16 h-16 rounded object-cover" />
                  <div>
                    <p className="font-bold">{prod.name}</p>
                    <p className="text-sm">Qty: {prod.quantity}</p>
                    <p className="text-sm">Price: ₹{prod.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </td>
        </tr>
      )}
    </>
  ))}
</tbody>

        </table>
      </div>
    </div>
  );
};

export default Order