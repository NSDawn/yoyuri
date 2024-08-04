import { GlobalSingleton, useGlobal } from "../GlobalContextHandler";
import { World, getRoomDisplayName, Room } from "../game/World";
import { useState } from "react";
import { Evidence } from "../game/EvidenceList";
import Story, {storyPrepareString} from "../game/Story";

export default function TerminalCommand() {
    let G = useGlobal();

    return (
        < >
        </>
    )
}


export class Command {

    G                     :GlobalSingleton;
    rawtext_unsafe        :string;
    text                  :string;
    args                  :string[];
    errorCode            :number;
    res                   :string;
    display               : {__html: string};

    constructor(G: GlobalSingleton, input = "") {
        this.G = G;
        this.rawtext_unsafe = input;
        this.text = this.sanitize();
        [this.args, this.errorCode, this.res] = this.parse_and_run();
        
        this.display = this.displayify();
    }
    sanitize() {
        let s = this.rawtext_unsafe;
        while (s.includes("  ")) s = s.replace("  ", " ");
        s = s
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .trim()
        ;
        return s;
    }
    parse_and_run(): [string[], number, string] {
        let args = this.parse(this.text)
        let [errorCode, res] = this.run(args);

        return [args, errorCode, res];
    }
    parse(text :string) :string[] {
        let args = this.text.split(" ");
        return args
    }
    run(args :string[]) :[number, string] {
        let errorCode = 0;
        
        const _args0 = CMD_ALIASES[args[0]] ?? args[0];
        let _args :string[] = PARAM_ALIASES[_args0] ? args.map((v) => (PARAM_ALIASES[_args0][v] ?? v)) : [...args];
        _args[0] = _args0;
        
        let ret :string[] = [];
        const doEffects = true;
        const effect = (fn :Function) => {if (doEffects) fn()}

        const [currentMap, setCurrentMap] = this.G.currentMap;
        const [currentRoom, setCurrentRoom] = this.G.currentRoom;
        const [evidence, setEvidence] = this.G.evidence;
        const [currentInterface, setCurrentInterface] = this.G.currentInterface;

        switch (_args[0]) {
            case "echo" : 
                switch (true) {
                    case (!_args[1]) :
                        errorCode = 100;
                        break;
                    default : 
                        errorCode = 0;
                }   
                break; 

            case "clear" :
                errorCode = 0;
                effect(() => {
                    const [_, setTerminalLog] = this.G.terminalLog;
                    setTerminalLog(Array(0));
                    console.log(_);
                });
                break;
            
            case "go" :
                
                const [record, setRecord] = this.G.record;
                const allowedDirections = ["north", "south", "east", "west", "in", "out"];
                
                setCurrentInterface("map");
                
                let trackRoom = World[currentMap][currentRoom];
                let trackMap = currentMap;
                let previousRoom = trackRoom;
                let actionTaken = "";

                ret.push(trackRoom.name) // return [0] as starting room
                if (!_args[1]) {
                    errorCode = 100;
                    break;
                }
                if (_args[1] === "help") {
                    errorCode = 1;
                    break;
                }

                for (let i = 1; i < _args.length; i ++) {
                    if (!allowedDirections.includes(_args[i])) {
                        errorCode = 102; // 102: Bad Direction
                        ret.push(args[i]);
                        break;
                    }
                    previousRoom = trackRoom;
                    const previousRoomDisplayName = getRoomDisplayName(currentMap, previousRoom.name);
                    
                    const nextDirection = World[currentMap][trackRoom.name][_args[i]]?.split(".");
                    
                    console.log(nextDirection);
                    if (!nextDirection) {
                        errorCode = 101; 
                        ret.push(args[i]);
                        ret.push(previousRoomDisplayName);
                        break;
                    }
                    let nextMap = currentMap;
                    let nextRoom = "";
                    
                    if (nextDirection.length > 1) {
                        nextMap = nextDirection[0];
                        nextRoom = nextDirection[1];
                    } else {
                        nextRoom = nextDirection[0]
                    }

                    trackRoom = World[nextMap][nextRoom];
                    trackMap = nextMap;
                    if (!trackRoom) {
                        errorCode = 101; // 101: Disallowed Direction
                        ret.push(args[i]); 
                        ret.push(previousRoomDisplayName);
                        break;
                    } 
                } 
                
                
                switch (errorCode) {
                    case 0:
                        ret.push(`${getRoomDisplayName(trackMap, trackRoom.name)} (${trackRoom.name})`)
                        effect(() => {
                            setCurrentRoom(trackRoom.name);
                            setCurrentMap(trackMap);
                        })
                        break;
                    case 3: 
                        ret.push(`${previousRoom[actionTaken]}`);
                        console.log(trackRoom);

                }

                break;

            case "take":
                const [interactableEvidence, setInteractableEvidence] = this.G.interactableEvidence;
                
                if (!interactableEvidence.some((pieceOfEvidenceWithLocation) => 
                    pieceOfEvidenceWithLocation.map === currentMap &&
                    pieceOfEvidenceWithLocation.room === currentRoom 
                )) {
                    errorCode = 1; //nothing to take
                    break;
                }

                
                let toPutInInventory: Evidence[] = [];
                const remainingInteractableEvidence = interactableEvidence.filter((pieceOfEvidenceWithLocation) => {
                    if (pieceOfEvidenceWithLocation.map !== currentMap) return true;
                    if (pieceOfEvidenceWithLocation.room !== currentRoom) return true;
                    
                    toPutInInventory.push(pieceOfEvidenceWithLocation.evidence);
                    return false;
                })
                
                errorCode = 0;
                ret.push(String(toPutInInventory.map((pieceOfEvidence) => pieceOfEvidence.displayName)));

                effect(() => {
                    setInteractableEvidence(remainingInteractableEvidence);
                    setEvidence([...evidence].concat([...toPutInInventory]));
                }) 
                          
                break;
            case "inspect": 
                if (!_args[1]) {
                    errorCode = 100;
                    break;
                }
                let selectedEvidence: Evidence | null = null;

                setCurrentInterface("evidence");

                for (let piece of evidence) {
                    if (piece.cmdAliases.includes(_args[1])) {
                        selectedEvidence = piece
                        break;
                    };
                }
                if (!selectedEvidence) {
                    errorCode = 101;
                    break;
                }
                ret.push(selectedEvidence.displayName);
                effect(() => {
                    const [record, setRecord] = this.G.record;
                    if (selectedEvidence?.inspectDesc) {
                        const addToRecord = storyPrepareString(Story["inspect-evidence"][1] + selectedEvidence?.inspectDesc)
                        setRecord(record + addToRecord);
                        
                        return;
                    }
                    setRecord(record + Story["inspect-evidence"][0]);
                })
                errorCode = 0;
                break;

            case "db-put" : 
                if (!_args[1]) {
                    errorCode = 100;
                    break;
                }
                effect(() => {
                    const [record, setRecord] = this.G.record;
                    setRecord(record + args.slice(1).join(" "));
                })
                break;

            case "db-tp" : 
                if (!_args[1]) {
                    errorCode = 100;
                    break;
                }
                effect(() => {
                    const [_, setCurrentRoom] = this.G.currentRoom;
                    setCurrentRoom(_args[1]);
                })
                break;
            
            

            default: 
                errorCode = 200;
                break;
        }
        let res :string = (RES[_args[0]] ?? RES["default"])[errorCode](args, ret);
        return [errorCode, res];
    }
    displayify() {

        let style = "";
        let prefix = "";
        switch (true) {
            case this.errorCode >= 200: 
                style = "color: var(--rgb-text-error)";
                prefix = "⁇";
                break;
            case this.errorCode >= 100: 
                style = "color: var(--rgb-text-warning)";
                prefix = "?";
                break;    
            case true:
                style = "color: var(--rgb-text-success)";
                prefix = "$";
                break;  
        }
        
        const s = 
            `<br /><span style="${style}">${prefix} ${this.text}</style>` + 
            (this.res !== "" ? `<br /><span style="color: var(--rgb-text)">${this.res}</span>` : "")
        ;
        return {__html: s};
    }
}

const RES :IRes = {
    "echo" : {
        0 : (args) => `${args.slice(1).join(" ")}`, 
        100 : () => "Please provide something to echo.",
    },

    "clear" : {
        0 : () => ""
    },

    "go" : {
        0: (args, ret) => `Went "${args.slice(1).join(", ")}". You are now in "${ret[1]}".`,
        1: (_, ret) => `You are in "${ret[0]}"<br/>Usage: go <{north, south, east, west}>...<br/>You can specify multiple directions at once to walk in a path.`,
        100: (_, ret) => `You are in "${ret[0]}"<br/>Please provide direction(s) to go.<br/>Usage: go <{north, south, east, west}>...`,
        101: (_, ret) => `"${ret[1]}" is not a valid direction on this path, unable to go "${ret[1]}" from "${ret[2]}".`,
        102: (_, ret) => `"${ret[1]}" is not a valid direction. Try north, south, east, or west.`,
    },

    "take" : {
        0 : (_, ret) => `Took "${ret[0]}".`, 
        1 : () => "There's nothing in this room to take.",
    },
    
    "inspect" : {
        0: (args, ret) => `Inspected "${ret[0]}" (${args[1]}).`,
        100: () => "Please provide something to inspect.",
        101: (args) => `You don't have a piece of evidence named "${args[1]}".`,
    },

    "db-put" : {
        0 : (args) => `[Debug] Put "${args.slice(1).join(" ")}" on the record.`,
        100 : () => "Please provide something to put.",
    },

    "db-tp" : {
        0 : (args) => `[Debug] Attempted to teleport to "${args[1]}".`,
        100 : () => "Please provide a room to teleport to.",
    },

    

    "default" : {
        200: (args) => `Sorry, I don't know what you mean by "${args[0]}".`
    }
}

type IRes = Record<string, Record<number, (args :string[], ret: string[]) => string >>;

const CMD_ALIASES: Record<string, string> = {
    "echo" : "echo",

    "c" : "clear",
    "clear" : "clear",

    "go": "go",
    "move": "go",
    "mv": "go",
    "leave": "go out",
    "enter": "go in",

    "t": "take",
    "take": "take",

    "inspect": "inspect",
    "check": "inspect",
    "i": "inspect",

    "db-put": "db-put",
    "db-tp" : "db-tp",
    
}

const PARAM_ALIASES: Record<string, Record<string, string>> = {
    "echo" : {},
    "clear": {},
    "go": {
        "n": "north",
        "up": "north",
        "s": "south",
        "down": "south",
        "e": "east",
        "right": "east",
        "w": "west",
        "left": "west",
    },
    "db-put" : {},
    "db-tp" : {},
}



