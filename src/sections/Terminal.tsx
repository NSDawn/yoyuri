import "./Terminal.css"
import { useGlobal } from "../GlobalContextHandler"
import { useRef, useState, useEffect } from "react";
import { Command } from "./TerminalCommands"

export default function Terminal() {
    const G = useGlobal();
    const [cmd, setCmd] = useState("");
    const refTerminalWindow = useRef<HTMLInputElement | null>(null);

    const handleCmdLineKeyPress = (event: React.KeyboardEvent) => {
        switch (event.key) {
            case "Enter" : 
                if (cmd === "") break;
                G.terminal.push(new Command(G, cmd));
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
                   G.terminal.map((command, i) =>
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
                value={cmd} 
                onInput={e => setCmd((e.target as any).value) }
                onKeyDown={handleCmdLineKeyPress} 
                type="text" 
            />
        </section>
    );
}





