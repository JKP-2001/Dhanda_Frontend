import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Editor = (props) => {
  const { length, text, setText, comment, placeholder } = props;
  const quillRef = useRef(null);


  const handleContentChange = (newContent) => {
    setText(newContent);
  };

  return (
    <ReactQuill
      theme="snow"
      value={text}
      placeholder={placeholder}
      onChange={handleContentChange}
      modules={Editor.modules}
      formats={Editor.formats}
      className={` rounded-md font-inter ${comment?"h-[75px] sm:h-[65px]":length > 0 ? "h-[45%]" : "h-[70%]"} font-inter`}
      ref={quillRef}
    />
  );
};

Editor.modules = {
  toolbar: [
    
    ['bold', 'italic', 'underline', 'strike'],
    ['link'],
    [{ 'color': [] }],
  ],
  clipboard: {
    matchVisual: false,
  }
};

Editor.formats = [
  'bold', 'italic', 'underline', 'strike',
  'link', 'color'
];

export default Editor;
