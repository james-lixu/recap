import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Button } from "../ui/button";

type FileUploaderProps = {
  fieldChange: (FILES: File[]) => void;
  mediaUrl: string;
};

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  // const [fileUrl, setFileUrl] = useState<string>(mediaUrl);
  const [fileUrl, setFileUrl] = useState("");

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [file]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".svg"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer"
    >
      <input {...getInputProps()} className="cursor-pointer" />
      {fileUrl ? (
        <div className="flex flex-1 justify-center w-full padding-5 lg:p-10">
          <img 
            src={fileUrl}
            alt="uploaded-image"
            className="file_uploader-img"
          />
        </div>
      ) : (
        <div className="file_uploader-box focus:ring-2 focus:ring-offset-2 focus:ring-clay-ash">
          <img
            src="/assets/icons/file-upload.svg"
            alt="file-upload"
            width={128}
          />

          <h3 className="base-medium text-raffia mb-6 mt-6 font-handlee">
            Drop photo here
          </h3>
          <Button className="shad-button_dark_4 bg-willow-grove mt-4">
            Upload a photo
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
