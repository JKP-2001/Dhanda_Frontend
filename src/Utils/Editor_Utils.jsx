import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Editor_Utils = ({ placeholder }) => {
  const [editorHtml, setEditorHtml] = useState('');
  const [theme, setTheme] = useState('snow');
  const [color, setColor] = useState('#000000');

  const handleChange = (html) => {
    setEditorHtml(html);
  };


  return (
    <div>
      <ReactQuill
        theme={theme}
        onChange={handleChange}
        value={editorHtml}
        modules={Editor_Utils.modules}
        formats={Editor_Utils.formats}
        bounds={'.app'}
        placeholder={placeholder}
        style={{ color: color }}
        className='p-3 rounded-md font-inter'
      />
    </div>
  );
};

Editor_Utils.propTypes = {
  placeholder: PropTypes.string,
};

Editor_Utils.modules = {
  toolbar: [
  
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    ['link'],
    ['clean'],
    [{ 'color': [] }],
  ],
  clipboard: {
    matchVisual: false,
  }
};

Editor_Utils.formats = [
  
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'link', 'color'
];

export default Editor_Utils;
