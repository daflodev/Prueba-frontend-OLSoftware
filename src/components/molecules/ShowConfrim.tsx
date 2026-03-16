import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ShowConfirmProps {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmText?: string;
    cancelText?: string;
}

export const ShowConfirm = ({
    isOpen, title, message, onConfirm, onCancel,
    confirmText = "Eliminar", cancelText = "Cancelar"
}: ShowConfirmProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-6">
                    <div className="flex items-center gap-4 text-red-600 mb-4">
                        <div className="bg-red-100 p-2 rounded-full">
                            <AlertCircle size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                        {message}
                    </p>
                </div>
                <div className="bg-gray-50 p-4 flex gap-3 justify-end">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 text-gray-700 font-semibold hover:bg-gray-200 rounded-lg transition-colors"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-6 py-2 bg-red-600 text-white font-bold hover:bg-red-700 rounded-lg shadow-md shadow-red-200 transition-all active:scale-95"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};