import React from 'react'
import { useState } from 'react'

const imageSlider = (props) => {
     const images = props.images;//images tiyna arry eka gnnw
     const [activeIndex , setActiveIndex] = useState(0);
  return (
    <div className='w-full flex flex-col items-center '>
        <img src={images[activeIndex]} className="w-[80%] h-[500px] object-contain "/>
        <div className="w-full h-[100px] flex flex-row justify-center gap-4 items-center">
            {
                images.map(
                    (image , index) => {
                        return(
                        <img 
                            key={index} // Add this line
                            src={images[index]} 
                            className={'w-[90px] h-[90px] object-cover rounded-lg' +((activeIndex == index)?" border-2 border-red-500": " ")} 
                            onClick={
                                ()=>{
                                    setActiveIndex(index);
                                }
                            }
                        />
                        )
                    }
                )
            }
        </div>
    </div>
  )
}

export default imageSlider