import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminPageNavbar from "@/components/Admin/AdminSidebar"; // Import AdminPageNavbar
import SuperAdminPageNavbar from "@/components/Superadmin/SuperadminSidebar"; // Import SuperAdminPageNavbar
import VideoUploadModal from "@/components/Admin/Popup/VideoPopup";
import ImageUploadModal from "@/components/Admin/Popup/ImagePopup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { formatDistanceToNow } from 'date-fns';

const PostProduct: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [userRole, setUserRole] = useState(null);
  const [heading, setHeading] = useState("Create a New Product");

  // Product Information
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [category, setCategory] = useState("");
  const [video, setVideo] = useState<File | null>(null);
  const [screenshots, setScreenshots] = useState<File[]>([]);
  const [thumbnails, setThumbnails] = useState<File[]>([]);

  // User Journey
  const [userJourneys, setUserJourneys] = useState([
    { journey: "", description: "" },
    { journey: "", description: "" },
    { journey: "", description: "" },
    { journey: "", description: "" }
  ]);

  // Product Features
  const [productFeatures, setProductFeatures] = useState([
    { feature: "", description: "" },
    { feature: "", description: "" },
    { feature: "", description: "" },
    { feature: "", description: "" },
    { feature: "", description: "" },
    { feature: "", description: "" }
  ]);

  const MAX_NAME_LENGTH = 50;
  const MAX_DESC_LENGTH = 300;
  const MAX_JOURNEY_LENGTH = 50;
  const MAX_JOURNEY_DESC_LENGTH = 300;
  const MAX_FEATURE_LENGTH = 50;
  const MAX_FEATURE_DESC_LENGTH = 300;

  // Modal state
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isScreenshotModalOpen, setIsScreenshotModalOpen] = useState(false);
  const [isThumbnailModalOpen, setIsThumbnailModalOpen] = useState(false);

  // Uploaded file states
  const [uploadedVideo, setUploadedVideo] = useState<File | null>(null);
  const [uploadedScreenshots, setUploadedScreenshots] = useState<File[]>([]);
  const [uploadedThumbnails, setUploadedThumbnails] = useState<File[]>([]);
  const [videoUploadTime, setVideoUploadTime] = useState<Date | null>(null);
  const [screenshotUploadTimes, setScreenshotUploadTimes] = useState<Date[]>([]);
  const [thumbnailUploadTimes, setThumbnailUploadTimes] = useState<Date[]>([]);

  useEffect(() => {
    const token = Cookies.get("jwt");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
      setUserRole(payload.role); // Set the user role
    }
  }, []);

  useEffect(() => {
    if (step === 2) {
      setHeading("Enter User Journey");
    } else if (step === 3) {
      setHeading("Enter Product Features");
    } else {
      setHeading("Create a New Product");
    }
  }, [step]);

  // Handle adding/removing user journeys
  const addUserJourney = () => {
    if (userJourneys.length < 6) {
      setUserJourneys([...userJourneys, { journey: "", description: "" }]);
    }
  };

  const getOrdinal = (num: number): string => {
    if (num > 0) {
      const lastDigit = num % 10;
      const lastTwoDigits = num % 100;

      if (lastDigit === 1 && lastTwoDigits !== 11) {
        return `${num}st`;
      } else if (lastDigit === 2 && lastTwoDigits !== 12) {
        return `${num}nd`;
      } else if (lastDigit === 3 && lastTwoDigits !== 13) {
        return `${num}rd`;
      } else {
        return `${num}th`;
      }
    }
    return `${num}`;
  };

  const removeUserJourney = (index: number) => {
    if (index >= 4) {
      setUserJourneys(userJourneys.filter((_, i) => i !== index));
    }
  };

  const addProductFeature = () => {
    if (productFeatures.length < 8) {
      setProductFeatures([...productFeatures, { feature: "", description: "" }]);
    }
  };

  const removeProductFeature = (index: number) => {
    setProductFeatures(productFeatures.filter((_, i) => i !== index));
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
      [key: string]: any;
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
    screenshots.forEach((screenshot) => formData.append("screenshots", screenshot));
    thumbnails.forEach((thumbnail) => formData.append("thumbnails", thumbnail));

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

  const getFileSize = (size: number): string => {
    if (size < 1024) {
      return `${size} B`;
    } else if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(2)} KB`;
    } else {
      return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    }
  };

  const validateStep1 = () => {
    if (!productName || !productDesc || !category || !video || screenshots.length === 0 || thumbnails.length === 0) {
      toast.error("All fields are required to proceed.");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    const validJourneys = userJourneys.filter(uj => uj.journey && uj.description);
    if (validJourneys.length < 4) {
      toast.error("At least 4 user journeys are required.");
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    const validFeatures = productFeatures.filter(pf => pf.feature && pf.description);
    if (validFeatures.length < 6) {
      toast.error("At least 6 product features are required.");
      return false;
    }
    return true;
  };

  return (
    <div className="flex bg-[F8F9FA]">
      {userRole === "admin" && <AdminPageNavbar />}
      {userRole === "superadmin" && <SuperAdminPageNavbar />}
      <div className="p-6 w-full my-8 mx-16">
        <h2 className="text-2xl font-bold">{heading}</h2>
        <h5 className="text-lg font-thin mt-4 opacity-60"> Effortlessly add new products to your platform by providing key details such as name, description, template type, and resources. Customize product settings and ensure seamless integration into the marketplace.</h5>
        <hr className="my-6 border-black " />

        {step === 1 && (
          <>
            <label className="block text-xl font-semibold">Enter product Name:*</label>
            <label className="block text-md opacity-60 font-thin my-3">Give your product a unique and descriptive name that reflects its purpose and value.</label>
            <div className="flex items-center">
              <div className="relative w-96 pr-3" style={{ width: '35.3rem' }}>
                <input
                  type="text"
                  className="w-full m-0.5 p-2 rounded-md bg-white relative z-10 focus:outline-none"
                  placeholder="Enter product name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  maxLength={MAX_NAME_LENGTH}
                />

                <div className="absolute inset-0 rounded-md p-[1px] bg-gradient-to-r from-[#0795D4] via-[#DD0808] to-[#2606B3] opacity-50">
                  <div className="w-full h-full bg-white rounded-md"></div>
                </div>
              </div>
              <p className="ml-2 text-sm">{productName.length} / {MAX_NAME_LENGTH}</p>
            </div>

            <label className="block text-xl mt-8 font-semibold">Enter product description:*</label>
            <label className="block text-md opacity-60 font-thin my-3">Give your product a unique and descriptive name that reflects its purpose and value.</label>
            <div className="relative w-full h-40 pr-3 mt-5">
              <textarea
                className="w-full m-0.5 p-2 rounded-md bg-white relative z-10 focus:outline-none resize-none h-32"
                placeholder="Enter product description"
                value={productDesc}
                onChange={(e) => setProductDesc(e.target.value)}
                maxLength={MAX_DESC_LENGTH}
              />

              <div className="absolute inset-0 rounded-md p-[1px] bg-gradient-to-r from-[#0795D4] via-[#DD0808] to-[#2606B3] opacity-50">
                <div className="w-full h-full bg-white rounded-md"></div>
              </div>
            </div>
            <p className="text-right text-sm">{productDesc.length} / {MAX_DESC_LENGTH}</p>

            <label className="block text-xl mt-8 font-semibold">Enter Category:*</label>
            <label className="block text-md opacity-60 font-thin my-3">Give your product a unique and descriptive name that reflects its purpose and value.</label>

            <div className="relative w-full h-11 pr-3 mt-5" style={{ width: '35.3rem' }}>
              <select
                className="w-full m-0.5 p-2 rounded-md bg-white relative z-10 focus:outline-none "
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" disabled>Select a category</option>
                <option value="Smart City/Manufacturing">Smart City/Manufacturing</option>
                <option value="Health Care">Health Care</option>
                <option value="Agriculture and Food Technology">Agriculture and Food Technology</option>
                <option value="Aerospace and Defence">Aerospace and Defence</option>
                <option value="Automobile">Automobile</option>
                <option value="Retail [FMCG], Real Estate, Entertainment & Finance [BFSI]">
                  Retail [FMCG], Real Estate, Entertainment & Finance [BFSI]
                </option>
                <option value="Power / Energy">Power / Energy</option>
              </select>

              <div className="absolute inset-0 rounded-md p-[1px] bg-gradient-to-r from-[#0795D4] via-[#DD0808] to-[#2606B3] opacity-50">
                <div className="w-full h-full bg-white rounded-md"></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
  <div>
    <label className="block text-xl mt-8 font-semibold">Upload demo video of the product</label>
    <label className="block text-md opacity-60 font-thin my-3">Give your product a unique and descriptive name that reflects.</label>
    <button
      onClick={() => setIsVideoModalOpen(true)}
      className="border py-3 px-28 mt-4 rounded-xl bg-black text-white cursor-pointer whitespace-nowrap overflow-hidden"
      style={{ fontSize: '1rem' }} // Adjust font size if needed
    >
      Upload Video
    </button>
    {uploadedVideo && (
      <div className="bg-white shadow-lg p-4 ml-0.5 rounded-md w-80 mt-4" style={{ width: '26rem' }}>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src="Video.svg" alt="Video Icon" className="w-4" />
            <p className="text-black truncate ml-2 w-32">{uploadedVideo.name}</p>
          </div>
          <div className="flex items-center">
            <p className="text-black text-xs block border p-0.5 border-gray-400 rounded mr-2">
              {getFileSize(uploadedVideo.size)}
            </p>
            <FontAwesomeIcon icon={faEllipsisV} className="text-[#CDD3D8] text-xs" /> {/* Two-dot icon using Font Awesome */}
          </div>
        </div>
        {videoUploadTime && (
          <p className="text-black text-xs ml-6 mt-0.5">{formatDistanceToNow(videoUploadTime, { addSuffix: true })}</p>
        )}
      </div>
    )}
  </div>
  <div>
    <label className="block text-xl mt-8 font-semibold">Upload Screenshots of the product</label>
    <label className="block text-md opacity-60 font-thin my-3">Give your product a unique and descriptive name that reflects.</label>
    <button
      onClick={() => setIsScreenshotModalOpen(true)}
      className="border py-3 px-24 mt-4 rounded-xl bg-black text-white cursor-pointer whitespace-nowrap overflow-hidden"
      style={{ fontSize: '1rem' }} // Adjust font size if needed
    >
      Upload Screenshots
    </button>
    {uploadedScreenshots.map((screenshot, index) => (
      <div key={index} className="bg-white shadow-lg p-4 ml-0.5 rounded-md w-80 mt-4" style={{ width: '26rem' }}>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src="Image.svg" alt="Thumbnail Icon" className="w-4" />
            <p className="text-black truncate ml-2 w-32">{screenshot.name}</p>
          </div>
          <div className="flex items-center">
            <p className="text-black text-xs block border p-0.5 border-gray-400 rounded mr-2">
              {getFileSize(screenshot.size)}
            </p>
            <FontAwesomeIcon icon={faEllipsisV} className="text-[#CDD3D8] text-xs" /> {/* Two-dot icon using Font Awesome */}
          </div>
        </div>
        {screenshotUploadTimes[index] && (
          <p className="text-black text-xs ml-6 mt-0.5">{formatDistanceToNow(screenshotUploadTimes[index], { addSuffix: true })}</p>
        )}
      </div>
    ))}
  </div>
</div>

            <div>
              <label className="block text-xl mt-8 font-semibold">Upload Thumbnails of the product</label>
              <label className="block text-md opacity-60 font-thin my-3">Give your product a unique and descriptive name that reflects.</label>
              <button
                onClick={() => setIsThumbnailModalOpen(true)}
                className=" border py-3 px-24 my-4 rounded-xl bg-black text-white cursor-pointer"
              >
                Upload Thumbnails
              </button>
              {uploadedThumbnails.map((thumbnail, index) => (
                <div className="bg-white shadow-lg p-4 ml-0.5 rounded-md w-80 mt-4" style={{ width: '26rem' }}>zxc
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <img src="Image.svg" alt="Thumbnail Icon" className="w-4" />
                      <p className="text-black truncate ml-2 w-32">{thumbnail.name}</p>
                    </div>
                    <div className="flex items-center">
                      <p className="text-black text-xs block border p-0.5 border-gray-400 rounded mr-2">
                        {getFileSize(thumbnail.size)}
                      </p>
                      <FontAwesomeIcon icon={faEllipsisV} className="text-[#CDD3D8] text-xs" /> {/* Two-dot icon using Font Awesome */}
                    </div>
                  </div>
                  {thumbnailUploadTimes[index] && (
                    <p className="text-black text-xs ml-6 mt-0.5">{formatDistanceToNow(thumbnailUploadTimes[index], { addSuffix: true })}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => {
                  if (validateStep1()) {
                    setStep(2);
                  }
                }}
                className="bg-black text-white px-4 py-1 mt-2 flex rounded-lg"
              >
                Next
                <img src="next.svg" alt="Upload Icon" className="ml-2 mt-0.5 h-6 w-6" />
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            {userJourneys.map((uj, index) => (
              <div key={index} className="mt-4">
                <div className="flex items-center mb-2">
                  <div
                    className={`rounded-full h-8 w-8 mr-2 flex items-center justify-center text-white`}
                    style={{
                      background:
                        index === 0
                          ? "linear-gradient(to bottom, #3006B2, #A78BFF)"
                          : index === 1
                          ? "linear-gradient(to bottom, #DE0739, #FF90AA)"
                          : index === 2
                          ? "linear-gradient(to bottom, #F55A06, #FFB78F)"
                          : index === 3
                          ? "linear-gradient(to bottom, #FDC500, #FFE793)"
                          : index === 4
                          ? "linear-gradient(to bottom, #9EB105, #F3FF92)"
                          : index === 5
                          ? "linear-gradient(to bottom, #53AF01, #C6FF93)"
                          : "linear-gradient(to bottom, #9EB105, #F3FF92)"
                    }}
                  >
                    <span className="font-bold">{index + 1}</span>
                  </div>
                  <label className="block text-xl font-semibold">
                    Enter {getOrdinal(index + 1)} User Journey:*
                  </label>

                  {index >= 4 && (
                    <button
                      type="button"
                      onClick={() => removeUserJourney(index)}
                      className="text-gray-600 hover:text-red-600 mt-2 ml-auto"
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  )}
                </div>

                <label className="block text-md opacity-60 ml-10 font-thin my-3">
                  Give your product a unique and descriptive name that reflects its purpose and value.
                </label>
                <div className="flex items-center">
  <div className="relative w-96 ml-10 pr-3" style={{ width: '35.3rem' }}>
    <input
      type="text"
      className="w-full m-0.5 p-2 rounded-md bg-white  relative z-10 focus:outline-none"
      placeholder={`Enter ${getOrdinal(index + 1)} User Journey`}
      value={uj.journey}
      onChange={(e) => {
        const updated = [...userJourneys];
        updated[index].journey = e.target.value;
        setUserJourneys(updated);
      }}
      maxLength={MAX_JOURNEY_LENGTH}
    />
    <div className="absolute inset-0 rounded-md p-[1px] bg-gradient-to-r from-[#0795D4] via-[#DD0808] to-[#2606B3] opacity-50">
      <div className="w-full h-full bg-white rounded-md"></div>
    </div>
  </div>
  <p className="ml-2 text-sm">{uj.journey.length} / {MAX_JOURNEY_LENGTH}</p>
</div>

                 <div className="flex items-center mt-8 mb-2">
                  <label className="block ml-10 text-xl font-semibold">
                    Enter Description for {getOrdinal(index + 1)} User Journey:*
                  </label>
                </div>
                <label className="block ml-10 text-md opacity-60 font-thin my-3">
                  Provide a detailed description for this user journey.
                </label>
                <div className="relative ml-10  h-40 pr-3 mt-5">
                  <textarea
                    className="w-full m-0.5 p-2 rounded-md bg-white relative z-10 focus:outline-none resize-none h-32"
                    placeholder={`Description for ${getOrdinal(index + 1)} User Journey`}
                    value={uj.description}
                    onChange={(e) => {
                      const updated = [...userJourneys];
                      updated[index].description = e.target.value;
                      setUserJourneys(updated);
                    }}
                    maxLength={MAX_JOURNEY_DESC_LENGTH}
                  />
                  <div className="absolute inset-0 rounded-md p-[1px] bg-gradient-to-r from-[#0795D4] via-[#DD0808] to-[#2606B3] opacity-50">
                    <div className="w-full h-full bg-white rounded-md"></div>
                  </div>
                </div>
                <p className="ml-10 text-right text-sm">{uj.description.length} / {MAX_JOURNEY_DESC_LENGTH}</p>
              </div>
            ))}

            <div className="flex justify-between mt-6 ml-10">
              <button
                onClick={addUserJourney}
                disabled={userJourneys.length >= 6}
                className="bg-white text-black border font-bold border-black px-4 py-1 rounded-md mt-2"
              >
                Add User Journey +
              </button>
              <button
                onClick={() => setStep(1)}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg"
              >
                Back
              </button>
              <button
                onClick={() => {
                  if (validateStep2()) {
                    setStep(3);
                  }
                }}
                className="bg-black text-white px-4 py-1 mt-2 flex rounded-md"
              >
                Next
                <img src="next.svg" alt="Upload Icon" className="ml-2 mt-0.5 h-6 w-6" />
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h3 className="text-lg font-semibold">Enter Product Features:</h3>
            {productFeatures.map((pf, index) => (
              <div key={index} className="mt-4">
                <div className="flex items-center mb-2">
                  <div
                    className={`rounded-full h-8 w-8 mr-2 flex items-center justify-center text-white`}
                    style={{
                      background:
                        index === 0
                          ? "linear-gradient(to bottom, #3006B2, #A78BFF)"
                          : index === 1
                          ? "linear-gradient(to bottom, #DE0739, #FF90AA)"
                          : index === 2
                          ? "linear-gradient(to bottom, #F55A06, #FFB78F)"
                          : index === 3
                          ? "linear-gradient(to bottom, #FDC500, #FFE793)"
                          : index === 4
                          ? "linear-gradient(to bottom, #9EB105, #F3FF92)"
                          : index === 5
                          ? "linear-gradient(to bottom, #53AF01, #C6FF93)"
                          : "linear-gradient(to bottom, #9EB105, #F3FF92)"
                    }}
                  >
                    <span className="font-bold">{index + 1}</span>
                  </div>
                  <label className="block text-xl font-semibold">
                    Enter {getOrdinal(index + 1)} Product Feature:*
                  </label>

                  {index >= 6 && (
                    <button
                      type="button"
                      onClick={() => removeProductFeature(index)}
                      className="text-gray-600 hover:text-red-600 mt-2 ml-auto"
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  )}
                </div>

                <label className="block text-md opacity-60 ml-10 font-thin my-3">
                  Give your product a unique and descriptive name that reflects its purpose and value.
                </label>
                <div className="flex items-center">
                    <div className="relative ml-10 w-96 pr-3" style={{ width: '35.3rem' }}>
                      <input
                        type="text"
                        className="w-full m-0.5 p-2 rounded-md bg-white relative z-10 focus:outline-none"
                        placeholder={`Enter ${getOrdinal(index + 1)} Product Feature`}
                        value={pf.feature}
                        onChange={(e) => {
                          const updated = [...productFeatures];
                          updated[index].feature = e.target.value;
                          setProductFeatures(updated);
                        }}
                        maxLength={MAX_FEATURE_LENGTH}
                      />
                      <div className="absolute inset-0 rounded-md p-[1px] bg-gradient-to-r from-[#0795D4] via-[#DD0808] to-[#2606B3] opacity-50">
                        <div className="w-full h-full bg-white rounded-md"></div>
                      </div>
                    </div>
                    <p className="ml-2 text-sm">{pf.feature.length} / {MAX_FEATURE_LENGTH}</p>
                  </div>

                <div className="flex items-center mt-8 mb-2">
                  <label className="block ml-10 text-xl font-semibold">
                    Enter Description for {getOrdinal(index + 1)} Product Feature:*
                  </label>
                </div>
                <label className="block ml-10 text-md opacity-60 font-thin my-3">
                  Provide a detailed description for this product feature.
                </label>
                <div className="relative ml-10  h-40 pr-3 mt-5">
                  <textarea
                    className="w-full m-0.5 p-2 rounded-md bg-white relative z-10 focus:outline-none resize-none h-32"
                    placeholder={`Description for ${getOrdinal(index + 1)} Product Feature`}
                    value={pf.description}
                    onChange={(e) => {
                      const updated = [...productFeatures];
                      updated[index].description = e.target.value;
                      setProductFeatures(updated);
                    }}
                    maxLength={MAX_FEATURE_DESC_LENGTH}
                  />
                  <div className="absolute inset-0 rounded-md p-[1px] bg-gradient-to-r from-[#0795D4] via-[#DD0808] to-[#2606B3] opacity-50">
                    <div className="w-full h-full bg-white rounded-md"></div>
                  </div>
                </div>
                <p className="ml-10 text-right text-sm">{pf.description.length} / {MAX_FEATURE_DESC_LENGTH}</p>
              </div>
            ))}

            <div className="flex justify-between mt-6 ml-10">
              <button
                onClick={addProductFeature}
                disabled={productFeatures.length >= 8}
                className="bg-white text-black border font-bold border-black px-4 py-1 rounded-md mt-2"
              >
                Add Product Feature +
              </button>
              <button
                onClick={() => setStep(2)}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg"
              >
                Back
              </button>
              <button
                onClick={() => {
                  if (validateStep3()) {
                    handleSubmit();
                  }
                }}
                className="bg-black text-white px-4 py-1 mt-2 rounded-md flex"
              >
                Publish
                <img src="next.svg" alt="Upload Icon" className="ml-2 mt-0.5 h-6 w-6" />
              </button>
            </div>
          </>
        )}

      </div>
      <VideoUploadModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        onFileUpload={(file) => {
          setVideo(file);
          setUploadedVideo(file);
          setVideoUploadTime(new Date());
        }}
      />
      <ImageUploadModal
        isOpen={isScreenshotModalOpen}
        onClose={() => setIsScreenshotModalOpen(false)}
        onFileUpload={(files) => {
          setScreenshots(files);
          setUploadedScreenshots(files);
          setScreenshotUploadTimes(files.map(() => new Date()));
        }}
        title="Upload Screenshots"
      />
      <ImageUploadModal
        isOpen={isThumbnailModalOpen}
        onClose={() => setIsThumbnailModalOpen(false)}
        onFileUpload={(files) => {
          setThumbnails(files);
          setUploadedThumbnails(files);
          setThumbnailUploadTimes(files.map(() => new Date()));
        }}
        title="Upload Thumbnails"
      />
    </div>
  );
};

export default PostProduct;
