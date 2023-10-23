import "./Interface.css";
import { useGlobal, t } from "../GlobalContextHandler";
import { useEffect, useState, useRef } from "react";

export default function Interface() {
    
    const G = useGlobal();
    const interfaces = ["evidence", "profiles", "map", "memo"];
    let interfacesComponents: Record<string, React.ReactElement> = {
        "evidence" : <Evidence />,
        "profiles" : <Profiles />,
        "map" :      <Map />,
        "memo" :     <Memo />,
    }
    const [currInterface, setCurrInterface] = useState(interfaces[0]);

    useEffect(() => {
        G.interface.currInterface = currInterface;
    }, [currInterface])

    return (
        <section className="interface">
            <nav>
                {interfaces.map((v, i) => {
                    return (
                        <button
                            className={`${v} ${v === currInterface ? "current" : ""}`}
                            onClick={() => {setCurrInterface(v)}}
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
                            className={`screen ${v} ${v === currInterface ? "current" : ""}`}
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
        {name: "Hayu Tē Hakahilo", desc: "a funny guy who is a funny"},
        {name: "Wesley Uehara", desc: "A junior reporter at Long Beach Gazette, and a good friend of mine."},
        {name: "Christian Glauch", desc: "An expert JavaScript developer who hates Rust."},
        {name: "Nishant Suria", desc: "Very sus."},
    ]

    return (
        <>
            <ul>
                {db_profiles.map((profile, i) => {
                    return (
                        <li key={i}>
                            <big>{profile.name}</big>
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
            <big>MAP</big>
            <br />
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
    const [memoText, setMemoText] = useState("");
    const G = useGlobal()
    
    useEffect(() => {
    }, [memoText])

    return (
        <>
            <textarea 
            spellCheck="false" 
            value={memoText} 
            onInput={e => setMemoText((e.target as any).value)}
            />
        
        </>
    )
}
