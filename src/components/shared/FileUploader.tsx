import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const FileUploader = () => {
  const [fileUrl, setfileUrl] = useState('');

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer">
      <input {...getInputProps()} className="cursor-pointer"/>
      { fileUrl ? (
                <div>
                test 1
              </div>
      ) : (
<div className="file_uploader-box focus:ring-2 focus:ring-offset-2 focus:ring-clay-ash">
          <img 
            src="/assets/icons/file-upload.svg"
            alt="file-upload"
          />
        </div>
      )}
    </div>
  );
};

export default FileUploader;
