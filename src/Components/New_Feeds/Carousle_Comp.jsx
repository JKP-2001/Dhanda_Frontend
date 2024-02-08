import React from 'react';
import { Carousel } from '@material-tailwind/react';

const Carousel_Comp = (props) => {
  const { openImageModal, images } = props;

  return (
    <Carousel
      className="w-full h-[400px] sm:h-[500px] overflow-hidden z-0"
      
    >
      {images.map((image, index) => (
        <img
          key={index}
          src={`http://localhost:5000/${image}`} 
          alt={`image ${index + 1}`}
          className="h-full w-full object-cover hover:cursor-pointer bg-black"
          onClick={() => openImageModal(index)}
        />
      ))}
    </Carousel>
  );
};

export default Carousel_Comp;
