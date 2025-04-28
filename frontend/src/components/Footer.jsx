import React from 'react';

const Footer = () => {
  return (
    <footer className='mt-auto w-full bg-green-900 py-15'>
      <div className='flex flex-col items-center justify-center'>
        <h2 className='text-2xl font-bold text-white'>Dari</h2>
        <p className='text-lg text-white'>Your companion of traditions</p>
        <div className='flex space-x-6 mt-4'>
          <a href="#" className='text-white hover:underline'>Privacy Policy</a>
          <a href="#" className='text-white hover:underline'>Terms of Use</a>
          <a href="#" className='text-white hover:underline'>Contact us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
