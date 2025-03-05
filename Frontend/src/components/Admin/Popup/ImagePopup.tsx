import React from "react";

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFileUpload: (file: File) => void;
  title: string;
}

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({ isOpen, onClose, onFileUpload, title }) => {
  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(file);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <input
          type="file"
          className="w-full border p-2 rounded-md"
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
