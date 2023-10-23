import "./Terminal.css"
import { useGlobal } from "../GlobalContextHandler"
import { useRef, useState, useEffect } from "react";
import { Command } from "./TerminalCommands"

export default function Terminal() {
    const [cmd, setCmd] = useState("");
    const refTerminalWindow = useRef<HTMLInputElement | null>(null);
    const G = useGlobal();
    const [terminalLog, setTerminalLog] = useGlobal().terminalLog as [Command[], React.Dispatch<Command[]>];

    const handleCmdLineKeyPress = (event: React.KeyboardEvent) => {
        switch (event.key) {
            case "Enter" : 
                if (cmd === "") break;
                setTerminalLog([...terminalLog, new Command(G, cmd)]);
                setCmd("");             
                break;
        }
    };

    useEffect(() => {
        if (cmd === "" && refTerminalWindow.current) refTerminalWindow.current.scrollTop = refTerminalWindow.current.scrollHeight;
    }, [cmd]);

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
                className="command-line" 
                placeholder="..."
                
                value={cmd} 
                onInput={e => setCmd((e.target as any).value) }
                
                onKeyDown={handleCmdLineKeyPress} 
                type="text" 
            />
        </section>
    );
}





