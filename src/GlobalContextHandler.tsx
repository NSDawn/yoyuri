import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Command } from "./sections/TerminalCommands";

function GlobalContextHandler(props: PropsWithChildren) {

    const terminalLog = useState<Command[]>([]);
    const terminalLine = useState("");
    const record = useState("");
    const currentInterface = useState<string|null>(null);
    const memo = useState("");

    return (
        <GlobalContext.Provider value={{
            "terminalLog": terminalLog,
            "terminalLine": terminalLine,
            "record": record,
            "currentInterface": currentInterface,
            "memo": memo,
        }}>
            {props.children}
        </GlobalContext.Provider>
    );
}

export default GlobalContextHandler;

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
    "interface/evidence/h": "EVIDENCE",
    "interface/profiles": "profiles",
    "interface/profiles/h": "PROFILES",
    "interface/map": "map",
    "interface/map/h": "MAP",
    "interface/memo": "memo",
    "interface/memo/h": "MEMO",
    "interface/memo/clear-button": "🗑",
}