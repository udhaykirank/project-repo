import React, { useState } from 'react'

import './PDFViewer.css';

import {Viewer, Worker} from '@react-pdf-viewer/core'
import { defaultLayoutPlugin} from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';


function PDFViewer() {
    const [pdfFile,setPDFFile] = useState(null);
    const [viewPdf,setViewPdf] = useState(null);
    const fileType=['application/pdf']

    const handleChange = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile && fileType.includes(selectedFile.type)) {
                let reader = new FileReader();
                reader.readAsDataURL(selectedFile);
                reader.onload = (e) => {
                    setPDFFile(e.target.result);
                    setViewPdf(e.target.result); 
                };
            } else {
                setPDFFile(null);
                setViewPdf(null);
            }
        } else {
            console.log('please select');
        }
    };
    
    

    const handleSubmit = (e) =>{
e.preventDefault()

    if(pdfFile!==null){
    setViewPdf(pdfFile)
    }else{
        setViewPdf(null)
    }
}

const newplugin = defaultLayoutPlugin()
  return (
    <div className='container'>

<form onSubmit={handleSubmit}>
    

<div className='click-to-upload-button-top-bar'>
    <label className="file-input-label click-to-upload-button ">
    <input type="file" className="form-control" onChange={handleChange} />
    <FontAwesomeIcon icon={faUpload} className="upload-icon" />
    <span className="upload-icon">Click to Upload</span>
    
    </label>
</div>



    
</form>



    <div className='pdf-container'>
        <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'>
        {viewPdf ? (
                        <Viewer fileUrl={viewPdf} plugins={[newplugin]} />
                    ) : (
                        <div className='no-pdf-message'>No PDF selected</div>
                    )}
        </Worker>
    </div>

</div>
  )
}

export default PDFViewer

