// src/components/ShapeSidebar.js
import React, { memo } from 'react';
import { shapes } from '../data';

const Sidebar = ({ onSelectShape }) => {
  const handleShape=(shape)=>{
    onSelectShape(shape)
  }
  return (
    <div >
     {
          shapes.map((item,index)=>(
            <div onClick={()=>handleShape(item.name)} key={index} className='flex cursor-pointer  py-3 items-center flex-row'>
            <p className='font-medium capitalize text-md'>{item.name}</p>
            <item.icon size={24} className='ml-2'/>
            </div>
          ))
        }
    </div>
  );
};

export default memo(Sidebar);
