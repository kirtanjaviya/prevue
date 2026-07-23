import { useState, useRef, useEffect } from "react";
import { UploadCloud, Image as ImageIcon, X, RefreshCw, AlertCircle } from "lucide-react";

const FileUpload = ({
  label = "Social Share Image",
  recommendedSize = "1200 × 628 px",
  onFileSelect,
  initialImage = null,
  maxSizeMB = 5,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState(initialImage);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    setPreview(initialImage);
  }, [initialImage]);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const handleFile = (file) => {
    if (!file) return;

    // Validate type
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (PNG, JPG, WebP, GIF)");
      return;
    }

    // Validate size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size exceeds ${maxSizeMB}MB limit`);
      return;
    }

    setError("");
    setFileName(file.name);
    setFileSize(formatFileSize(file.size));

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    if (onFileSelect) {
      onFileSelect(file, objectUrl);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    setPreview(null);
    setFileName("");
    setFileSize("");
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (onFileSelect) {
      onFileSelect(null, null);
    }
  };

  return (
    <div className="w-full max-w-full font-sans select-none">
      {/* Header section */}
      <div className="flex items-center justify-between mb-1.5 px-0.5">
        <div className="flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-brand-primary" />
          <span className="text-xs font-semibold text-neutral-800">{label}</span>
        </div>
        <span className="text-[11px] font-medium text-neutral-400">
          {recommendedSize}
        </span>
      </div>

      {/* Main Upload Dropzone */}
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative group cursor-pointer overflow-hidden rounded-xl border-2 border-dashed transition-all duration-300 ${
          isDragging
            ? "border-brand-primary bg-emerald-50/60 shadow-[0_0_15px_rgba(5,150,105,0.15)] scale-[1.005]"
            : preview
            ? "border-neutral-200 bg-neutral-900/95"
            : "border-neutral-200 hover:border-brand-primary/60 bg-gradient-to-b from-neutral-50/80 to-white hover:bg-emerald-50/20 shadow-2xs hover:shadow-sm"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          className="hidden"
        />

        {preview ? (
          /* Uploaded Preview View */
          <div className="relative aspect-[1200/628] w-full overflow-hidden flex items-center justify-center bg-neutral-950">
            <img
              src={preview}
              alt="OG Preview"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Hover overlay with action buttons */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-medium text-white/90 bg-white/10 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10">
                  {recommendedSize}
                </span>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="p-1.5 rounded-full bg-red-500/80 hover:bg-red-600 text-white backdrop-blur-md transition-all transform hover:scale-110 shadow-md cursor-pointer"
                  title="Remove image"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center justify-between text-white">
                <div className="min-w-0 pr-2">
                  <p className="text-xs font-semibold truncate text-white">{fileName || "OG Share Banner"}</p>
                  {fileSize && <p className="text-[10px] text-white/70">{fileSize}</p>}
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold backdrop-blur-md transition-all shrink-0 border border-white/20 shadow-sm cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Replace</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Empty Dropzone View */
          <div className="aspect-[1200/628] w-full flex flex-col items-center justify-center p-4 text-center">
            <div
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 mb-2 ${
                isDragging
                  ? "bg-brand-primary text-white scale-110 shadow-md"
                  : "bg-emerald-50 text-brand-primary group-hover:bg-brand-primary group-hover:text-white group-hover:scale-110"
              }`}
            >
              <UploadCloud className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </div>

            <p className="text-xs sm:text-sm font-semibold text-neutral-800 mb-0.5">
              {isDragging ? (
                <span className="text-brand-primary">Drop image here</span>
              ) : (
                <>
                  Drag & drop, or{" "}
                  <span className="text-brand-primary underline decoration-brand-primary/40 underline-offset-2 group-hover:decoration-brand-primary">
                    browse
                  </span>
                </>
              )}
            </p>

            <p className="text-[10px] text-neutral-400 font-medium">
              PNG, JPG, WebP, SVG (max {maxSizeMB}MB)
            </p>
          </div>
        )}
      </div>

      {/* Error notification */}
      {error && (
        <div className="mt-2 flex items-center gap-1.5 text-xs text-red-600 bg-red-50 border border-red-200/70 p-2 rounded-lg">
          <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-500" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
