import React from 'react'
import Button from '@mui/material/Button';
import { RiMenu2Fill } from "react-icons/ri";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { FaRegUser } from "react-icons/fa6";
import { AiOutlineLogout } from "react-icons/ai";

import { FaRegBell } from "react-icons/fa";
import { useState } from 'react';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: '0 4px',
  },
}));

const Header = () => {
  const [anchormyAcc, setanchormyAcc] = React.useState(null);
  const openmyAcc = Boolean(anchormyAcc);
  const handleClickmyAcc = (event) => {
    setanchormyAcc(event.currentTarget);
  };
  const handleClosemyAcc = () => {
    setanchormyAcc(null);
  };
  return (
    <header className='w-full h-auto pl-64 pr-5 shadow-md  flex items-center justify-between'>
      <div className='part1'>
        <Button className='!w-[40px] !h-[40px] !rounded-full'>
          <RiMenu2Fill className='text-[22px] !text-[rgba(0,0,0,0.8)]'/>
          </Button>
      </div>

      <div className='part2 w-[40%] flex items-center justify-end gap-3'>
      <IconButton aria-label="cart">
      <StyledBadge badgeContent={4} color="secondary">
      <FaRegBell />
      </StyledBadge>
    </IconButton>

    <div className='relative'>
    <div className='rounded-full w-[40px] h-[40px] overflow-hidden cursor-pointer' onClick={handleClickmyAcc}>
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwWjshs3h4sYIi82eSWiEpdj-zWkp_S4jdlW1aaCzQwLKIjKYnTin76TA&s' 
        className='w-full h-full object-cover'/>
      </div>
        <Menu
        anchorEl={anchormyAcc}
        id="account-menu"
        open={openmyAcc}
        onClose={handleClosemyAcc}
        onClick={handleClosemyAcc}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClosemyAcc} className='!bg-white'>
        <div className='flex items-center gap-5'>
        <div className='rounded-full w-[40px] h-[40px] overflow-hidden cursor-pointer'>
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwWjshs3h4sYIi82eSWiEpdj-zWkp_S4jdlW1aaCzQwLKIjKYnTin76TA&s' 
        className='w-full h-full object-cover'/>
      </div>

      <div className='info'>
        <h3 className='text-[16px] font-bold !leading-5'>Anglena Gotelli</h3>
        <p className='text-[13px] font-[400] opacity-70'>admin_01@ecomm.com</p>

      </div>
        </div>
        </MenuItem>
        <Divider />

        <MenuItem onClick={handleClosemyAcc} className='flex items-center justify-center gap-3'>
        <FaRegUser />
        <span className='text-[16px]'>Profile</span>
        </MenuItem>

        <MenuItem onClick={handleClosemyAcc} className='flex items-center justify-center gap-3'>
        <FaRegUser />
        <span className='text-[16px]'>Profile</span>
        </MenuItem>

        
        <MenuItem onClick={handleClosemyAcc} className='flex items-center justify-center gap-3'>
        <AiOutlineLogout />
        <span className='text-[16px]'>Sign Out</span>
        </MenuItem>
       </Menu>
       </div>
      </div>
      

      
  
    </header>
  )
}

export default Header