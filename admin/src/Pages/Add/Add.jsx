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
    category:"Pastry",
    description:""

  })
  const onChangeHandler=(event)=>{
    const name=event.target.name;
    const value=event.target.value;
    setData(data=>({...data,[name]:value}))
  }
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    
    // Vérification si 'image' est bien une image avant de l'ajouter à FormData
    if (!image) {
      toast.error("Please upload an image.");
      return;
    }
  
    // Vérification si les autres champs sont valides
    if (!data.item || !data.price || !data.category) {
      toast.error("Please fill all fields.");
      return;
    }
  
    // Création de FormData
    const formData = new FormData();
    formData.append("item", data.item);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("image", image);
    formData.append("description", data.description);
  
    try {
      // Envoi de la requête à l'API
      const response = await axios.post(`${url}/api/items/additem`, formData);
      
      if (response.data.success) {
        // Réinitialiser les champs après succès
        setData({
          item: "",
          price: "",
          category: "Pastry", // Tu peux réinitialiser la catégorie si tu le souhaites
          description: ""
        });
        setImage(null);  // Réinitialiser l'image
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error while submitting the form: ", error);
      toast.error("There was an error while submitting the form. Please try again later.");
    }
  };

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
       <textarea required  onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='write content here'/>
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
        <input type="Number" required
        onChange={onChangeHandler} value={data.price}
        name="price" placeholder='$20'/>
      </div>
     </div>
     <button type="submit" className='add-btn'>Add</button>
    </form>

    </div>
  )
}

export default Add