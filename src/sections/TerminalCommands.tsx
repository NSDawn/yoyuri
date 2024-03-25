import { GlobalSingleton, useGlobal } from "../GlobalContextHandler";
import { World } from "../game/World";
import { useState } from "react";
import { Evidence } from "../game/EvidenceList";

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
        return this.rawtext_unsafe.replace(/</g, "&lt;").replace(/>/g, "&gt;").trim();
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
                const allowedDirections = ["north", "south", "east", "west"];
                
                let trackRoom = World[currentMap][currentRoom];
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
                    trackRoom = World[currentMap][World[currentMap][trackRoom.name][_args[i]]];
                    if (!trackRoom) {
                        errorCode = 101; // 101: Disallowed Direction
                        ret.push(args[i]);
                        break;
                    } 
                } if (errorCode === 0) {
                    ret.push(`${trackRoom.diisplayName}(${trackRoom.name})`)
                    effect(() => {
                        setCurrentRoom(trackRoom.name);
                    })
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
            
            default : 
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
        101: (_, ret) => `"${ret[1]}" is not a valid direction on this path.`,
        102: (_, ret) => `"${ret[1]}" is not a valid direction. Try north, south, east, or west.`,
    },

    "take" : {
        0 : (_, ret) => `Took "${ret[0]}".`, 
        1 : () => "There's nothing in this room to take.",
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

    "t": "take",
    "take": "take",

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



