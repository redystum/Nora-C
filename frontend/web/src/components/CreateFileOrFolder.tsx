import { X, FolderPlus, File, FileCode } from 'lucide-preact';
import { useState, useEffect, useRef } from 'preact/hooks';

interface CreateFileOrFolderProps {
    isOpen: boolean;
    type: 'file' | 'folder';
    onClose: () => void;
    onCreate: (name: string, language?: string) => void;
}

const FILE_TYPES = [
    { id: 'not_specified', label: 'Not specified', icon: File },
    { id: 'c', label: 'C Source', icon: FileCode },
];

export function CreateFileOrFolder({ isOpen, type, onClose, onCreate }: CreateFileOrFolderProps) {
    const [name, setName] = useState('');
    const [selectedTypeIndex, setSelectedTypeIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            setName('');
            setSelectedTypeIndex(1);
            // Use timeout to ensure element is mounted before focusing
            setTimeout(() => {
                inputRef.current?.focus();
            }, 10);
        }

    }, [isOpen]);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (isOpen && e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleKeyDown = (e: KeyboardEvent) => {
        if (type !== 'file') return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedTypeIndex((prev) => (prev + 1) % FILE_TYPES.length);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedTypeIndex((prev) => (prev - 1 + FILE_TYPES.length) % FILE_TYPES.length);
        }
    };

    const handleSubmit = (e: Event) => {
        e.preventDefault();
        if (name.trim()) {
            const language = type === 'file' ? FILE_TYPES[selectedTypeIndex].id : undefined;
            onCreate(name, language);
            onClose();
        }
    };

    const handleBackdropClick = (e: MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 transition-all duration-300"
            onClick={handleBackdropClick}
        >
            <div className="w-full max-w-lg bg-[#0F0F0F] border border-neutral-800 rounded-2xl shadow-2xl shadow-black/50 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 ring-1 ring-white/5">

                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 shrink-0 bg-[#141414]">
                    <h2 className="text-lg font-semibold text-neutral-200 flex items-center gap-2.5">
                        <div className="p-1.5 bg-neutral-800/50 rounded-lg">
                            {type === 'folder' ? <FolderPlus className="w-4 h-4 text-neutral-300" /> : <File className="w-4 h-4 text-neutral-300" />}
                        </div>
                        {type === 'folder' ? 'New Directory' : 'New File'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="cursor-pointer p-1.5 rounded-lg text-neutral-500 hover:text-neutral-200 hover:bg-white/5 transition-all"
                        title="Close"
                    >
                        <X size={18} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col">
                    <div className="p-6 space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider ml-1">Name</label>
                            <input
                                ref={inputRef}
                                type="text"
                                required
                                value={name}
                                onInput={(e) => setName(e.currentTarget.value)}
                                onKeyDown={handleKeyDown}
                                className="w-full bg-[#1A1A1A] border border-neutral-800 rounded-xl px-4 py-3 text-neutral-200 focus:outline-none focus:border-neutral-700 focus:bg-[#202020] focus:ring-1 focus:ring-neutral-700 transition-all placeholder:text-neutral-600 text-sm"
                                placeholder={type === 'folder' ? "directory_name" : "filename"}
                                autoFocus
                            />
                        </div>

                        {type === 'file' && (
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider ml-1">File Type</label>
                                <div className="border border-neutral-800 rounded-xl overflow-hidden bg-[#1A1A1A]">
                                    {FILE_TYPES.map((ft, index) => (
                                        <div
                                            key={ft.id}
                                            onClick={() => setSelectedTypeIndex(index)}
                                            className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors text-sm ${
                                                selectedTypeIndex === index
                                                    ? 'bg-neutral-800 text-neutral-100' // Selected state
                                                    : 'text-neutral-500 hover:bg-white/5 hover:text-neutral-300'
                                            }`}
                                        >
                                            <ft.icon size={16} />
                                            <span>{ft.label}</span>
                                            {selectedTypeIndex === index && <span className="ml-auto text-xs opacity-50">Selected</span>}
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs text-neutral-600 ml-1">Use arrow keys to select type.</p>
                            </div>
                        )}
                    </div>

                    <div className="px-5 py-4 border-t border-white/5 bg-[#141414] flex justify-end gap-3">
                         <button
                            type="button"
                            onClick={onClose}
                            className="cursor-pointer px-4 py-2 text-sm font-medium text-neutral-400 hover:text-neutral-200 hover:bg-white/5 rounded-lg transition-all duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!name.trim()}
                            className="px-4 py-2 text-sm font-semibold bg-neutral-100 hover:bg-white text-neutral-950 rounded-lg transition-all active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}