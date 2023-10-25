import "./Terminal.css"
import { useGlobal } from "../GlobalContextHandler"
import { useRef, useState, useEffect } from "react";
import { Command } from "./TerminalCommands"

export default function Terminal() {
    const refTerminalWindow = useRef<HTMLInputElement | null>(null);
    const G = useGlobal();
    const [terminalLog, setTerminalLog] = G.terminalLog as [Command[], React.Dispatch<Command[]>];
    const [terminalLine, setTerminalLine] = G.terminalLine;
    const [isRecordAnimating, setIsTerminalAnimating] = G.isRecordAnimating;

    const [cmdHistoryIndex, setCmdHistoryIndex] = useState(0);

    const handleCmdLineKeyPress = (event: React.KeyboardEvent) => {
        if (isRecordAnimating) return;
        switch (event.key) {
            case "Enter" : 
                if (terminalLine === "") break;
                const c = new Command(G, terminalLine);
                // if i don't push directly here, (cf. `setTerminalLog([...terminalLog, c]);`)  
                // commands that edit the terminalLog don't work.
                terminalLog.push(c); 
                setCmdHistoryIndex(0);
                setTerminalLine("");             
                break;
            case "ArrowUp" :
                setCmdHistoryIndex(cmdHistoryIndex + 1);
                break;
            case "ArrowDown" :
                setCmdHistoryIndex(cmdHistoryIndex - 1);
                break;
        }
    };

    useEffect(() => {
        if (terminalLine === "" && refTerminalWindow.current) refTerminalWindow.current.scrollTop = refTerminalWindow.current.scrollHeight;
    }, [terminalLine]);

    useEffect(() => {
        const logLength = terminalLog.length;
        if (logLength < cmdHistoryIndex) {
            setCmdHistoryIndex(logLength); return;
        }
        if (cmdHistoryIndex < 0) {
            setCmdHistoryIndex(0); return;
        }
        const l = terminalLog[logLength - cmdHistoryIndex]?.rawtext_unsafe ?? "";
        setTerminalLine(l);
    }, [cmdHistoryIndex])

    return (
        <section className="terminal">
            <div className="window" ref={refTerminalWindow}>
                {
                   terminalLog.map((command, i) =>
                    { return (
                        <span key={i}>
                            <span dangerouslySetInnerHTML={command.display}/>
                            <br />
                        </span>
                    )}
                   ) 
                }
            </div>
            <input 
                className={`command-line ${isRecordAnimating ? "hidden" : ""}`} 
                placeholder="..."
                
                value={terminalLine} 
                onChange={e => setTerminalLine((e.target as any).value) }
                readOnly={isRecordAnimating}

                onKeyDown={handleCmdLineKeyPress} 
                type="text" 
            />
        </section>
    );
}





