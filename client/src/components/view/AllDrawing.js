import React from 'react'
import useData from './hooks/useData';
import LoadingIndicator from "./LoadingIndicator"
import { useNavigate } from 'react-router-dom';
const AllDrawing = () => {
  const { drowing, loading} = useData("getAllDrowing");
  const navigate=useNavigate()
 const handlewhiteBoard=()=>{
   navigate("/createWhiteboard")
 }
 const handleSpecificwhiteBoard=(id)=>{
  navigate(`/whiteBoard/${id}`)
 }
  return (
    <div className='flex  mt-5 w-[70%]  mx-auto' >
      <div>
      {
        loading?(
          <div className='flex w-full items-center justify-center h-screen'>
          <LoadingIndicator/>
          </div>
        ):
        <div className='flex items-center w-full flex-row flex-wrap'>
     {
        drowing?.map((item,index)=>{
          return(
            <div onClick={()=>handleSpecificwhiteBoard(item?._id)} className='w-[200px] cursor-pointer m-3 h-[200px] bg-white shadow-md rounded-md' key={index}>
             
             <img  className="w-[350px] z-0  h-[120px]    rounded-lg" src={
                "https://app.supademo.com/no_image.png"
                
                }/>
                <div className='p-3'>
             <p>{item?.name}</p>
             </div>
            </div>
          )
        })
      }
      <div onClick={handlewhiteBoard} className='w-[200px] cursor-pointer flex justify-center items-center m-3 h-[200px] bg-white shadow-md rounded-md'>
      <p className='text-lg font-bold'> Create whiteBoard</p>
      </div>
        </div>
      }
      
    </div>
    
    </div>
  )
}

export default AllDrawing