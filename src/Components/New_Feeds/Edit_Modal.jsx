import React, { useState } from 'react';
import Editor from '../../Utils/Editor';
import { IoMdClose } from 'react-icons/io';
import { RiImageAddLine } from 'react-icons/ri';
import { MdNavigateNext } from 'react-icons/md';
import { GrFormPrevious } from 'react-icons/gr';

import showToast from '../../Utils/showToast';

import toast, { useToaster } from 'react-hot-toast';
import { getAllPost, updatePost } from '../../APIs/Post_API';
import { useDispatch } from 'react-redux';
import { getPostSuccess } from '../../Redux/post/postSlice';

const Edit_Modal = (props) => {



    const { open, setOpen } = props;


    const handlePost = props.handlePost;

    const originalImages = props.images;

    const Images = props.images

    const [images, setImages] = useState(Images);

    const length = images.length


    const [text, setText] = useState(props.text);

    const [uploading, setUploading] = useState(false);

    const [imageFiles, setImageFiles] = useState([]);


    const [selectedImageIndex, setSelectedImageIndex] = useState(null);

    const handleImageUpload = (newImages) => {
        setImages([...images, ...newImages]);
    };

    const handleImageFiles = (files) => {
        setImageFiles([...imageFiles, ...files]);
    }





    const handleFileChange = (e) => {
        const newImages = [];
        const files = e.target.files;

        const toastId = toast.loading('Uploading...');

        let success = false;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();

            // Show loading toaster when the FileReader starts

            setUploading(true);


            reader.onloadend = () => {
                setUploading(false);
                showToast({
                    msg: 'Upload complete!',
                    type: 'success',
                    duration: 3000,
                });

                newImages.push(reader.result);

                if (newImages.length === files.length) {
                    // All images have been processed
                    handleImageUpload(newImages);
                    handleImageFiles(files);
                    toast.dismiss(toastId); // Dismiss the loading toaster

                    success = true;

                }
            };


            reader.onerror = () => {
                setUploading(false);
                showToast({
                    msg: 'Error uploading image',
                    type: 'error',
                    duration: 3000,
                });
                toast.dismiss(toastId); // Dismiss the loading toaster in case of an error
            };

            reader.readAsDataURL(file);
        }
    };



    const openImageModal = (index) => {
        setSelectedImageIndex(index);
    };

    const closeImageModal = () => {
        setSelectedImageIndex(null);
        document.body.style.overflow = 'auto';
    };

    const goToPreviousImage = () => {
        setSelectedImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const goToNextImage = () => {
        setSelectedImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };


    const removeImage = (index) => {
        const updatedImages = [...images];
        const updateImageFiles = [...imageFiles];

        updatedImages.splice(index, 1);
        updateImageFiles.splice(index, 1);

        setImages(updatedImages);
        setImageFiles(updateImageFiles);
    };

    const deletedImages = originalImages.filter((image) => !images.includes(image));

    const dispatch = useDispatch();


    const handleUpdate = async () => {

        const toastId = toast.loading('Updating...');

        const token = localStorage.getItem("token");

        if (!token) {
            showToast({
                msg: 'Error updating post',
                type: 'error',
                duration: 3000,
            });
            toast.dismiss(toastId);
            return;
        }

        const response = await updatePost(props.postId, text, imageFiles, deletedImages, token);

        if (response.success) {

            const result = await getAllPost(1, 10);
            if (result.success) {
                dispatch(getPostSuccess(result.data.result));
                showToast({
                    msg: 'Post updated successfully',
                    type: 'success',
                    duration: 3000,
                });
                toast.dismiss(toastId);
                setOpen(false);
            }



            else {
                showToast({
                    msg: result.msg,
                    type: 'error',
                    duration: 3000,
                });
                toast.dismiss(toastId);
            }
        }else{
            showToast({
                msg: response.msg,
                type: 'error',
                duration: 3000,
            });
            toast.dismiss(toastId);
        }
    }

        return (
            <div>
                {open && props.images ? (
                    <div className='fixed select-none top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50'>
                        <div className='block w-[98%] lg:w-[90%] max-w-3xl pb-2 pt-0  bg-white border border-gray-200 rounded-lg shadow h-[98%] sm:h-[93%] relative'>
                            <div className=''>
                                <div className='flex justify-between'>
                                    <h1 className='mx-4 mt-3 text-2xl font-bold font-inter text-gray-800'>Create Post</h1>
                                    <IoMdClose
                                        fontSize={25}
                                        className='mt-3 mr-2 hover:cursor-pointer hover:text-red-600 text-gray-600'
                                        onClick={() => { setOpen(false); setImages(originalImages); document.body.style.overflow = 'auto'; }}
                                    />
                                </div>
                                <hr className='mt-1 border-[0.1px] border-gray-200' />
                            </div>

                            <Editor length={length} text={text} setText={setText} />

                            <div className='absolute -bottom-1 w-full pb-2 mr-2'>
                                <hr className='mt-1 border-[0.1px] border-gray-200 ' />
                                <div className='flex justify-between mt-2 w-[98%]'>
                                    <div className='mt-1 mx-3'>
                                        {!uploading ? <><label htmlFor='imageInput' className='cursor-pointer p-2 rounded-xl text-black font-inter text-sm'>
                                            <RiImageAddLine className='inline hover:text-blue-600' fontSize={25} />
                                        </label>

                                            <input
                                                id='imageInput'
                                                type='file'
                                                accept='image/*'
                                                multiple
                                                className='hidden'
                                                onChange={handleFileChange}
                                            /></> : <div className='uploading font-inter font-semibold'> Uploading...</div>}
                                    </div>
                                    <button className='py-[6px] px-3 font-inter bg-blue-600 rounded-xl text-white' onClick={handleUpdate}>
                                        Update
                                    </button>
                                </div>
                            </div>

                            {/* Display uploaded images */}
                            {images.length > 0 && (
                                <div className='mt-10 pb-2 px-3'>
                                    <div className='flex flex-wrap h-[200px] overflow-y-scroll space-x-5'>
                                        <div></div>
                                        {images.map((image, index) => (
                                            <div key={index} className='relative'>
                                                <img
                                                    src={image.includes("uploads") ? `http://localhost:5000/${image}` : image}   // if image contains src\uploads
                                                    alt={`Uploaded ${index + 1}`}
                                                    className='max-w-[100px] max-h-[130px] m-2 rounded-md object-cover hover:cursor-pointer'
                                                    onClick={() => openImageModal(index)}
                                                />
                                                <IoMdClose
                                                    fontSize={20}
                                                    className='absolute top-3 right-3 p-1 bg-blue-gray-500 rounded-full text-white cursor-pointer'
                                                    onClick={() => removeImage(index)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Slideshow Modal */}
                            {selectedImageIndex !== null && (
                                <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-30 flex justify-center items-center'>
                                    <div className='mx-2 max-w-[650px] max-h-[650px] bg-white border border-gray-200 rounded-lg shadow overflow-hidden relative'>
                                        <img
                                            src={images[selectedImageIndex].includes("uploads") ? `http://localhost:5000/${images[selectedImageIndex]}` : images[selectedImageIndex]}
                                            alt={`Image ${selectedImageIndex + 1}`}
                                            className='max-w-full max-h-full object-cover '
                                        />
                                        {selectedImageIndex !== 0 && (<GrFormPrevious
                                            fontSize={30}
                                            className='absolute bottom-2 left-2 p-2 bg-blue-600 rounded-xl text-white hover:cursor-pointer'
                                            onClick={goToPreviousImage}
                                        />)}
                                        {selectedImageIndex !== images.length - 1 && <MdNavigateNext
                                            fontSize={30}
                                            className='absolute bottom-2 right-2 p-2 bg-blue-600 rounded-xl text-white hover:cursor-pointer'
                                            onClick={goToNextImage}
                                        />}
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



    export default Edit_Modal