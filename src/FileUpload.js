// import React , {Fragment, useState} from 'react';
// import axios from 'axios';


// const FileUpload = () => {
//     const [file, setFile] = useState('');
//     const [filename, setFilename] = useState('Choose File');
//     const [uploadedFile, setUploadedFile] = useState({});

//     const onChange = e => {
    //         setFile(e.target.files[0]);
    //         setFilename(e.target.files[0].name);    
    //     };
    
    //     const onSubmit = async e => {
        //         e.preventDefault();
        //         const formData = new FormData();
//         formData.append('file',file);

//         try{
//             const res = await axios.post('/upload', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });

//             const {fileName, filePath} = res.data;

//             setUploadedFile({ fileName, filePath });

//         } catch (err) {
//             if(err.response.status === 500) {
    //                     console.log('There was a problem in server');
    //                 } else{
        //                     console.log(err.response.data.msg);
        //                 }
        //         }
        //     }
        
        //     return (
            //         <Fragment>
            //             <form onSubmit={onSubmit}>
            //                 <div className="custom-file mb-4">
//                     <input type="file" className="custom-file-input" id="customFile" onChange={onChange}/>
//                     <label className="custom-file-label" htmlFor="customFile">{filename}</label>
//                 </div>
//                 <input type="submit" value="Upload" className='btn btn-primary btn-block mt-4'/> 
//             </form>
//             {uploadedFile ? (
    //                 <div className="row mt-5">
//                     <div className="col-md-6 m-auto">
//                         <h3 className="text-center">
//                             {uploadedFile.fileName}
//                         </h3>
//                         <img style={{width: '100%'}} src={uploadedFile.filePath} alt='' />
//                     </div>
//                 </div>
//             ) : null }
//         </Fragment>
//     )
// }

// export default FileUpload;





import { useRef, useState } from "react";
import axios from 'axios';

export default function FileUpload() {
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState('');
    const fileInput = useRef();
    const [resultText, setresultText] = useState();

    
    const saveFile = () => {
        setFile(fileInput.current.files[0]);
        setFileName(fileInput.current.files[0].name);

    }

    const uploadFile = async () => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', fileName);

        try{
            const res = await axios.post('http://localhost:8000/upload', formData)
            setresultText(res.data.message)
            fileInput.current.value = "";
            setTimeout(() => {
                setresultText('')
            },5000)
        }catch(ex){
            if (ex.response !== undefined) {
            setresultText(ex.response.data.message)
        }else{
            setresultText('Server Error');
        }
        setTimeout(() => {
            setresultText('')
        },5000)
        }
    }

    return(
        <div className="mt-5 text-center">
            <input type="file" ref={fileInput} onChange={saveFile} />
            <button onClick={uploadFile} className='btn btn-primary btn-block' >Upload</button>
            { resultText ?( <p> {resultText} </p> ) : null }
            {uploadFile ? ( <p>{fileName}</p> ) : null }
        </div>
    )
}
