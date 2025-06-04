import React from 'react';

interface ConfirmDialogProps {
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 animate-fadeIn">
      <div 
        className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4 animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Action</h3>
        <p className="text-gray-700 mb-6">{message}</p>
        
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;