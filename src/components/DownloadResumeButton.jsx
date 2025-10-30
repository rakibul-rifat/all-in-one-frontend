import React from "react";
import { ArrowDownToLine } from "lucide-react";

const DownloadResumeButton = () => {
  const handleDownload = () => {
    // Adjust path according to your file location
    const resumePath = "Rakibul_Islam_Resume_Frontend_Web_Developer.pdf"; 
    window.open(resumePath, "_blank"); // Opens in new tab for viewing/downloading
  };

  return (
    <button
      onClick={handleDownload}
      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:scale-105 active:scale-95 transition-all duration-300 shadow-md hover:shadow-lg"
    >
      <ArrowDownToLine className="w-5 h-5" />
      <span>Download Resume</span>
    </button>
  );
};

export default DownloadResumeButton;
