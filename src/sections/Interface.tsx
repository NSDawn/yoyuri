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
            yeetussy
        </>
    )
}

function Profiles() {

    const db_profiles = [
        {id: "hayu-te-hakahilo", name: "Hayu Tē Hakahilo", desc: "a funny guy who is a funny"},
        {id: "wesley-uehara", name: "Wesley Uehara", desc: "A junior reporter at Long Beach Gazette, and a good friend of mine."},
        {id: "christian-glauch", name: "Christian Glauch", desc: "An expert JavaScript developer who hates Rust."},
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

function Map() {
    return (
        <>
            <h2>MAP</h2>
            <span>
                -------------+........<br />
                .............|........<br />
                .............|........<br />
                ............[X].......<br />
                .............|........<br />
                .............+--------<br />
                ......................<br />
            </span>
        </>
    )
}

function Memo() {
    const [memo, setMemo] = useGlobal().memo;
    
    useEffect(() => {
    }, [memo])

    return (
        <>
            <h2>MEMO</h2>
            <textarea 
            spellCheck="false" 
            value={memo} 
            onInput={e => setMemo((e.target as any).value)}
            />
        
        </>
    )
}
