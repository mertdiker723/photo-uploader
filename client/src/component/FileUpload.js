import React, { useState, useEffect } from 'react';
import Message from './Message'
import axios from 'axios';


const FileUpload = () => {
    const [image, setFile] = useState();
    const [filename, setFilename] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState({});
    const [message, setMessage] = useState('');
    const [allPhotos, setAllPhotos] = useState([]);

    useEffect(() => {
        axios.get("/allphotos").then(req => {
            setAllPhotos(req.data);
        });
    }, [uploadedFile])

    const onChange = (e) => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);

        try {
            const res = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const { fileName, filePath } = res.data;
            setUploadedFile({ fileName, filePath });

            setMessage('File Uploaded');
        } catch (err) {
            if (err.response.status === 500) {
                setMessage('There was a problem with the server');
            }
            else {
                setMessage(err.response.data.msg);
            }
        }
    }

    return (
        <>
            {message ? <Message msg={message} /> : null}
            <form onSubmit={onSubmit}>
                <div className="custom-file mb-4">
                    <input type="file" className="custom-file-input" id="customFile" onChange={onChange} />
                    <label className="custom-file-label" htmlFor="customFile">{filename}</label>
                </div>
                <input type="submit" value="Upload" className="btn btn-primary btn-block mt-4" />
            </form>
            <div className="row mt-5">
                {
                    allPhotos.map((item, index) => {
                        return (
                            <div key={index} className="col-md-3 col-sm-6 mb-2">
                                <img style={{ width: '200px', height: '200px' }} src={item} alt='' />
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default FileUpload