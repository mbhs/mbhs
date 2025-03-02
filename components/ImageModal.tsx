import React from "react";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";

interface ImageModalProps {
  imageUrl: string | null;
  layoutId: string; 
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, layoutId, onClose }) => {
  if (!imageUrl) return null;

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }} 
      className="fixed z-50 bg-black backdrop-blur-md bg-opacity-25 left-0 right-0 top-0 bottom-0 flex justify-center items-center"
      onClick={onClose} 
    >
      <motion.div
        layoutId={`news-card-${layoutId}`}
        className="max-w-full w-auto min-h-max bg-neutral-100 dark:bg-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-700 rounded-lg shadow-md p-3 flex flex-col gap-2"
        onClick={(e) => e.stopPropagation()} 
      >
        <IoClose
          className="w-6 h-6 mb-2 cursor-pointer self-end"
          style={{ pointerEvents: "auto" }} 
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        />
        <div className="flex flex-col flex-wrap justify-center gap-5 items-center p-2">
          <motion.img
            layoutId={`news-image-${layoutId}`}
            src={imageUrl}
            className="max-w-[90vw] max-h-[80vh] object-contain rounded-lg"
            transition={{ type: "spring", stiffness: 500, damping: 40 }} 
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ImageModal;
