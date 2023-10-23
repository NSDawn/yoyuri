import { GlobalSingleton, useGlobal } from "../GlobalContextHandler";
import { useState } from "react";

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
    error_code            :number;
    res                   :string;
    display               : {__html: string};

    constructor(G: GlobalSingleton, input = "") {
        this.G = G;
        this.rawtext_unsafe = input;
        this.text = this.sanitize();
        [this.args, this.error_code, this.res] = this.parse_and_run();
        
        this.display = this.displayify();
    }
    sanitize() {
        return this.rawtext_unsafe.replace(/</g, "&lt;").replace(/>/g, "&gt;").trim();
    }
    parse_and_run(): [string[], number, string] {
        let args = this.parse(this.text)
        let [error_code, res] = this.run(args);

        return [args, error_code, res];
    }
    parse(text :string) :string[] {
        let args = this.text.split(" ");
        return args
    }
    run(args :string[]) :[number, string] {
        let error_code = 0;
        let args0 :string = CMD_ALIASES[args[0]] ?? args[0];
        const doEffects = true;
        const effect = (fn :Function) => {if (doEffects) fn()}

        switch (args0) {
            case "echo" : 
                switch (true) {
                    case (!args[1]) :
                        error_code = 100;
                        break;
                    default : 
                        error_code = 0;
                }   
                break; 

            case "clear" :
                error_code = 0;
                effect(() => {
                    const [_, setTerminal] = this.G.terminal;
                    setTerminal([]);
                });
                break;

            case "debug-put" : 
                if (!args[1]) {
                    error_code = 100;
                    break;
                }
                effect(() => {
                    const [record, setRecord] = this.G.record;
                    setRecord(record + args.slice(1).join(" "));
                })
                break;
            
            default : 
                error_code = 200;
                break;
        }
        let res :string = (RES[args0] ?? RES["default"])[error_code](args);
        return [error_code, res];
    }
    displayify() {

        let style = "";
        let prefix = "";
        switch (true) {
            case this.error_code >= 200: 
                style = "color: var(--rgb-text-error)";
                prefix = "⁇";
                break;
            case this.error_code >= 100: 
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

    "debug-put" : {
        0 : (args) => `<Debug> Put "${args.slice(1).join(" ")}" on the record.`,
        100 : () => "Please provide something to put.",
    },

    "default" : {
        200: (args) => `Sorry, I don't know what you mean by "${args[0]}".`
    }
}

type IRes = Record<string, Record<number, (args :string[]) => string >>;

const CMD_ALIASES: Record<string, string> = {
    "echo" : "echo",
    "c" : "clear",
    "clear" : "clear",
}



