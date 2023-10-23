import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Command } from "./sections/TerminalCommands";

function GlobalContextHandler(props: PropsWithChildren) {

    const terminalLog = useState<Command[]>([]);
    const terminalLine = useState("");
    const record = useState("");
    const currentInterface = useState<string|null>(null);

    return (
        <GlobalContext.Provider value={{
            "terminalLog": terminalLog,
            "terminalLine": terminalLine,
            "record": record,
            "currentInterface": currentInterface,
        }}> 
            {props.children}
        </GlobalContext.Provider>
    );
}

export default GlobalContextHandler;

/*
export class GlobalSingleton {
    terminal: {
        box: Command[],
        line: string,
    };
    record: {
        text :string,
    };
    interface: {
        currInterface: string | null,
    }
    constructor() {
        this.terminal = {
            box: [],
            line: "",
        };
        this.record = {
            text: "",
        };
        this.interface = {
            currInterface: null,
        }
    }
}
*/
const GlobalContext = createContext<GlobalSingleton>({});

export type GlobalSingleton = Record<string, [any, React.Dispatch<React.SetStateAction<any>>]>

export function useGlobal() {
    return useContext(GlobalContext);
}

export function t(s: string) : string {
    // add localization later.
    return _T[s] ?? "";
}
const _T : Record<string, string> = {
    "interface/evidence": "evidence",
    "interface/profiles": "profiles",
    "interface/map": "map",
    "interface/memo": "memo",
}