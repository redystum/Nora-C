import {TerminalSquare, X} from "lucide-preact";

interface ConsoleProps {
    consoleHeight: number;
    scrollbarClasses: string;
    setIsConsoleOpen: (open: boolean) => void;
}

export function Console({consoleHeight, scrollbarClasses, setIsConsoleOpen}: ConsoleProps) {
    return (
        <div
            style={{height: `${consoleHeight}px`}}
            className="bg-neutral-900 border border-neutral-800/80 rounded-xl shadow-lg shadow-black/40 flex flex-col shrink-0 overflow-hidden"
        >
            <div
                className="flex items-center justify-between px-4 h-10 border-b border-neutral-800/60 bg-neutral-900 select-none">
                <div className="flex items-center gap-2 text-neutral-400">
                    <TerminalSquare size={14}/>
                    <span className="text-xs font-bold uppercase tracking-widest">Console</span>
                </div>
                <button
                    onClick={() => setIsConsoleOpen(false)}
                    className="p-1 text-neutral-500 hover:text-neutral-200 hover:bg-neutral-800/80 rounded-md transition-all active:scale-95"
                >
                    <X size={16} strokeWidth={2.5}/>
                </button>
            </div>
            <div
                className={`flex-1 p-4 font-mono text-sm text-neutral-300 overflow-auto bg-neutral-950/40 shadow-inner shadow-black/20 ${scrollbarClasses}`}>
                <p className="text-neutral-500">~ System initialized.</p>
                <p className="text-green-400/80 mt-1">➜ <span className="text-neutral-300">Ready for
                    output...</span></p>
            </div>
        </div>
    );
}