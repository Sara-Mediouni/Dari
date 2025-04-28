

import React, { useContext} from "react";
import { CardBody, CardContainer, CardItem } from "../ui/card";
import { DialogWithForm } from "./Modal";
import { Dialog } from "@material-tailwind/react";

import { AuthContext } from "../functions/Auth";
import { useNavigate } from "react-router-dom";

export function ThreeDCardDemo({id,name,image,price, category}) {
    
    const navigate=useNavigate()
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen((cur) => !cur);
    const {user}=useContext(AuthContext);
    const handleSignIn=()=>{
      navigate('/signin')
    }
    
  return (
    <CardContainer className="w-full px-4  sm:px-6 md:px-8 lg:px-10 py-6">
    <CardBody
      className="relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]
        bg-green-700 dark:border-white/[0.2] border-black/[0.1] 
        w-full max-w-md md:max-w-lg lg:max-w-xl 
        mx-auto h-auto rounded-xl p-6 border flex flex-col justify-between"
    >
      <div>
      <CardItem
  translateZ="50"
  className="text-2xl mb-3 font-bold text-white text-start break-words
  overflow-hidden line-clamp-2 h-[100px]"
>
  {name}
</CardItem>

  
        <CardItem
          translateZ="60"
          className="text-white text-lg font-bold mt-2 text-center break-words"
        >
          {price} TND
        </CardItem>
  
        <CardItem translateZ="100" className="w-full mt-4">
          <div className="w-full overflow-hidden rounded-xl">
            <img
              src={`http://localhost:5000/images/${image}`}
              alt="thumbnail"
              className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-xl group-hover/card:shadow-xl"
            />
          </div>
        </CardItem>
      </div>
  
      <div className="flex justify-center mt-6">
        <CardItem
          translateZ={20}
          onClick={user ? handleOpen : handleSignIn}
          className="relative px-6 py-3 rounded-full bg-green-900 text-white 
          dark:bg-pink-2 dark:text-white text-lg font-bold transition duration-300 hover:bg-green-800"
        >
          <button>Order now</button>
  
          <Dialog
            size="xs"
            open={open}
            handler={handleOpen}
            className="bg-black/50 font-general shadow-none"
          >
            <DialogWithForm
              id={id}
              category={category}
              name={name}
              price={price}
              image={image}
            />
          </Dialog>
        </CardItem>
      </div>
    </CardBody>
  </CardContainer>
  
  
  );
}
