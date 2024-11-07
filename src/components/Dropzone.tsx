import { ImageMimeTypes } from "@/lib/constants";
import { useDropzone } from "react-dropzone";

interface DropzoneProps {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

export const Dropzone: React.FC<DropzoneProps> = ({ files, setFiles }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: ImageMimeTypes,
    onDrop: (acceptedFiles: File[]) => {
      console.log("Files dropped:", acceptedFiles);
      //* This is a minor thing, but when doing state updates that rely on the previous state, the previous state should be taken from the callback function
      //* setFiles((prevFiles) => [...prevFiles, ...acceptedFiles])
      //* See this part of the react lecture: https://youtu.be/yHFlagmVbB0?si=ssurmeBgDBygy6W4&t=984
      setFiles([...files, ...acceptedFiles]); // Update the state with new files
    },
  });

  return (
    <div className="dropzone">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="text-center">
          Drop files here or click to select files
        </div>
      </div>
      <div>
        {files.map((file) => (
          <div key={file.name}>
            {file.name} - {file.size} bytes
          </div>
        ))}
      </div>
    </div>
  );
};
