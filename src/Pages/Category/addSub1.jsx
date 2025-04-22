import React, { useContext } from 'react'
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Button } from '@mui/material';
import { FaCloudUploadAlt } from "react-icons/fa";
import Select from '@mui/material/Select';
import {useState} from 'react';
import MenuItem from '@mui/material/MenuItem';
import {Mycontext} from '../../App';
import {useEffect} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchDataFromApi } from '../../../utils/api';
import {postDataCategory} from '../../../utils/api';

const  AddSubCategory1 = () => {
  const [Productcat, setProductcat] = React.useState('');
  const [isLoading,setisLoading] = useState(false)
   const [catdata,setCatdata]=useState([])
  const context= useContext(Mycontext)
  const [preview, setpreview] = useState([])

  const [formfields,setFormfields] =useState({
    name:'',
    parent_category_name:null,
    parent_id:null
})

  const handleChangeProduct = (event) => {
    const selectedId = event.target.value;
    setProductcat(selectedId);
  
    const selectedItem = catdata.find((cat) => cat._id === selectedId);
    setFormfields((prev) => ({
      ...prev,
      parent_id: selectedId,
      parent_category_name: selectedItem?.name || "",
    }));
  };
  
  

  

   const  onchangeInput=(e)=>{
    const{name,value}=e.target
      setFormfields((e)=>{
         return{
         ...formfields,
         [name]:value
         }
         })
         }
 
  const handleSubmit=(e)=>{
            
       e.preventDefault();
         setisLoading(true);
               
         
          if (formfields.name ==="") {
                 context.openAlertBox("error", "Please enter a category name.");
                 setisLoading(false);
                 return;
             }
         
             if (formfields.parent_category_name===0) {
               context.openAlertBox("error", "Please select a parent category name to upload.");
               setisLoading(false);
               return;
           }
           console.log('formfields:', formfields);
           console.log('preview:', preview);
         
           const dataToSend = {
            name: formfields.name,
            parent_category_name: formfields.parent_category_name,
            parent_id: formfields.parent_id,
          };
          
         console.log('the value',dataToSend)
         postDataCategory('/api/category/create', dataToSend).then((res) => {
           setisLoading(false);
           context.setisScreenPanelopen({ open: false });
         });
           }

  useEffect(() => {
    if (context.isScreenPanelopen.open) {
           refreshCategoryList();
        }
      }, [context.isScreenPanelopen.open]);
              
    const refreshCategoryList = () => {
      
      fetchDataFromApi('/api/category')
         .then((res) => {
          console.log("API Response:", res);
             if (res && res.rootCategories) {
               setCatdata(res.rootCategories);
                 } else {
               console.warn("rootCategories not found in API response");
                     }
                   })
               .catch((err) => console.error("API Fetch Error:", err));
               };

  return (
    <section className='p-5 bg-[#f1f1f1]'>
    <form className='form' onSubmit={handleSubmit}>
   
  <div className=' scroll max-h-[70vh]'>
  <div className=' grid grid-cols-4 mb-3 gap-4'>
         <div className='col'>
       <h1 className='text-[16px] font-bold mb-2'>Product Category</h1>
       <Select
           labelId="demo-simple-select-label"
           id="Product-category"
           value={Productcat}
           label="Categroy"
           name='name'
           onChange={handleChangeProduct}
           className='w-full'
           size='small'
         >
          { catdata.length!==0 && catdata?.map((item,index)=>{
            return(
           <MenuItem key={index} value={item?._id}>{item.name}</MenuItem>
           
            )
          })}
           
         </Select>
     </div>
 
    
   
    <div className='grid grid-cols-1'>
    <div className='mb-3'>
      <h1 className='text-[16px] font-bold mb-2'>Sub Category Name</h1>
      <input type='text'
      name='name'
      value={formfields.name}
      onChange={onchangeInput}
       className=' plane w-full   h-[40px]  rounded-sm border border-[rgba(0,0,0,0.2)] focus:outline-none p-3
      focus:border-[rgba(0,0,0,0.9)]'/>
    </div>
    </div>
    </div>
    </div>

      
    
     <br/>
     <div className='w-[250px]'>
    <Button type="submit" className='btn-blue btn-sm mt-3 w-full flex gap-3'>
    
   {
        isLoading===true ? <CircularProgress color='inherit'/>:
                
        <><FaCloudUploadAlt className='text-[25px] text-white' /> Publish and View</> 
    }
     </Button>
    </div>
    </form>
    </section>
  )
}

export default AddSubCategory1