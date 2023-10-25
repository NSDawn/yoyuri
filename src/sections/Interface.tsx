import "./Interface.css";
import { useGlobal, t } from "../GlobalContextHandler";
import { useEffect, useState, useRef } from "react";

export default function Interface() {
    
    const interfaces = ["evidence", "profiles", "map", "memo"];
    let interfacesComponents: Record<string, React.ReactElement> = {
        "evidence" : <Evidence />,
        "profiles" : <Profiles />,
        "map" :      <Map />,
        "memo" :     <Memo />,
    }
    const [currentInterface, setCurrentInterface] = useGlobal().currentInterface;

    useEffect(() => {setCurrentInterface(interfaces[0])}, [])

    return (
        <section className="interface">
            <nav>
                {interfaces.map((v, i) => {
                    return (
                        <button
                            className={`${v} ${v === currentInterface ? "current" : ""}`}
                            onClick={() => {setCurrentInterface(v)}}
                            key = {i}

                        > {t(`interface/${v}`)}
                        </button>
                    )
                })
                }
            </nav>
            <>
                {interfaces.map((v, i) => {
                    return (
                        <div 
                            className={`screen ${v} ${v === currentInterface ? "current" : ""}`}
                            key = {i}
                        >
                            {interfacesComponents[v]}
                        </div>
                    )
                })
                }
            </>
        </section>
    )
}

function Evidence() {
    return (
        <>
            <h2>{t("interface/evidence/h")}</h2>

        </>
    )
}

function Profiles() {

    const db_profiles = [
        {id: "hayu-te-hakahilo", name: "Hayu Tē Hakahilo", desc: "Although I was once a public defender, for now I'm a investigative reporter at Long Beach Gazette."},
        {id: "wesley-uehara", name: "Wesley Uehara", desc: "A junior reporter at Long Beach Gazette, and a good friend of mine."},
        {id: "nishant-suria", name: "Nishant Suria", desc: "Very sus."},
    ];

    const [terminalLine, setTerminalLine] = useGlobal().terminalLine;

    return (
        <>
            <h2>PROFILES</h2>
            <ul>
                {db_profiles.map((profile, i) => {
                    const SPEAK_CMD = 'speak';
                    return (
                        <li key={i}>
                            <button
                                onClick = {() => { setTerminalLine(`${terminalLine.split(" ")[0] || SPEAK_CMD} ${profile.id}`) }}
                            >{profile.name}</button>
                            <br />
                            <span className="italic">{profile.desc}</span>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

import { tRoom } from "../GlobalContextHandler";
import Typewriter from "../components/Typewriter";

function Map() {

    const [map, setMap] = useState(
        tRoom("long-beach-gazette-main-office", [["H", "rr"], ["C", "main"]])
    );
    const G = useGlobal()
    const [currentRoom, setCurrentRoom] = G.currentRoom;
    const [currentMap, setCurrentMap] = G.currentMap;
    const charDelay = 20;

    useEffect(() => {
        setMap(tRoom(currentMap, [["H", currentRoom], ["C", "main"]]));
    }, [currentMap, currentRoom]);

    return (
        <>
            <h2>MAP</h2>
            <pre><code dangerouslySetInnerHTML={{__html: map }}>
                
            </code></pre>
        </>
    )
}

function Memo() {
    const [memo, setMemo] = useGlobal().memo;
    
    useEffect(() => {
    }, [memo])

    return (
        <>
            <div className="memo-header-wrapper">
                <h2>{t("interface/memo/h")}</h2>
                {memo !== "" ? 
                <button className="memo-clear-button" onClick={() => {setMemo("")}}>{t("interface/memo/clear-button")}</button>
                : null}
            </div>
            <textarea 
            spellCheck="false" 
            value={memo} 
            onInput={e => setMemo((e.target as any).value)}
            />
        
        </>
    )
}
