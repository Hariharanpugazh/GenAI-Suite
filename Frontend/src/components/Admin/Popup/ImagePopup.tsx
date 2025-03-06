import React, { useRef } from "react";

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFileUpload: (file: File) => void;
  title: string;
}

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({ isOpen, onClose, onFileUpload, title }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(file);
      onClose();
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      onFileUpload(file);
      onClose();
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg " style={{ width: "60rem", height:"30rem" }}>
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <div
  className="w-full px-6 py-20 text-center cursor-pointer relative"
  onDrop={handleDrop}
  onDragOver={handleDragOver}
  onDragLeave={handleDragLeave}
  onClick={triggerFileInput}
>
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      borderRadius: "inherit",
      border: "2px dashed",
      borderColor: "transparent",
      maskImage: "linear-gradient(white 0 0) padding-box, linear-gradient(white 0 0)",
      WebkitMaskImage: "linear-gradient(white 0 0) padding-box, linear-gradient(white 0 0)",
      backgroundImage:"linear-gradient(-77deg, #2B08B3 0%, #9420CD 16%, #E0045C 32%, #D90A14 48%, #F25307 64%, #E68704 82%, #7DA523 100%)",
      WebkitMaskComposite: "destination-in",
      maskComposite: "intersect",
    }}
  ></div>
  Drag & Drop your image here or click to upload
</div>

        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
        />
        <button
          onClick={onClose}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ImageUploadModal;
