import React, { useRef, useState, DragEvent, useEffect } from "react";
import { X } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFileUpload: (files: File[]) => void;
  title: string;
}

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({ isOpen, onClose, onFileUpload, title }) => {
  const [dragging, setDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadTimes, setUploadTimes] = useState<Date[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (uploadedFiles.length > 0) {
      setUploadTimes(prevTimes => [...prevTimes, new Date()]);
    }
  }, [uploadedFiles]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setUploadedFiles(prevFiles => [...prevFiles, ...fileArray]);
      setUploadTimes(prevTimes => [...prevTimes, ...Array(fileArray.length).fill(new Date())]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer.files;
    if (files) {
      const fileArray = Array.from(files);
      setUploadedFiles(prevFiles => [...prevFiles, ...fileArray]);
      setUploadTimes(prevTimes => [...prevTimes, ...Array(fileArray.length).fill(new Date())]);
    }
  };

  const handleConfirm = () => {
    if (uploadedFiles.length > 0) {
      onFileUpload(uploadedFiles);
      onClose();
    }
  };

  const getFileSize = (size: number) => {
    if (size < 1024) {
      return `${size} B`;
    } else if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(2)} KB`;
    } else {
      return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    }
  };

  const triggerFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-xl relative transition-all" style={{ width: "1098px", minHeight: "559px" }}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black transition"
        >
          <X size={24} />
        </button>

        <h2 className="text-xl font-semibold mb-6 text-left">{title}</h2>

        <label
          className="relative flex flex-col items-center justify-center w-full cursor-pointer transition-all bg-white rounded-lg"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{
            position: "relative",
            overflow: "hidden",
            border: "8px solid transparent",
            backgroundImage: "url('/border.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "15rem",
          }}
        >
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            multiple
          />
          <div className="z-10 text-center relative">
            <img src="popup-upload.svg" alt="Upload Icon" className="mx-auto mb-2 w-12 h-12" />
            <p className="text-gray-500 text-xs my-4">Click to browse or drag and drop your files</p>
            <button
              onClick={triggerFileInputClick}
              className="px-8 py-2 text-black font-bold rounded-xl border border-black transition"
            >
              Upload Now
            </button>
          </div>
        </label>

        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="text-left">
            <ul className="list-disc list-inside text-gray-500 font-thin">
              <li>JPEG (Most recommended – high compression, good quality)</li>
              <li>PNG (Good for images with transparency)</li>
              <li>GIF (For animated images)</li>
              <li>SVG (For vector graphics)</li>
              <li>WEBP (For high-quality images with smaller file sizes)</li>
            </ul>
          </div>
          <div className="text-left">
            <p className="font-medium text-lg">Uploaded Images:</p>
            <div className="grid grid-cols-2 gap-4" style={{ maxHeight: "10rem", overflowY: "auto" }}>
              {uploadedFiles.map((file, index) => (
                <div key={index} className="bg-white shadow-lg p-4 rounded-md mb-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <img src="Image.svg" alt="Image Icon" />
                      <p className="text-black truncate ml-2  w-20">{file.name}</p>
                    </div>
                    <div className="flex items-center">
                      <p className="text-black text-xs block border p-0.5 border-gray-400 rounded mr-2">
                        {getFileSize(file.size)}
                      </p>
                      <FontAwesomeIcon icon={faEllipsisV} className="text-[#CDD3D8] text-xs" /> {/* Two-dot icon using Font Awesome */}
                    </div>
                  </div>
                  {uploadTimes[index] && (
                    <p className="text-black text-xs ml-4 mt-0.5">{formatDistanceToNow(uploadTimes[index], { addSuffix: true })}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleConfirm}
            className="mt-6 px-4 py-2 bg-black text-white border font-bold rounded-md transition flex items-center"
          >
            Submit
            <img src="PopupSubmit.svg" alt="Upload Icon" className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadModal;
