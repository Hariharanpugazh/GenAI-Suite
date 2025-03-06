import React, { useState, DragEvent } from "react";

interface VideoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFileUpload: (file: File) => void;
}

const VideoUploadModal: React.FC<VideoUploadModalProps> = ({ isOpen, onClose, onFileUpload }) => {
  const [dragging, setDragging] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(file);
      onClose();
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
      onFileUpload(file);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md transition-all">
        <h2 className="text-xl font-semibold mb-4 text-center">Upload Video</h2>

        {/* Upload Box with Proper Gradient Border */}
        <label
          className="relative flex flex-col items-center justify-center w-full h-40 cursor-pointer transition-all bg-white"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{ position: "relative", overflow: "hidden" }}
        >
          <input type="file" className="hidden" accept="video/*" onChange={handleFileChange} />
          
          {/* Gradient Border Only */}
          <div
            className="absolute inset-0 pointer-events-none rounded-lg"
            style={{
                border: "1px",
                borderStyle: "dashed", // Ensures the border is dashed
                borderImageSlice: 1,
                borderImageSource: "linear-gradient(77deg, #2B08B3 0%, #9420CD 16%, #E0045C 32%, #D90A14 48%, #F25307 64%, #E68704 82%, #7DA523 100%)",
                maskImage: "linear-gradient(white 0 0) padding-box, linear-gradient(white 0 0)",
                WebkitMaskImage: "linear-gradient(white 0 0) padding-box, linear-gradient(white 0 0)",
                maskComposite: "intersect",
                WebkitMaskComposite: "destination-in",
            }}
            ></div>


          {/* Drag & Drop Text */}
          <div className="z-10 text-center relative">
            <p className="text-gray-500">Drag & Drop your video <span className="text-blue-500">here</span></p>
            <p className="text-gray-400 text-sm">or click to upload</p>
          </div>
        </label>

        {/* Cancel Button */}
        <button
          onClick={onClose}
          className="mt-4 w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default VideoUploadModal;
