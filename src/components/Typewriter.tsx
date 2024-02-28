import { useState, useEffect } from "react";
import { useGlobal, State } from "../GlobalContextHandler";

interface IProps {
    text :string;
    delay :number;
    isAnimatingFunction: (set: boolean) => void|boolean
    imgIconsState :State<string[]>
}

export default function Typewriter({text, delay, isAnimatingFunction, imgIconsState} :IProps) {
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

                let textNow = text.substring(0, _visibleChars)
                let imgIconTagIdx = textNow.lastIndexOf("<I:") // <I:0:bingus_filename/>
                if (imgIconTagIdx != -1) {
                    let cmd = "";
                    while (textNow[imgIconTagIdx] != "/" && textNow[imgIconTagIdx]) {
                        cmd += textNow[imgIconTagIdx];
                        imgIconTagIdx ++;
                    }
                    console.log(cmd);
                    let [_, imgIconIdx, imgIconFilename] = cmd.split(":");
                    let [imgIcons, setImgIcons] = imgIconsState;
                    let arr = [...imgIcons];
                    arr[parseInt(imgIconIdx)] = imgIconFilename;
                    setImgIcons(arr);
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
