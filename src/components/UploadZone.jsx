// UploadZone — drag-and-drop + file picker image upload area
import { useRef } from "react";
import { UploadCloud, Image as ImageIcon, X } from "lucide-react";
import { useDragDrop } from "../hooks/useDragDrop";

export default function UploadZone({ file, onFile, onClear }) {
  const inputRef = useRef(null);

  const handleFileDrop = (f) => onFile(f);
  const { isDragging, handleDragEnter, handleDragLeave, handleDragOver, handleDrop } =
    useDragDrop(handleFileDrop);

  const handleInputChange = (e) => {
    const f = e.target.files?.[0];
    if (f) onFile(f);
  };

  if (file) {
    // Show preview
    const url = URL.createObjectURL(file);
    return (
      <div className="relative rounded-2xl overflow-hidden border-2 border-leaf-300 bg-leaf-50">
        <img
          src={url}
          alt="Uploaded crop image preview"
          className="w-full h-72 object-cover"
          onLoad={() => URL.revokeObjectURL(url)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
          <div className="flex items-center gap-2 text-white">
            <ImageIcon className="w-4 h-4" />
            <span className="text-sm font-medium truncate max-w-[200px]">{file.name}</span>
          </div>
          <button
            onClick={onClear}
            aria-label="Remove image"
            className="w-8 h-8 bg-white/20 hover:bg-white/40 backdrop-blur rounded-full flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
      aria-label="Upload crop image — click or drag and drop"
      className={`
        relative rounded-2xl border-2 border-dashed cursor-pointer
        flex flex-col items-center justify-center gap-4 p-10 text-center
        transition-all duration-200 min-h-[260px]
        ${
          isDragging
            ? "border-leaf-500 bg-leaf-50 scale-[1.01]"
            : "border-gray-300 bg-gray-50 hover:border-leaf-400 hover:bg-leaf-50/50"
        }
      `}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleInputChange}
        aria-hidden="true"
      />

      <div
        className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-200 ${
          isDragging ? "bg-leaf-100 scale-110" : "bg-white shadow-sm border border-gray-200"
        }`}
      >
        <UploadCloud
          className={`w-8 h-8 transition-colors ${
            isDragging ? "text-leaf-600" : "text-gray-400"
          }`}
        />
      </div>

      <div>
        <p className="text-base font-semibold text-gray-700">
          {isDragging ? "Drop your image here" : "Drag & drop your crop photo"}
        </p>
        <p className="text-sm text-gray-400 mt-1">or click to browse</p>
        <p className="text-xs text-gray-400 mt-2">
          Supports JPG, PNG, WebP · Max 10 MB
        </p>
      </div>
    </div>
  );
}
