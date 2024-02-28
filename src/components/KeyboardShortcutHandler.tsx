import React, {useEffect} from "react";
import { useGlobal } from "../GlobalContextHandler";

function KeyboardShortcutHandler() {
    const G = useGlobal();
    const [_, setCurrentInterface] = G.currentInterface;

    const handleKeyboardShortCuts = (event: KeyboardEvent) => {
        if (!(document.activeElement instanceof HTMLElement)) return;
        if (!["BODY", "BUTTON"].includes(document.activeElement.tagName)) {
            switch (event.key) {
                case ("Escape") :
                    document.activeElement.blur();
                    return true;
            }
        } else {
            if (
                event.altKey ||
                event.ctrlKey ||
                event.metaKey
            ) {return false;}
            
            switch (event.key) {
                
                case ("e") :
                    setCurrentInterface("evidence");
                    return true;
                case ("p") :
                    setCurrentInterface("profiles");
                    return true;
                case ("m") :
                    setCurrentInterface("map");
                    return true;
                case ("n") :
                    setCurrentInterface("memo");
                    document.querySelector<HTMLElement>('section.interface div.memo textarea')?.focus();
                    event.preventDefault();
                    return true;
                case ("c") :
                    document.querySelector<HTMLElement>('section.terminal input.command-line:not(.hidden)')?.focus();
                    event.preventDefault();
                    return true;
            }
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleKeyboardShortCuts);
        return () => document.removeEventListener("keydown", handleKeyboardShortCuts);
    }, []);

    return(
        <></>
    );
}

export default KeyboardShortcutHandler;

