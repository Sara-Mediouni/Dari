import React, { useState } from 'react'
import './Add.css'
import axios from 'axios'
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets'
const Add = ({url}) => {
  
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    item:"",
    price:"",
    category:"Pastry"

  })
  const onChangeHandler=(event)=>{
    const name=event.target.name;
    const value=event.target.value;
    setData(data=>({...data,[name]:value}))
  }
  const onSubmitHandler=async(event)=>{
     event.preventDefault();
     const formData=new FormData();
     formData.append("item", data.item);
     formData.append("price", data.price);
     formData.append("category", data.category);
     formData.append("image", image);
     const response = await axios.post(`${url}/api/items/additem`,formData)
     if (response.data.success){
       setData({
        item:"",
        price:"",
        category:"Pastry"
       })
       setImage(false)
       toast.success(response.data.message)
     }else{
       toast.error(response.data.message)
     }
    
    
    }  

  return (
    <div className='add'>
    <form className='flex-col' onSubmit={onSubmitHandler}>
     <div className='add-img-upload flex-col'>
      <p>
        Upload Image
      </p>
      <label htmlFor="image">
       <img src={image? URL.createObjectURL(image): assets.upload_area} alt=""/>
      </label>
      <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required/>
     </div>
     <div className='add-product-name flex-col'>
      <p>Product name</p>
      <input onChange={onChangeHandler} value={data.item} type="text" name="item" placeholder="Type here"/>
     </div>
     <div className='add-product-description flex-col'>
      <p>
        Product Description
      </p>
       <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='write content here'/>
     </div>
     <div className='add-category-price'>
      <div className='add-category flex-col'>
        <p>Product category</p>
        <select onChange={onChangeHandler} value={data.category} name="category">
        <option value="Pastry">Pastry</option>
        <option value="Clothes">Clothes</option>
        <option value="Decoration">Decoration</option>
    
        </select>
      </div>
      <div className='add-price flex-col'>
        <p>
         Product Price
        </p>
        <input type="Number" onChange={onChangeHandler} value={data.price}
        name="price" placeholder='$20'/>
      </div>
     </div>
     <button type="submit" className='add-btn'>Add</button>
    </form>

    </div>
  )
}

export default Add