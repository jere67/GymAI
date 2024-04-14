import React, { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import styles, { layout } from "../style";
import Button from "./Button";

const VideoAnalysis = () => {
  const [analysis, setAnalysis] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleUpload = (file) => {
    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    
    fetch('http://127.0.0.1:5000/upload_video', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not successful.');
        }
        console.log('Upload successful:', response);
        setUploadSuccess(true);
        // Make API request for analysis only after successful upload
        fetchAnalysis();
    })
    .catch(error => {
        console.error('Error uploading file:', error);
        setError('Error uploading file. Please try again.');
    })
    .finally(() => {
        setUploading(false);
    });
  };

  const fetchAnalysis = () => {
    fetch('http://127.0.0.1:5000/analyze_deadlift')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not successful.');
        }
        return response.json();
      })
      .then(data => {
        setAnalysis(data.analysis);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleUpload(file);
    }
  };

  return (
    <section id="features" className={layout.section}>
      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>
          Analyze your form. <br className="sm:block hidden" />
        </h2>
        <p className={`${styles.paragraph} max-w-[570px] mt-5`}>
          Get an easily-digestable analysis on any of your compound lifts and an actionable recommendation plan with just 10 seconds of footage.
        </p>
        <Button onClick={handleButtonClick} styles={`${styles.paragraph} max-w-[570px] mt-5`} />
        <input ref={fileInputRef} type="file" accept="video/*" onChange={handleFileChange} style={{ display: 'none' }} />
        {uploading && <p className={`${styles.paragraph} max-w-[570px] mt-5`}>Uploading...</p>}
        {error && <p className={`${styles.paragraph} max-w-[570px] mt-5`}>{error}</p>}
        {uploadSuccess && <p className={`${styles.paragraph} max-w-[570px] mt-5`}>Upload successful! Loading analysis...</p>}
      </div>

      <div className={layout.sectionInfo}>
        <ReactMarkdown className={`${styles.paragraph} max-w-[570px] mt-5`}>
          {analysis}
        </ReactMarkdown>
      </div>
    </section>
  );
};

export default VideoAnalysis;
