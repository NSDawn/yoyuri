import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Command } from "./sections/TerminalCommands";

function GlobalContextHandler(props: PropsWithChildren) {

    const terminalLog = useState<Command[]>([]);
    const terminalLine = useState("");
    const record = useState("");
    const currentInterface = useState<string|null>(null);
    const memo = useState("");

    const currentMap = useState("long-beach-gazette-main-office");
    const currentRoom = useState("lobby");

    const isRecordAnimating = useState(false);

    return (
        <GlobalContext.Provider value={{
            "terminalLog": terminalLog,
            "terminalLine": terminalLine,
            "record": record,
            "currentInterface": currentInterface,
            "memo": memo,
            "currentMap": currentMap,
            "currentRoom": currentRoom,
            "isRecordAnimating": isRecordAnimating,
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

// exporting strings used in ui etc. 
import T from "./game/T";
export function t(s: string) : string {
    // add localization later.
    return T[s] ?? "";
}

// exporting story
import Story from "./game/Story";
export function tStory(s: string, n = 0) : string {
    return Story[s][n] ?? "";
}

import {WorldDisplay, RoomDisplay, renderRoomTemplate, Room, PlaceChar} from "./game/World";
export function tRoom(room: string, placeChars: PlaceChar[]) : string {
    return renderRoomTemplate(WorldDisplay[room], placeChars);
}


// debug 
const _repeat = (f: Function, delay_ms = 200) => {
    f()
    setTimeout(() => {_repeat(f)}, delay_ms)
}
