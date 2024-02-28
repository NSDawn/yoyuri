import "./Record.css"
import { useGlobal, tStory } from "../GlobalContextHandler";
import { useEffect, useState, useRef } from "react";
import Typewriter from "../components/Typewriter";
import Storyboard from "../game/Storyboard";

export default function Record() {
    const charDelay = 35;
    const refRecord = useRef<HTMLElement>(null);

    const [record, setRecord] = useGlobal().record;
    const [isRecordAnimating, setIsRecordAnimating] = useGlobal().isRecordAnimating;
    const [imgIcons, setImgIcons] = useGlobal().imgIcons;

    /* for debugging purposes */
    useEffect(() => {
        setRecord(tStory("1-1-longbeachgazette-main-0", 0))
    }, []);

    const scrollRecordAllTheWayDown = () => {
        if (refRecord.current) refRecord.current.scrollTop = refRecord.current.scrollHeight;
    }

    useEffect(() => {
        let intervalId: any;
        const interval = 200;
        if (isRecordAnimating) {
          intervalId = setInterval(scrollRecordAllTheWayDown, interval);
        }
        return () => {
          clearInterval(intervalId);
        };
    }, [isRecordAnimating]);

    const pushToRecord = (s: string) => {
        setRecord(record + s)
    }

    return (
        <section className={`record ${isRecordAnimating ? "noscroll unselectable": ""}`} ref={refRecord}>
            <img 
                className="face-icon" 
                src={getImgIconAssetsPath(imgIcons[0])} 
                alt={`speaker icon ${imgIcons[0]}`} 
            />
            <div className="record-text">
                <Typewriter 
                    text={record} 
                    delay={charDelay} 
                    isAnimatingFunction={setIsRecordAnimating} 
                    imgIconsState={useGlobal().imgIcons}
                    
                />
            </div>
            <Storyboard pushToRecordFn={pushToRecord}/>
        </section>
    );
}


const validPeople = ["wesley"]
function getImgIconAssetsPath(filename: string): string {
    let [out_person, out_expression] = filename.split("_");
    if (!validPeople.includes(out_person)) out_person = "missing";
    return `/assets/img/face_sprites/${out_person}_${out_expression}.png`;
}

