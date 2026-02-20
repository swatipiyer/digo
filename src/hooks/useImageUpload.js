import { useCallback } from 'react';
import { validateImageFile, convertFileToBase64, compressImage } from '../utils/photoStorage';

export function useImageUpload(dispatch) {
  const handleUpload = useCallback(async (file, slot) => {
    try {
      validateImageFile(file);
      const base64 = await convertFileToBase64(file);
      const compressed = await compressImage(base64, 800, 0.85);
      dispatch({ type: 'UPDATE_IMAGE', slot, value: compressed });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, [dispatch]);

  const handleRemove = useCallback((slot) => {
    dispatch({ type: 'UPDATE_IMAGE', slot, value: '' });
  }, [dispatch]);

  return { handleUpload, handleRemove };
}
