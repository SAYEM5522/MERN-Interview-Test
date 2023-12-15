import React, { useCallback, useEffect,useRef, useState } from 'react';
import axios from "axios"
import { AiOutlineDelete } from "react-icons/ai";
import { CiEraser } from "react-icons/ci";
import { CiSaveUp1 } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { drawLine } from './shape/Line';
import { drawCircle } from './shape/Circle';
import { drawRectangle } from './shape/Rectangle';
import Sidebar from './shape/Sidebar';
const WhiteBoard = ({drawingData,id}) => {
  const canvasRef = useRef(null);
  const [selectedShape, setSelectedShape] = useState('line');
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
  const [lines, setLines] = useState([]);
  const [circles, setCircles] = useState([]);
  const [rectangles, setRectangles] = useState([]);
  const navigate=useNavigate()
  const renderShapes =() => {
    const context = canvasRef.current.getContext('2d');
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    // Render the shape currently being drawn
    switch (selectedShape) {
      case 'line':
        if (isDrawing) {
          drawLine(context, startPosition.x, startPosition.y, currentPosition.x, currentPosition.y);
        }
        break;
      case 'circle':
        if (isDrawing) {
          const radius = Math.sqrt(
            Math.pow(currentPosition.x - startPosition.x, 2) +
            Math.pow(currentPosition.y - startPosition.y, 2)
          );
          drawCircle(context, startPosition.x, startPosition.y, radius);
        }
        break;
      case 'rectangle':
        if (isDrawing) {
          drawRectangle(
            context,
            startPosition.x,
            startPosition.y,
            currentPosition.x,
            currentPosition.y
          );
        }
        break;
      default:
        break;
    }

    // Render existing shapes
    lines.forEach((line) => {
      drawLine(context, line.startX, line.startY, line.endX, line.endY);
    });

    circles.forEach((circle) => {
      drawCircle(context, circle.x, circle.y, circle.radius);
    });

    rectangles.forEach((rectangle) => {
      drawRectangle(
        context,
        rectangle.startX,
        rectangle.startY,
        rectangle.endX,
        rectangle.endY
      );
    });
    
  };
  useEffect(() => {
    if (drawingData) {
      renderShapes();
      setLines(drawingData.filter(shape => shape.type === 'line').map(shape => shape.data));
      setCircles(drawingData.filter(shape => shape.type === 'circle').map(shape => shape.data));
      setRectangles(drawingData.filter(shape => shape.type === 'rectangle').map(shape => shape.data));
    }
  }, [drawingData]);
 
  

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const { offsetX, offsetY } = e.nativeEvent;
    setStartPosition({ x: offsetX, y: offsetY });
    setCurrentPosition({ x: offsetX, y: offsetY });
  };

  const saveDrawing = async () => {
    const shapesToSave = [];
    // Push information about the drawn shapes into shapesToSave
    lines.forEach((line) => {
      shapesToSave.push({ type: 'line', data: line });
    });
    circles.forEach((circle) => {
      shapesToSave.push({ type: 'circle', data: circle });
    });

    rectangles.forEach((rectangle) => {
      shapesToSave.push({ type: 'rectangle', data: rectangle });
    });
   
    try {
      if(id){
        const response = await axios.put(`https://mern-test-i7hp.onrender.com/drowing/updateDrowing/${id}`,{data:shapesToSave});
        const drawingData = response.data;
        toast.success(drawingData)
      } else{
      const response = await axios.post('https://mern-test-i7hp.onrender.com/drowing/createDrowing',{data:shapesToSave});
      const drawingData = response.data;
      toast.success(drawingData)
      }
      
    } catch (error) {
      console.error('Error fetching drawing data:', error);
    }
  };
  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = e.nativeEvent;
    setCurrentPosition({ x: offsetX, y: offsetY });
    renderShapes(); // Render shapes in real-time
  };

  const handleMouseUp = () => {
    setIsDrawing(false);

    switch (selectedShape) {
      case 'line':
        setLines([...lines, { startX: startPosition.x, startY: startPosition.y, endX: currentPosition.x, endY: currentPosition.y }]);
        break;
      case 'circle':
        const radius = Math.sqrt(
          Math.pow(currentPosition.x - startPosition.x, 2) +
          Math.pow(currentPosition.y - startPosition.y, 2)
        );
        setCircles([...circles, { x: startPosition.x, y: startPosition.y, radius }]);
        break;
      case 'rectangle':
        setRectangles([...rectangles, { startX: startPosition.x, startY: startPosition.y, endX: currentPosition.x, endY: currentPosition.y }]);
        break;
      default:
        break;
    }
  };

  const handleClear = () => {
    const context = canvasRef.current.getContext('2d');
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    setLines([]);
    setCircles([]);
    setRectangles([]);
    toast.success("Erased all drawing successfully")
  };
  const handleDelete = async() => {
   try {
       await axios.delete(`https://mern-test-i7hp.onrender.com/drowing/deleteDrowing/${id}`);
        navigate("/")
   } catch (error) {
    toast.error(error.message)
   }
  };
  const handleShape=(data)=>{
    setSelectedShape(data)
  }

  return (
    <div className='relative flex items-center justify-center '>
      <div className="flex-col mr-2 flex bg-white shadow-md rounded-md p-3 py-5 w-[130px]">
        <Sidebar onSelectShape={handleShape}/>
        <div className='flex flex-col'>
          <div onClick={handleClear} className='flex cursor-pointer  py-3 items-center flex-row'>
          <p className=' font-medium text-md' >Clear</p>
          <CiEraser size={27} className='ml-2'/>
          </div>
          <div onClick={saveDrawing} className='flex cursor-pointer  py-3 items-center flex-row'>
        <div className='font-medium text-md' >
          {
            id?<p>Update</p>:<p>Save</p>
          }
        </div>
          <CiSaveUp1 size={25} className='ml-2'/>
          </div>
          { id&&(
            <div onClick={handleDelete} className='flex cursor-pointer  py-3 items-center flex-row'>
         <p className='font-medium text-md' >Delete</p>
          <AiOutlineDelete size={25} className='ml-2'/>
          </div>
          )
          }
          
            </div>
      </div>
      <div className=' relative'>
      <canvas
       className='rounded-md mt-2'
        ref={canvasRef}
        style={{ border: '2px solid #000'
       }}
        width={850}
        height={500}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
      </div>
      <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
/>
    </div>
  );
};

export default WhiteBoard;
