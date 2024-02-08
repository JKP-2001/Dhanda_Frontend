import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Editor = (props) => {
  
  const {length, text, setText} = props;

  const quillRef = useRef(null);
  



  const handleContentChange = (newContent) => {
    setText(newContent);
  };

  return (
    <ReactQuill
      theme="snow"
      value={text}
      placeholder='What do you want to talk about?'
      onChange={handleContentChange}
      formats={["header", "bold", "italic", "underline", "list", "link"]}
      modules={{
        toolbar: [
          [{ 'header': [false, 1, 2, 3, 4, 5, 6] }],
          ['bold', 'italic', 'underline', 'list', 'link'],
        ],
      }}
      className={`p-3 rounded-md font-inter  ${length>0?"h-[45%]":"h-[70%]"} font-inter`}
      ref={quillRef}
    />
  );
};

export default Editor;
