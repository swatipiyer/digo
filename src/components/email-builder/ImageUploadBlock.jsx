import { useState, useRef } from 'react';
import { Upload, X, Image } from 'lucide-react';

export default function ImageUploadBlock({ slot, label, image, onUpload, onRemove }) {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError('');
    setLoading(true);
    const result = await onUpload(file, slot);
    setLoading(false);

    if (!result.success) {
      setError(result.error);
    }

    // Reset file input so the same file can be re-uploaded
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (image) {
    return (
      <div className="relative group">
        <img
          src={image}
          alt={label}
          className="w-full h-32 object-cover rounded-lg border border-gray-200"
        />
        <button
          type="button"
          onClick={() => onRemove(slot)}
          className="absolute top-2 right-2 w-7 h-7 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
        <span className="absolute bottom-2 left-2 text-xs bg-black/50 text-white px-2 py-0.5 rounded">
          {label}
        </span>
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={loading}
        className="w-full border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-lg p-4 flex flex-col items-center gap-2 transition-colors group"
      >
        {loading ? (
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        ) : (
          <div className="w-10 h-10 bg-gray-100 group-hover:bg-blue-50 rounded-full flex items-center justify-center transition-colors">
            <Image className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
          </div>
        )}
        <div className="text-center">
          <p className="text-sm font-medium text-gray-700">{label}</p>
          <p className="text-xs text-gray-500 mt-0.5">Click to upload (JPG, PNG, WebP, max 5MB)</p>
        </div>
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />
      {error && (
        <p className="text-xs text-red-600 mt-1.5">{error}</p>
      )}
    </div>
  );
}
