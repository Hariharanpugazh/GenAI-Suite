import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SuperadminSidebar from "@/components/Superadmin/SuperadminSidebar";

const PostProduct: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Product Information
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [category, setCategory] = useState("");
  const [video, setVideo] = useState<File | null>(null);
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  // User Journey
  const [userJourneys, setUserJourneys] = useState([{ journey: "", description: "" }]);

  // Product Features
  const [productFeatures, setProductFeatures] = useState([{ feature: "", description: "" }]);

  const MAX_NAME_LENGTH = 50;
  const MAX_DESC_LENGTH = 300;

  // Handle adding/removing user journeys
  const addUserJourney = () => {
    if (userJourneys.length < 6) {
      setUserJourneys([...userJourneys, { journey: "", description: "" }]);
    }
  };

  const removeUserJourney = (index: number) => {
    setUserJourneys(userJourneys.filter((_, i) => i !== index));
  };

  const addProductFeature = () => {
    if (productFeatures.length < 8) {
      setProductFeatures([...productFeatures, { feature: "", description: "" }]);
    }
  };

  const removeProductFeature = (index: number) => {
    setProductFeatures(productFeatures.filter((_, i) => i !== index));
  };

  // Handle file uploads
  const handleFileUpload = (setFile: React.Dispatch<React.SetStateAction<File | null>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  // Handle API Submission
  const handleSubmit = async () => {
    if (!window.confirm("Are you sure you want to submit this product?")) return;

    const token = Cookies.get("jwt");
    if (!token) {
      toast.error("No token found. Please log in.");
      return;
    }

    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const userId = decodedToken.id;
    const userRole = decodedToken.role;

    const formData = new FormData();

    // Prepare user journey and product features data
    const formattedData: { 
      product_name: string; 
      product_description: string; 
      category: string; 
      role: any; 
      userId: any; 
      [key: string]: any 
    } = {
      product_name: productName,
      product_description: productDesc,
      category: category,
      role: userRole,
      userId: userId,
    };

    userJourneys.forEach((uj, index) => {
      formattedData[`user_journey_${index + 1}`] = uj.journey;
      formattedData[`user_journey_description_${index + 1}`] = uj.description;
    });

    productFeatures.forEach((pf, index) => {
      formattedData[`product_feature_${index + 1}`] = pf.feature;
      formattedData[`product_feature_description_${index + 1}`] = pf.description;
    });

    formData.append("data", JSON.stringify(formattedData));

    if (video) formData.append("demo_video", video);
    if (screenshot) formData.append("screenshot", screenshot);
    if (thumbnail) formData.append("thumbnail", thumbnail);

    try {
      await axios.post("http://localhost:8000/api/post_product/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Product submitted successfully!");
      navigate("/products");
    } catch (error) {
      toast.error("Failed to submit product!");
    }
  };

  return (
    <div className="flex">
      <SuperadminSidebar />
      <div className="p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold">Create a New Product</h2>
        <hr className="my-4" />

        {step === 1 && (
          <>
            <label className="block font-semibold">Product Name:</label>
            <input
              type="text"
              className="w-full border p-2 rounded-md"
              placeholder="Enter product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              maxLength={MAX_NAME_LENGTH}
            />
            <p className="text-right text-sm">{productName.length} / {MAX_NAME_LENGTH}</p>

            <label className="block font-semibold mt-4">Product Description:</label>
            <textarea
              className="w-full border p-2 rounded-md"
              placeholder="Enter product description"
              value={productDesc}
              onChange={(e) => setProductDesc(e.target.value)}
              maxLength={MAX_DESC_LENGTH}
            />
            <p className="text-right text-sm">{productDesc.length} / {MAX_DESC_LENGTH}</p>

            <label className="block font-semibold mt-4">Category:</label>
            <input
              type="text"
              className="w-full border p-2 rounded-md"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />

            <div className="mt-4">
              <label className="block font-semibold">Upload Demo Video:</label>
              <input
                type="file"
                className="w-full border p-2 rounded-md"
                onChange={handleFileUpload(setVideo)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block font-semibold">Upload Screenshot:</label>
                <input
                  type="file"
                  className="w-full border p-2 rounded-md"
                  onChange={handleFileUpload(setScreenshot)}
                />
              </div>

              <div>
                <label className="block font-semibold">Upload Thumbnail:</label>
                <input
                  type="file"
                  className="w-full border p-2 rounded-md"
                  onChange={handleFileUpload(setThumbnail)}
                />
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setStep(2)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Next
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h3 className="text-lg font-semibold">Enter User Journey:</h3>
            {userJourneys.map((uj, index) => (
              <div key={index} className="mt-4">
                <input
                  type="text"
                  className="w-full border p-2 rounded-md"
                  placeholder={`User Journey ${index + 1}`}
                  value={uj.journey}
                  onChange={(e) => {
                    const updated = [...userJourneys];
                    updated[index].journey = e.target.value;
                    setUserJourneys(updated);
                  }}
                />
                <textarea
                  className="w-full border p-2 rounded-md mt-2"
                  placeholder="Description"
                  value={uj.description}
                  onChange={(e) => {
                    const updated = [...userJourneys];
                    updated[index].description = e.target.value;
                    setUserJourneys(updated);
                  }}
                />
                <button
                  type="button"
                  onClick={() => removeUserJourney(index)}
                  className="text-red-500 mt-2"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={addUserJourney}
              disabled={userJourneys.length >= 6}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg mt-2"
            >
              + Add More
            </button>
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setStep(1)}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Next
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h3 className="text-lg font-semibold">Enter Product Features:</h3>
            {productFeatures.map((pf, index) => (
              <div key={index} className="mt-4">
                <input
                  type="text"
                  className="w-full border p-2 rounded-md"
                  placeholder={`Feature ${index + 1}`}
                  value={pf.feature}
                  onChange={(e) => {
                    const updated = [...productFeatures];
                    updated[index].feature = e.target.value;
                    setProductFeatures(updated);
                  }}
                />
                <textarea
                  className="w-full border p-2 rounded-md mt-2"
                  placeholder="Description"
                  value={pf.description}
                  onChange={(e) => {
                    const updated = [...productFeatures];
                    updated[index].description = e.target.value;
                    setProductFeatures(updated);
                  }}
                />
                <button
                  type="button"
                  onClick={() => removeProductFeature(index)}
                  className="text-red-500 mt-2"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={addProductFeature}
              disabled={productFeatures.length >= 8}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg mt-2"
            >
              + Add More
            </button>
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setStep(2)}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                Finish
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PostProduct;
