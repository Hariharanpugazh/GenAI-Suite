import React, { useState, DragEvent, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

interface VideoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFileUpload: (file: File) => void;
}

const VideoUploadModal: React.FC<VideoUploadModalProps> = ({ isOpen, onClose, onFileUpload }) => {
  const [dragging, setDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadTime, setUploadTime] = useState<Date | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (uploadedFile) {
      setUploadTime(new Date());
    }
  }, [uploadedFile]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setUploadTime(new Date());
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
    const file = e.dataTransfer.files[0];
    if (file) {
      setUploadedFile(file);
      setUploadTime(new Date());
    }
  };

  const handleConfirm = () => {
    if (uploadedFile) {
      onFileUpload(uploadedFile);
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
      <div className="bg-white p-6 rounded-lg shadow-xl relative transition-all" style={{ width: "1098px", height: "559px" }}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black transition"
        >
          <X size={24} />
        </button>

        <h2 className="text-xl font-semibold mb-6 text-left">Upload product demo video:</h2>

        <label
          className="relative flex flex-col items-center justify-center w-full h-40 cursor-pointer transition-all bg-white rounded-lg"
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
            accept="video/*"
            onChange={handleFileChange}
            ref={fileInputRef}
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
              <li>MP4 (Most recommended – high compression, good quality)</li>
              <li>WEBM (Good for web-based applications)</li>
              <li>AVI (Larger files, but widely supported)</li>
              <li>MOV (Apple devices compatibility)</li>
              <li>MKV (For high-quality video files)</li>
            </ul>
          </div>
          <div className="text-left">
            <p className="font-medium text-lg">Uploaded Video:</p>
            {uploadedFile && (
              <div className="bg-white shadow-lg p-4 rounded-md">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <img src="Video.svg" alt="Video Icon" />
                    <p className="text-black truncate ml-2 max-w-xs">{uploadedFile.name}</p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-black text-xs block border p-0.5 border-gray-400 rounded mr-2">
                      {getFileSize(uploadedFile.size)}
                    </p>
                    <FontAwesomeIcon icon={faEllipsisV} className="text-[#CDD3D8] text-xs" /> {/* Two-dot icon using Font Awesome */}
                  </div>
                </div>
                {uploadTime && (
                  <p className="text-black text-xs ml-6 mt-0.5">{formatDistanceToNow(uploadTime, { addSuffix: true })}</p>
                )}
              </div>
            )}
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

export default VideoUploadModal;
