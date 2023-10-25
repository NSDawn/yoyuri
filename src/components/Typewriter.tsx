import { useState, useEffect } from "react";
import { useGlobal } from "../GlobalContextHandler";

interface IProps {
    text :string;
    delay :number;
    isAnimatingFunction: (set: boolean) => void|boolean
}

export default function Typewriter({text, delay, isAnimatingFunction} :IProps) {
    const [visibleChars, setVisibleChars] = useState(0);
    const [animateCursor, setAnimateCursor] = useState(false);

    useEffect(() => { 
        if (visibleChars < text.length) {
            const timeout = setTimeout(() => {
                let _visibleChars = visibleChars;
                let nextChar =  text[++_visibleChars]; 

                if (nextChar === "<") { // skip through html tags 
                    while (nextChar !== ">") {
                        nextChar = text[++_visibleChars];
                    }
                }
                
                setVisibleChars(_visibleChars);
            }, delay);
            setAnimateCursor(true);
            isAnimatingFunction(true);
            return () => clearTimeout(timeout)
        } 
        setAnimateCursor(false);
        isAnimatingFunction(false);
    }, [visibleChars, delay, text]);

   
    
    return (
        <span
            dangerouslySetInnerHTML = {{__html: 
                text.substring(0, visibleChars) + 
                (animateCursor ? " |" : "")
            }} 
        />
    )
}
