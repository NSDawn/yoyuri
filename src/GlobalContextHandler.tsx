import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Command } from "./sections/TerminalCommands";
import { gameFlagList } from "./game/GameFlagList";
import { gameConfigList, gameConfigListT } from "./game/GameConfigList";

function GlobalContextHandler(props: PropsWithChildren) {

    const gameFlags = useState(gameFlagList);
    const gameConfig = useState(gameConfigList);

    const terminalLog = useState<Command[]>([]);
    const terminalLine = useState("");
    const record = useState("");
    const currentInterface = useState<string|null>(null);
    const memo = useState(
        Array.from({length: gameConfig[0].memoLength}).map(() => "")
    );
    const memoPage = useState(0);

    const currentMap = useState("long-beach-gazette-main-office");
    const currentRoom = useState("main");

    const isRecordAnimating = useState(false);
    const imgIcons = useState(["", ""])
        
    const currentMenuComponent = useState<string|null>(null);
    
    const profiles = useState([
        tProfile("hayu-te-hakahilo", "prototype"),
        tProfile("wesley-uehara", "prototype"),
    ]);

    const evidence = useState([
        tEvidence("email-tip-estrella", "prototype"),
        tEvidence("red-herring", "prototype"),
        tEvidence("utah-teapot", "prototype"),
    ]);

    

    const interactableEvidence:any = useState([
        {evidence: tEvidence("newspaper-article-carjacking", "prototype"), room: "rec", map: "long-beach-gazette-main-office"}
    ]);

    return (
        <GlobalContext.Provider value={{
            "terminalLog": terminalLog,
            "terminalLine": terminalLine,
            "record": record,
            "currentInterface": currentInterface,
            "memo": memo,
            "memoPage": memoPage,
            "currentMap": currentMap,
            "currentRoom": currentRoom,
            "isRecordAnimating": isRecordAnimating,
            "profiles" : profiles,
            "evidence": evidence,
            "interactableEvidence": interactableEvidence,
            "imgIcons" : imgIcons,
            "currentMenuComponent": currentMenuComponent,
            "gameConfig": gameConfig,
            "gameFlags": gameFlags
            
        }}>
            {props.children}
        </GlobalContext.Provider>
    );
}

export default GlobalContextHandler;

const GlobalContext = createContext<GlobalSingleton>(null as unknown as GlobalSingleton);
type EvidenceWithLocation = {evidence: Evidence, room: string, map: string}

export type GlobalSingleton = {
    terminalLog: State<Command[]>,
    terminalLine: State<string>,
    record: State<string>,
    currentInterface: State<string | null>,
    memo: State<string[]>,
    memoPage: State<number>,
    currentMap: State<string>,
    currentRoom: State<string>,
    isRecordAnimating: State<boolean>,
    profiles: State<Profile[]>,
    evidence: State<Evidence[]>,
    interactableEvidence: State<EvidenceWithLocation[]>,
    imgIcons: State<string[]>,
    currentMenuComponent: State<string | null>,
    gameConfig: State<gameConfigListT>,
    gameFlags: State<Record<string, boolean>>,
}
export type State<T> = [T, React.Dispatch<React.SetStateAction<T>>];
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

import {WorldDisplay, Location, renderRoomTemplate, Room, PlaceChar} from "./game/World";
export function tRoom(room: string, placeChars: PlaceChar[]) : string {
    return renderRoomTemplate(WorldDisplay[room], placeChars);
}


// exporting profiles
import { Profile, ProfileList } from "./game/ProfileList";
export function tProfile(name: string, id: string): Profile {
    return ProfileList[name][id];
}

// exporting profiles
import { Evidence, EvidenceList } from "./game/EvidenceList";
export function tEvidence(name: string, id: string): Evidence {
    return EvidenceList[name][id];
}

// debug 
const _repeat = (f: Function, delay_ms = 200) => {
    f()
    setTimeout(() => {_repeat(f)}, delay_ms)
}
