import React, { useEffect, useState, useContext } from 'react';
import { ImageContext } from '../context/ImageContext';

const ImageList = () => {
    const [images] = useContext(ImageContext);
    const imglist = images.map((image) => (
        <img 
            style={{width:"100%"}} 
            key={image.key} 
            src={`http://localhost:5000/upload/${image.key}`} 
        />
    ));
    return (
    <div>
        <h3>Image List</h3>
        {imglist}    
    </div>
    )
};

export default ImageList;