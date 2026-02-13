import {
    FolderCode,
    Sparkles,
} from 'lucide-preact';

interface ExplorerProps {
    explorerWidth: number;
    scrollbarClasses: string;
}

export function Explorer({explorerWidth, scrollbarClasses}: ExplorerProps) {
    return (
        <div
            style={{width: `${explorerWidth}px`}}
            className="bg-neutral-900 border border-neutral-800/80 rounded-xl shadow-lg shadow-black/40 flex flex-col shrink-0 overflow-hidden select-none"
        >
            <div
                className="flex items-center gap-2 px-4 py-3 border-b border-neutral-800/60 bg-neutral-900 text-neutral-400">
                <FolderCode size={16} className="text-neutral-500"/>
                <span className="text-xs font-bold uppercase tracking-widest">Explorer</span>
            </div>
            <div className={`flex-1 p-3 text-sm text-neutral-500 font-mono overflow-auto ${scrollbarClasses}`}>
                {/* Fake file tree for aesthetic preview */}
                <div
                    className="flex items-center gap-2 px-2 py-1.5 rounded bg-neutral-800/50 text-neutral-200 cursor-pointer">
                    <Sparkles size={14} className="text-yellow-500"/>
                    <span>main.c</span>
                </div>
            </div>
        </div>
    );
}