"use client";

import React, { useContext} from "react";
import { CardBody, CardContainer, CardItem } from "../ui/card";
import { DialogWithForm } from "./Modal";
import { Dialog } from "@material-tailwind/react";

import { AuthContext } from "../functions/Auth";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../functions/CartContext";

export function ThreeDCardDemo({id,name,image,price, category}) {
    const {addToCart}=useContext(CartContext)
    const navigate=useNavigate()
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen((cur) => !cur);
    const {user}=useContext(AuthContext);
    const handleSignIn=()=>{
      navigate('/signin')
    }
    
  return (
    <CardContainer className="w-[90%] mx-10" >
      <CardBody
        className="bg-gray-50 relative group/card  dark:hover:shadow-2xl 
        dark:hover:shadow-emerald-500/[0.1] bg-green800
        dark:border-white/[0.2] border-black/[0.1] w-full sm:w-[30rem] 
        h-[90%] rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-white">
          {name}
        </CardItem>
        <CardItem
          translateZ="60"
          className="text-neutral-500 text-xl font-bold max-w-sm mt-2 dark:text-neutral-300">
          {price}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
        <img
            src={`http://localhost:5000/images/${image}`}
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail" />
        </CardItem>
        <div className="flex relative right-0 items-center mt-10">
      
          <CardItem
            translateZ={20} 
            onClick={user? handleOpen : handleSignIn}
            className="relative px-4 py-2  rounded-xl bg-white
             dark:bg-white dark:text-black text-black text-xs 
             font-bold">
           
            <button >Order now </button>
             
              <Dialog
                   size="xs"
                   open={open}
                   handler={handleOpen}
                   className="bg-transparent shadow-none"
                 >
              <DialogWithForm id={id} category={category} name={name} price={price} image={image} />
            
            </Dialog>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
