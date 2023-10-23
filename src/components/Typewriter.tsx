import { useState, useEffect } from "react";

interface IProps {
    text :string;
    delay :number;
}

export default function Typewriter({text, delay} :IProps) {
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
            return () => clearTimeout(timeout)
        } 
        setAnimateCursor(false);
    }, [visibleChars, delay, text])
    
    return (
        <span
            dangerouslySetInnerHTML = {{__html: 
                text.substring(0, visibleChars) + 
                (animateCursor ? " |" : "")
            }} 
        />
    )
}
