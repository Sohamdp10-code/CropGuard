// useDragDrop.js — handles drag-and-drop file interactions
import { useState, useCallback, useRef } from "react";

export function useDragDrop(onFileDrop, acceptedTypes = ["image/jpeg", "image/png", "image/webp"]) {
  const [isDragging, setIsDragging] = useState(false);
  const dragCounter = useRef(0);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      dragCounter.current = 0;

      const files = e.dataTransfer?.files;
      if (!files || files.length === 0) return;

      const file = files[0];
      if (!acceptedTypes.includes(file.type)) {
        alert("Please upload a JPG, PNG, or WebP image.");
        return;
      }
      onFileDrop(file);
    },
    [onFileDrop, acceptedTypes]
  );

  return { isDragging, handleDragEnter, handleDragLeave, handleDragOver, handleDrop };
}
