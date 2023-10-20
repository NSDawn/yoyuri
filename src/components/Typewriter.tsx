import { useState, useEffect } from "react";

interface IProps {
    text :string;
    delay :number;
}

export default function Typewriter({text, delay} :IProps) {
    const [visibleChars, setVisibleChars] = useState(0);

    useEffect(() => { 
        if (visibleChars < text.length) {
            const timeout = setTimeout(() => {
                setVisibleChars(visibleChars + 1);
            }, delay);
    
            return () => clearTimeout(timeout)
        }
    }, [visibleChars, delay, text])
    
    return (
        <span>
            {text.substring(0, visibleChars)}
        </span>
    )
}
