import React, { useEffect, useState } from 'react'
import { ThreeDCardDemo } from './Card3D'
import { PaginationDemo } from './Pag'
import axios from 'axios'
const Deco = () => {
    const [pastry, setPastry] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const getDeco=(page)=>{
  axios.get(`http://localhost:5000/api/items/getallitems?category=Decoration&page=${page}&limit=6`)
  
  .then(response => {
   
    setPastry(response.data.items); 
    setTotalPages(response.data.totalPages);
  })
  .catch(error => {
    console.error(error);
  });
}
const handlePageChange = (pageNumber) => {
  setCurrentPage(pageNumber);
};

const handleNextPage = () => {
  if (currentPage < totalPages) {
    setCurrentPage(currentPage + 1);
  }
};

const handlePrevPage = () => {
  if (currentPage > 1) {
    setCurrentPage(currentPage - 1);
  }
};


useEffect(()=>{
   getDeco(currentPage);
}, [currentPage])


  return (
    <div className="mt-50 ">
     <h1 className="relative text-white mx-20 text-7xl flex font-bold"> Decoration</h1>
  <div className='grid lg:grid-cols-3 gap-y-8 mt-40 sm:grid-col'>
  { pastry.map((p) => (
     <div key={p._id}> 
        <ThreeDCardDemo id={p._id} category="Decoration" name={p.item} price={p.price} image={p.image}/> 
     </div>
))}
         
     </div>
     <div className='flex justify-center items-center mt-20 sm:w-full'>
     <PaginationDemo 
                currentPage={currentPage}
                totalPages={totalPages}
                handleNextPage={handleNextPage}
                handlePrevPage={handlePrevPage}
                handlePageChange={handlePageChange}
                />
     </div>
     </div>
  )
}

export default Deco