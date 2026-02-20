import { useState } from 'react';
import { X, Upload, Linkedin } from 'lucide-react';
import { validateImageFile, compressImage, saveSpeaker } from '../utils/photoStorage';

export default function SpeakerPhotoEditor({ speaker, onUpdate, onClose }) {
  const [newPhoto, setNewPhoto] = useState(null);
  const [preview, setPreview] = useState(speaker.photoUrl || null);
  const [uploadError, setUploadError] = useState(null);
  const [showLinkedInHelper, setShowLinkedInHelper] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      // Validate file
      validateImageFile(file);

      // Convert to Base64 and compress
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result;
        const compressed = await compressImage(base64String);

        setPreview(compressed);
        setNewPhoto(compressed);
        setUploadError(null);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      setUploadError(error.message);
      setPreview(speaker.photoUrl || null);
      setNewPhoto(null);
    }
  };

  const handleSave = async () => {
    if (!newPhoto) {
      onClose();
      return;
    }

    setIsSaving(true);

    try {
      // Update speaker in localStorage
      const updatedSpeaker = {
        ...speaker,
        photoUrl: newPhoto,
        photoSource: 'upload',
        lastPhotoUpdate: new Date().toISOString()
      };

      saveSpeaker(updatedSpeaker);

      // Call parent update callback
      if (onUpdate) {
        onUpdate(updatedSpeaker);
      }

      onClose();
    } catch (error) {
      console.error('Error saving photo:', error);
      setUploadError('Failed to save photo. Please try again.');
      setIsSaving(false);
    }
  };

  const handleRemovePhoto = () => {
    setPreview(null);
    setNewPhoto(null);
    setUploadError(null);

    // Clear file input
    const fileInput = document.getElementById('photo-edit-input');
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 animate-grow-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Edit Speaker Photo</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Speaker Info */}
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">{speaker.name}</span>
            {speaker.title && <span> • {speaker.title}</span>}
          </p>
          {speaker.company && (
            <p className="text-sm text-gray-600">{speaker.company}</p>
          )}
        </div>

        {/* Photo Preview */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Current Photo
          </label>
          <div className="flex items-center justify-center">
            <div className="relative">
              {preview ? (
                <>
                  <img
                    src={preview}
                    alt={speaker.name}
                    className="w-40 h-40 object-cover rounded-xl border-2 border-blue-600"
                  />
                  {newPhoto && (
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-md"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </>
              ) : (
                <div className="w-40 h-40 bg-gray-900 rounded-xl flex items-center justify-center text-white font-bold text-5xl">
                  {speaker.name.charAt(0)}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Upload New Photo */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Upload New Photo
          </label>
          <div className="relative">
            <input
              type="file"
              id="photo-edit-input"
              accept="image/*"
              onChange={handlePhotoChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
          </div>

          {uploadError && (
            <p className="text-xs text-red-600 mt-2">{uploadError}</p>
          )}

          {/* LinkedIn Photo Helper */}
          <button
            type="button"
            onClick={() => setShowLinkedInHelper(!showLinkedInHelper)}
            className="mt-3 text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          >
            <Linkedin className="w-3 h-3" />
            {showLinkedInHelper ? 'Hide' : 'How to upload from LinkedIn'}
          </button>

          {showLinkedInHelper && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-2">
              <h4 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Linkedin className="w-4 h-4 text-blue-600" />
                Upload from LinkedIn
              </h4>
              <ol className="text-xs text-gray-700 space-y-1 list-decimal list-inside">
                <li>Go to your LinkedIn profile</li>
                <li>Click on your profile photo</li>
                <li>Click "Download" or right-click and "Save image as..."</li>
                <li>Upload the downloaded image using the field above</li>
              </ol>
              <p className="text-xs text-gray-600 mt-2 italic">
                Tip: Use a high-quality professional headshot for best results
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-200 bg-white text-gray-900 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Save Photo
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
