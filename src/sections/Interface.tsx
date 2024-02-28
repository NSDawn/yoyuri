import "./Interface.css";
import { useGlobal, t } from "../GlobalContextHandler";
import { useEffect, useState, useRef } from "react";

export default function Interface() {
    
    const interfaces = ["evidence", "profiles", "map", "memo"];
    let interfacesComponents: Record<string, React.ReactElement> = {
        "evidence" : <InterfaceEvidence />,
        "profiles" : <InterfaceProfiles />,
        "map" :      <InterfaceMap />,
        "memo" :     <InterfaceMemo />,
    }
    const [currentInterface, setCurrentInterface] = useGlobal().currentInterface;
    // set interface onload.
    useEffect(() => {setCurrentInterface(interfaces[0])}, [])
    // add keyboard shortcuts for

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

import { Evidence } from "../game/EvidenceList";

function InterfaceEvidence() {

    const [evidence, setEvidence] = useGlobal().evidence;
    const [terminalLine, setTerminalLine] = useGlobal().terminalLine;
    const [areDetailsShown, setAreDetailsShown] = useState(Array(evidence.length).fill(false));

    return (
        <>
            <h2>{t("interface/evidence/h")}</h2>
            <div className="evidence-list">
                {evidence.map((piece: Evidence, i: number) => {
                    const INSPECT_CMD = 'inspect';
                    return (
                        <div key={i}>
                            <div className="name-wrapper">
                                <div className="icon">
                                    {piece.icon}
                                </div>
                                <a
                                    onClick = {() => { setTerminalLine(`${terminalLine.split(" ")[0] || INSPECT_CMD} ${piece.name}`) }}
                                >
                                    <h3>{piece.displayName}</h3> 
                                    <span className="cmd-alias">{piece.cmdAliases[0]}</span>
                                </a>
                            </div>
                            <div className={`more-info ${areDetailsShown[i] ? "current" : ""}`}>
                                <span className="italic">
                                    (
                                    <span className="type">{piece.type}</span>
                                    )
                                    <br />
                                    <span className="origin">{piece.origin}</span>
                                    <span className="desc"><pre>{piece.desc}</pre></span>
                                </span>
                            </div>
                            <button
                                onClick= {() => {let arr = [...areDetailsShown]; arr[i] = !areDetailsShown[i]; setAreDetailsShown(arr);}}
                            >
                                {areDetailsShown[i] ? "-" : "+"}
                            </button>

                        </div>
                    )
                })}
            </div>
        </>
    )
}

import { Profile } from "../game/ProfileList";
function InterfaceProfiles() {

    const [profiles, setProfiles] = useGlobal().profiles;
    const [terminalLine, setTerminalLine] = useGlobal().terminalLine;

    const [areDetailsShown, setAreDetailsShown] = useState(Array(profiles.length).fill(false));

    

    return (
        <>
            <h2>{t("interface/profiles/h")}</h2>
            <div className="profiles-list">
                {profiles.map((profile: Profile, i: number) => {
                    const SPEAK_CMD = 'speak';
                    return (
                        <div key={i}>
                            <div className="name-wrapper">
                                <div className="icon">
                                    {profile.icon}
                                </div>
                                <a
                                    onClick = {() => { setTerminalLine(`${terminalLine.split(" ")[0] || SPEAK_CMD} ${profile.name}`) }}
                                >
                                    <h3>{profile.displayName}</h3> 
                                    <span className="cmd-alias">{profile.cmdAliases[0]}</span>
                                </a>
                            </div>
                            <div className={`more-info ${areDetailsShown[i] ? "current" : ""}`}>
                                <span className="italic">
                                    (
                                    <span className="age">{profile.age}</span>,&nbsp;
                                    <span className="ethnicity">{profile.ethnicity}</span>
                                    )
                                    <br />
                                    <span className="hometown">{profile.hometown}</span>&nbsp;
                                    <br />
                                    <span className="desc"><pre>{profile.desc}</pre></span>
                                </span>
                            </div>
                            <button
                                onClick= {() => {let arr = [...areDetailsShown]; arr[i] = !areDetailsShown[i]; setAreDetailsShown(arr);}}
                            >
                                {areDetailsShown[i] ? "-" : "+"}
                            </button>

                        </div>
                    )
                })}
            </div>
        </>
    )
}

import { tRoom } from "../GlobalContextHandler";
import Typewriter from "../components/Typewriter";

function InterfaceMap() {

    const [map, setMap] = useState(
        tRoom("long-beach-gazette-main-office", [["H", "main"], ["U", "lobby"]])
    );
    const G = useGlobal()
    const [currentRoom, setCurrentRoom] = G.currentRoom;
    const [currentMap, setCurrentMap] = G.currentMap;
    const charDelay = 20;

    useEffect(() => {
        setMap(tRoom(currentMap, [["H", currentRoom], ["U", "lobby"]]));
    }, [currentMap, currentRoom]);

    return (
        <>
            <h2>MAP</h2>
            <pre><code dangerouslySetInnerHTML={{__html: map }}>
                
            </code></pre>
        </>
    )
}

function InterfaceMemo() {
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
