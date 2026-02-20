import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Upload, Image, Video, FileText, X, Plus, ArrowLeft, Presentation,
} from 'lucide-react';

const CONTENT_TYPES = [
  { id: 'slides', label: 'Slides', icon: Presentation, accept: '.pdf,.ppt,.pptx,.key', primary: true },
  { id: 'video', label: 'Video', icon: Video, accept: 'video/*' },
  { id: 'photo', label: 'Photo', icon: Image, accept: 'image/*' },
];

export default function CreateContentPage() {
  const [selectedType, setSelectedType] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 font-medium mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Content</h1>
        <p className="text-sm text-gray-500 mb-8">Upload and share content with the community.</p>

        {/* Content type selector */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">Content type</label>
          {/* Primary — Slides */}
          {(() => {
            const primary = CONTENT_TYPES.find(t => t.primary);
            const Icon = primary.icon;
            const isSelected = selectedType === primary.id;
            return (
              <button
                type="button"
                onClick={() => setSelectedType(primary.id)}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl border-2 transition-all mb-3 ${
                  isSelected
                    ? 'border-gray-900 bg-gray-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isSelected ? 'bg-gray-900' : 'bg-gray-100'}`}>
                  <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-gray-400'}`} />
                </div>
                <div className="text-left">
                  <p className={`text-sm font-semibold ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>{primary.label}</p>
                  <p className="text-xs text-gray-500">PDF, PowerPoint, Keynote</p>
                </div>
              </button>
            );
          })()}
          {/* Secondary — Video & Photo */}
          <div className="flex gap-3">
            {CONTENT_TYPES.filter(t => !t.primary).map((type) => {
              const Icon = type.icon;
              const isSelected = selectedType === type.id;
              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setSelectedType(type.id)}
                  className={`flex-1 flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl border-2 transition-all ${
                    isSelected
                      ? 'border-gray-900 bg-gray-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isSelected ? 'text-gray-900' : 'text-gray-400'}`} />
                  <span className={`text-xs font-medium ${isSelected ? 'text-gray-900' : 'text-gray-500'}`}>{type.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Upload area */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">Upload content</label>
          {file ? (
            <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg">
              <FileText className="w-5 h-5 text-gray-500 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <button type="button" onClick={removeFile} className="p-1 text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`flex flex-col items-center justify-center gap-3 px-6 py-12 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
                dragActive
                  ? 'border-gray-900 bg-gray-50'
                  : 'border-gray-300 hover:border-gray-400 bg-white'
              }`}
            >
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <Upload className="w-6 h-6 text-gray-400" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-700">
                  Drag and drop or <span className="text-blue-600">browse</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {selectedType
                    ? `Upload ${selectedType === 'slides' ? 'slides' : selectedType === 'video' ? 'a video' : 'a photo'}`
                    : 'Select a content type above, then upload'}
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept={CONTENT_TYPES.find(t => t.id === selectedType)?.accept || '*'}
                onChange={handleFileChange}
              />
            </div>
          )}
        </div>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your content a title"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Description */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Add a description..."
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
          />
        </div>

        {/* Submit */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="px-6 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors"
          >
            Publish
          </button>
          <Link
            to="/"
            className="px-6 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}
