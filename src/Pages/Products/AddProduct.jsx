import React, { useContext } from 'react'
import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Rating from '@mui/material/Rating';
import UploadBox from '../../Components/uploadBox';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IoClose } from "react-icons/io5";
import { Button } from '@mui/material';
import { FaCloudUploadAlt } from "react-icons/fa";
import { Mycontext } from '../../App';
import { useEffect } from 'react';
import { fetchDataFromApi } from '../../../utils/api';
import {postDataCategory} from '../../../utils/api';
import { postDataProduct } from '../../../utils/api';



const AddProducts = () => {
    const [Productcat, setProductcat] = React.useState('');
    const [ProductSubcat, setProductSubcat] = React.useState('');
    const [ProductFeatured, setProductFeatured] = React.useState('');
    const [ProductRams, setProductRams] = React.useState([]);
    const [ProductWeight, setProductWeight] = React.useState([]);
    const [ProductSize, setProductSize] = React.useState([]);

   const context = useContext(Mycontext)
   const [preview, setpreview] = useState([])
   const [isLoading,setisLoading] = useState(false)

    const [formfields,setFormfields] =useState({
      name:'',
      description:'',
      images:'',
      brand:'',
      price:[],
      oldPrice:'',
      catName:'',
      catId:'',
      subcatId:'',
      subcat:'',
      subcatName:'',
      category:'',
      countInstock:'',
      rating:'',
      isFeatured:'',
      discount:'',
      productRam:[],
      size:[],
      productWeight:[],
      location:'',


    })

    const [catdata,setCatdata]=useState([])

   const handleChangeProduct = (event) => {
    setProductcat(event.target.value);
  }

  const selectCatByName = (name, id) => {
    setFormfields((prev) => ({
      ...prev,
      catName: name,
      catId: id,
      category: id,
      
    }));
  };
  
  
  

  const selectSubCatByName=(name)=>{
    formfields.subcat=name
      }
  const handleChangeSubProduct = (event) => {
    setProductSubcat(event.target.value);
    formfields.subcatId=event.target.value
  }

  const handleChangeFeatured = (event) => {
    setProductFeatured(event.target.value);
    formfields.isFeatured=event.target.value
  }
  const handleChangesetProductRams = (event) => {
    const { value } = event.target;
    setProductRams(value);  
    setFormfields((prev) => ({
      ...prev,
      productRam: value,
    }));
  };
  

  const handleChangesetProductWeight = (event) => {
    const { value } = event.target;
    setProductWeight(value);  
    setFormfields((prev) => ({
      ...prev,
      productWeight:value,
    }));
  };

  const handleChangesetProductSize = (event) => {
    const { value } = event.target;
    setProductSize(value);  
    setFormfields((prev) => ({
      ...prev,
      size:value,
    }));
  };

  const onChangeRating = (e) => {
    setFormfields((prev) => ({
      ...prev,
      rating: e.target.value
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

            const handleSubmitCat = (e) => {
              e.preventDefault();
              setisLoading(true);
            
              // Example validation
              if (formfields.name === "") {
                context.openAlertBox("error", "Please enter a product name.");
                setisLoading(false);
                return;
              }

              
            
              if (preview?.length === 0) {
                context.openAlertBox("error", "Please upload a product image.");
                setisLoading(false);
                return;
              }

              const cleanedFormfields = { ...formfields };

// 1. Fix location
if (!formfields.location || formfields.location === '') {
  cleanedFormfields.location = [];  // <-- Empty array instead of empty string
}
            
              // Build the payload
              const dataToSend = {
                ...formfields,
                images: preview[0], // or preview if multiple images are allowed
                images: preview[0],
  price: Number(formfields.price),
  oldPrice: Number(formfields.oldPrice),
  discount: Number(formfields.discount),
  countInstock: Number(formfields.countInstock),
  rating: Number(formfields.rating),
  isFeatured: ProductFeatured === 'true' || ProductFeatured === true, // convert properly
              };
            
              console.log("Sending this product data:", dataToSend);
            
              
              postDataProduct('/api/product/create', dataToSend).then((res) => {
                setisLoading(false);
                context.setisScreenPanelopen({ open: false }); // close the panel after success
              }).catch((err) => {
                setisLoading(false);
                context.openAlertBox("error", "Something went wrong while creating the product.");
                console.error(err);
              });
            };
            
            
  return (
   <section className='p-5 bg-[#f1f1f1]'>
   <form className='form' onSubmit={handleSubmitCat}>
  <div className=' scroll max-h-[70vh] overflow-y-scroll'>
    <div className='grid grid-cols-1'>
    <div className='mb-3'>
      <h1 className='text-[16px] font-bold mb-2'>Product Name</h1>
      <input type='text' className=' plane w-full   h-[40px]  rounded-sm border
       border-[rgba(0,0,0,0.2)] 
      focus:outline-none p-3
      focus:border-[rgba(0,0,0,0.9)]' name='name' value={formfields.name} onChange={onchangeInput}/>
    </div>
    </div>

    <div className='grid grid-cols-1 mb-3'>
        <div>
      <h1 className='text-[16px] font-bold mb-2'>Product Description</h1>
      <textarea type='text' className='plane w-full  h-[80px]  rounded-sm border border-[rgba(0,0,0,0.2)] focus:outline-none p-3
      focus:border-[rgba(0,0,0,0.9)]' name='description' value={formfields.description} onChange={onchangeInput}/>
    </div>
    </div>

    <div className=' grid grid-cols-4 mb-3 gap-4'>
        <div className='col'>
      <h1 className='text-[16px] font-bold mb-2'>Product Category</h1>

      
        <Select
          labelId="demo-simple-select-label"
          id="Product-category"
          value={Productcat}
          label="Categroy"
          onChange={ handleChangeProduct}
          className='w-full'
          size='small'
        >

           { catdata.length!==0 && catdata?.map((item,index)=>{
                      return(
                     <MenuItem key={index} value={item?._id} onClick={() => selectCatByName(item.name,item._id)}>{item.name}</MenuItem>
                     
                      )
                    })}
          
        </Select>
      </div>
    <div className='col'>
    <h1 className='text-[16px] font-bold mb-2'>Product Sub Category</h1>
    <Select
      id="Product-sub-category"
      value={ProductSubcat}
      onChange={handleChangeSubProduct}
      className='w-full'
      size='small'
      disabled={!Productcat} // Prevent subcategory selection before category is selected
    >
      <MenuItem value="">Select Subcategory</MenuItem>
      {catdata
        .find((cat) => cat._id === Productcat)?.children?.map((subcat) => (
          <MenuItem key={subcat._id} value={subcat._id} onClick={() => selectSubCatByName(subcat.name,subcat._id)}>
            {subcat.name}
          </MenuItem>
        ))}
    </Select>
  </div>

    <div className='grid grid-cols-1'>
    <div className='mb-3'>
      <h1 className='text-[16px] font-bold mb-2'>Product Price</h1>
      <input type='number' className=' plane w-full   h-[40px]  rounded-sm border border-[rgba(0,0,0,0.2)] focus:outline-none p-3
      focus:border-[rgba(0,0,0,0.9)]'name='price' value={formfields.price} onChange={onchangeInput}/>
    </div>
    </div>

    <div className='grid grid-cols-1'>
    <div className='mb-3'>
      <h1 className='text-[16px] font-bold mb-2'>Product Old Price</h1>
      <input type='number' className=' plane w-full   h-[40px]  rounded-sm border border-[rgba(0,0,0,0.2)] focus:outline-none p-3
      focus:border-[rgba(0,0,0,0.9)]'
      name='oldPrice' value={formfields.oldPrice} onChange={onchangeInput}/>
    </div>
    </div>


    <div className='col'>
      <h1 className='text-[16px] font-bold mb-2'>Is Featured?</h1>
      <Select
          labelId="demo-simple-select-label"
          id="Product-sub-category"
          value={ProductFeatured}
          label="Sub-Categroy"
          onChange={handleChangeFeatured}
          className='w-full'
          size='small'
        >
          
          <MenuItem value={true}>True</MenuItem>
          <MenuItem value={false}>False</MenuItem>
         
        </Select>
    </div>

    <div className='grid grid-cols-1'>
    <div className='mb-3'>
      <h1 className='text-[16px] font-bold mb-2'>Product Stock</h1>
      <input type='text' className=' plane w-full   h-[40px]  rounded-sm border border-[rgba(0,0,0,0.2)] focus:outline-none p-3
      focus:border-[rgba(0,0,0,0.9)]' name='countInstock' value={formfields.countInstock} onChange={onchangeInput}/>
    </div>
    </div>


    <div className='grid grid-cols-1'>
    <div className='mb-3'>
      <h1 className='text-[16px] font-bold mb-2'>Brand</h1>
      <input type='text' className=' plane w-full   h-[40px]  rounded-sm border border-[rgba(0,0,0,0.2)] focus:outline-none p-3
      focus:border-[rgba(0,0,0,0.9)]'name='brand' value={formfields.brand} onChange={onchangeInput}/>
    </div>
    </div>

    <div className='grid grid-cols-1'>
    <div className='mb-3'>
      <h1 className='text-[16px] font-bold mb-2'> Product Discount</h1>
      <input type='number' className='plane w-full   h-[40px]  rounded-sm border border-[rgba(0,0,0,0.2)] focus:outline-none p-3
      focus:border-[rgba(0,0,0,0.9)]'name='discount' value={formfields.discount} onChange={onchangeInput}/>
    </div>
    </div>

    <div className='col'>
      <h1 className='text-[16px] font-bold mb-2'>Product Rams</h1>
      <Select
          multiple
          labelId="demo-simple-select-label"
          id="Product-Rams"
          value={ProductRams}
          label="Sub-Categroy"
          onChange={handleChangesetProductRams}
          className='w-full'
          size='small'
        >
          
          <MenuItem value={'6GB'}>6GB</MenuItem>
          <MenuItem value={'8GB'}>8GB</MenuItem>
          <MenuItem value={'10GB'}>10GB</MenuItem>
        </Select>
    </div>

    <div className='col'>
      <h1 className='text-[16px] font-bold mb-2'>Product Weight</h1>
      <Select
          multiple
          labelId="demo-simple-select-label"
          id="Product-Rams"
          value={ProductWeight}
          label="Sub-Categroy"
          onChange={handleChangesetProductWeight}
          className='w-full'
          size='small'
        >
          
          <MenuItem value={'1KG'}>1KG</MenuItem>
          <MenuItem value={'3KG'}>3KG</MenuItem>
          <MenuItem value={'5KG'}>5KG</MenuItem>
        </Select>
    </div>

    <div className='col'>
      <h1 className='text-[16px] font-bold mb-2'>Product Size</h1>
      <Select
          multiple
          labelId="demo-simple-select-label"
          id="Product-Size"
          value={ProductSize}
          label="Sub-Categroy"
          onChange={handleChangesetProductSize}
          className='w-full'
          size='small'
        >
          
          <MenuItem value={'s'}>s</MenuItem>
          <MenuItem value={'M'}>M</MenuItem>
          <MenuItem value={'L'}>L</MenuItem>
          <MenuItem value={'XL'}>XL</MenuItem>
          <MenuItem value={'XXL'}>XXL</MenuItem>
        </Select>
    </div>

   

    <div className='grid grid-cols-1'>
    <div className='col'>
      <h1 className='text-[16px] font-bold mb-2'> Product Ratings</h1>
      <Rating name="half-rating" defaultValue={1.5} precision={0.5} onChange={onChangeRating} />
    </div>
    </div>

    </div>

    <div className="flex flex-wrap grid-cols-8 gap-4">
  {preview?.length !== 0 &&
    preview.map((image, index) => (
      <div
        key={index}
        className="relative w-[150px] h-[120px] rounded-md overflow-hidden shadow-md border border-gray-300"
      >
        <LazyLoadImage
          src={image}
          alt="preview preview"
          effect="blur"
          className="w-full h-full object-cover"
        />
        <button
          type="button"
          onClick={() => {
            const newPreview = [...preview];
            newPreview.splice(index, 1);
            setpreview(newPreview);
          }}
          className="absolute top-1 right-1 w-3 h-3 bg-red-600 text-white
           rounded-full flex items-center justify-center z-20 shadow-sm hover:bg-red-700"
        >
          <IoClose size={12} />
        </button>
      </div>
    ))}

  <div className="uploadBoxWrapper relative w-[150px] h-[120px]">
    <UploadBox
      multiple={true}
      
      name="images"
      url="/api/product/upload"
      setpreview={setpreview}
    />
  </div>
</div>


    </div>
   
    <hr className="border-t border-gray-800" />

 <br/>
<Button type="submit" className='btn-blue btn-sm mt-3 w-full flex gap-3'>
<FaCloudUploadAlt  className='text-[25px] text-white'/>
Publish and View</Button>
   </form>
   </section>
  )
}

export default AddProducts