import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Command } from "./sections/TerminalCommands";

function GlobalContextHandler(props: PropsWithChildren) {

    const [G, _] = useState(new GlobalSingleton);

    return (
        <GlobalContext.Provider value={G}> 
            {props.children}
        </GlobalContext.Provider>
    );
}

export default GlobalContextHandler;

export class GlobalSingleton {
    terminal: Command[];
    record: {
        text :string;
    }
    constructor() {
        this.terminal = [];
        this.record = {
            text: ""
        };
    }
}

const GlobalContext = createContext(new GlobalSingleton);

export function useGlobal() {
    return useContext(GlobalContext);
}