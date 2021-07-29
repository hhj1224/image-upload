import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import "./UploadForm.css"
import ProgressBar from './ProgressBar'

const UploadForm = () => {
    const defaultFileName = "이미지 파일을 업로드 해주세요.";
    const [file, setFile] = useState(null);
    const [imgSrc, setImageSrc] =  useState(null);
    const [fileName, setFileName] = useState(defaultFileName);
    const [percent, setPercent] = useState(0);

    const imageSelectHandler = (event) => {
        const imageFile = event.target.files[0];
        setFile(imageFile);
        setFileName(imageFile.name);
        const fileReader = new FileReader();
        fileReader.readAsDataURL(imageFile);
        fileReader.onload = (e) => setImageSrc(e.target.result);

    };

    const onSubmit = async (e) => {
        e.preventDefault();// 기본행동(새로고침)방지
        const formData = new FormData();
        formData.append("image", file)
        try{
            const res = await axios.post("/upload", formData, {
                headers: {"Content-Type": "multipart/form-data"},
                onUploadProgress: (e) => {
                    setPercent(Math.round((100 * e.loaded)/e.total));
                }
            });
            toast.success("이미지 업로드 성공");
            setTimeout(() => {
                setPercent(0);
                setFileName(defaultFileName);
                setImageSrc(null);
            }, 3000);
            
        }catch(err){
            toast.error(err.message);
            setPercent(0);
            setFileName(defaultFileName);
            setImageSrc(null);
            console.error(err);
        }
    }

    return(
        <form onSubmit={onSubmit}>
            <img src={imgSrc} className={`image-preview ${imgSrc && "image-preview-show"}`} />
            <ProgressBar percent={percent} />
            <div className="file-dropper">
                {fileName}
                <input 
                    id="image" 
                    type="file" 
                    accept="image/*"
                    onChange={imageSelectHandler}
                />
            </div>
            <button type="submit" style={{width: "100%", borderRadius: 3, height: 40, cursor: "pointer"}}>제출</button>
        </form>
    );
};

export default UploadForm;