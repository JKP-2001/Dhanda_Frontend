import React, { useState } from 'react';
import Editor from '../../Utils/Editor';
import { IoMdClose } from 'react-icons/io';
import { RiImageAddLine } from 'react-icons/ri';
import { MdNavigateNext } from 'react-icons/md';
import { GrFormPrevious } from 'react-icons/gr';

const Post_Modal = (props) => {
  const { open, setOpen } = props;

  const handlePost = props.handlePost;

  const images = props.images 
  const setImages = props.setImages;

  const text = props.text
  const setText = props.setText;


  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const handleImageUpload = (newImages) => {
    setImages([...images, ...newImages]);
  };

  const handleFileChange = (e) => {
    const newImages = [];
    const files = e.target.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onloadend = () => {
        newImages.push(reader.result);

        if (newImages.length === files.length) {
          // All images have been processed
          handleImageUpload(newImages);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const openImageModal = (index) => {
    setSelectedImageIndex(index);
  };

  const closeImageModal = () => {
    setSelectedImageIndex(null);
  };

  const goToPreviousImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div>
      {open ? (
        <div className='fixed select-none top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10 flex justify-center items-center'>
          <div className='block w-[98%] lg:w-[90%] max-w-3xl pb-2 pt-0 z-20 bg-white border border-gray-200 rounded-lg shadow h-[98%] sm:h-[93%] relative'>
            <div className=''>
              <div className='flex justify-between'>
                <h1 className='mx-4 mt-3 text-2xl font-bold font-inter text-gray-800'>Create Post</h1>
                <IoMdClose
                  fontSize={25}
                  className='mt-3 mr-2 hover:cursor-pointer text-gray-600'
                  onClick={() => setOpen(false)}
                />
              </div>
              <hr className='mt-1 border-[0.1px] border-gray-200' />
            </div>

            <Editor length={images.length} text={text} setText={setText}/>

            <div className='absolute -bottom-1 w-full pb-2 mr-2'>
              <hr className='mt-1 border-[0.1px] border-gray-200 ' />
              <div className='flex justify-between mt-2 w-[98%]'>
                <div className='mt-1 mx-3'>
                  <label htmlFor='imageInput' className='cursor-pointer p-2 rounded-xl text-black font-inter text-sm'>
                    <RiImageAddLine className='inline' fontSize={25} />
                  </label>

                  <input
                    id='imageInput'
                    type='file'
                    accept='image/*'
                    multiple
                    className='hidden'
                    onChange={handleFileChange}
                  />
                </div>
                <button className='p-2 bg-blue-600 rounded-xl text-white' onClick={handlePost}>
                  Post
                </button>
              </div>
            </div>

            {/* Display uploaded images */}
            {images.length > 0 && (
              <div className='mt-10 pb-2 px-3'>
                <div className='flex flex-wrap h-[200px] overflow-y-scroll space-x-5'>
                  <div></div>
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Uploaded ${index + 1}`}
                      className='max-w-[100px] max-h-[130px] m-2 rounded-md object-cover hover:cursor-pointer'
                      onClick={() => openImageModal(index)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Slideshow Modal */}
            {selectedImageIndex !== null && (
              <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-30 flex justify-center items-center'>
                <div className='mx-2 max-w-[700px] max-h-[700px] bg-white border border-gray-200 rounded-lg shadow overflow-hidden relative'>
                  <img
                    src={images[selectedImageIndex]}
                    alt={`Image ${selectedImageIndex + 1}`}
                    className='max-w-full max-h-full object-cover '
                  />
                  <GrFormPrevious
                    fontSize={30}
                    className='absolute bottom-2 left-2 p-2 bg-blue-600 rounded-xl text-white hover:cursor-pointer'
                    onClick={goToPreviousImage}
                  />
                  <MdNavigateNext
                    fontSize={30}
                    className='absolute bottom-2 right-2 p-2 bg-blue-600 rounded-xl text-white hover:cursor-pointer'
                    onClick={goToNextImage}
                  />
                  <IoMdClose
                    fontSize={30}
                    className='absolute top-2 right-2 p-2 bg-blue-600 rounded-xl text-white hover:cursor-pointer'
                    onClick={closeImageModal}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <button className='p-4 bg-blue-600 text-white' onClick={() => setOpen(true)}>
          Open
        </button>
      )}
    </div>
  );
};

export default Post_Modal;
