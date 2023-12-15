import React from 'react'
import useData from './hooks/useData'
import { useParams } from 'react-router-dom'
import LoadingIndicator from './LoadingIndicator'
import WhiteBoard from '../whiteBoard/WhiteBoard'

const Drawing = () => {
  const {id}=useParams()
  const {loading,drowing}=useData("getDrowing",id)
  return (
    <div>
      {
        loading?(
          <div className='flex w-full items-center justify-center h-screen'>
          <LoadingIndicator/>
          </div>
        ):(
          <div>
          <WhiteBoard id={id} drawingData={drowing?.drowing}/>
          </div>
        )
      }
    </div>
  )
}

export default Drawing