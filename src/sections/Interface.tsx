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

import { tProfile } from "../GlobalContextHandler";
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
import { WorldDisplay } from "../game/World";

function InterfaceMap() {

    const [map, setMap] = useState(
        tRoom("long-beach-gazette-main-office", [
            [tProfile("hayu-te-hakahilo","prototype"), "main"], 
            [tProfile("wesley-uehara","prototype"), "lobby"]
        ])
    );
    const G = useGlobal()
    const [currentRoom, setCurrentRoom] = G.currentRoom;
    const [currentMap, setCurrentMap] = G.currentMap;
    const charDelay = 20;
    const codeElement = useRef(null);
    const infoBoxElement = useRef(null);

    useEffect(() => {
        setMap(tRoom(currentMap, [
            [tProfile("hayu-te-hakahilo","prototype"), currentRoom], 
            [tProfile("wesley-uehara","prototype"), "lobby"]
        ]));
    }, [currentMap, currentRoom]);

    // very sus
    useEffect(() => {
        if (codeElement.current) {
            
            const v :any = codeElement.current;
            const elemChars = v.querySelectorAll(".map-point-of-interest");
            
            function mouseoverFnGenerator(el: HTMLElement) {
                return (() => {
                    if (infoBoxElement.current) {
                        const infoBoxElementCurrent: HTMLElement = infoBoxElement.current;
                        infoBoxElementCurrent.textContent = `${el.dataset.displayName} (${el.dataset.cmdAlias})`;
                    }
                })
            }
            function mouseoutFnGenerator(el: HTMLElement) {
                return (() => {
                    if (infoBoxElement.current) {
                        const infoBoxElementCurrent: HTMLElement = infoBoxElement.current;
                        infoBoxElementCurrent.textContent = WorldDisplay[currentMap].displayName;
                    }
                })
            }
            
            const eventListenersToRemove : Array<[HTMLElement, string, EventListener]> = [];
            
            for (const el of elemChars) {
                const f = mouseoverFnGenerator(el);
                el.addEventListener("mouseover", f);
                eventListenersToRemove.push([el, "mouseover", f]);
            }
            for (const el of elemChars) {
                const f = mouseoutFnGenerator(el);
                el.addEventListener("mouseout", f);
                eventListenersToRemove.push([el, "mouseout", f]);
            }
            return () => {
                for (const event of eventListenersToRemove) {
                    event[0].removeEventListener(event[1], event[2])
                }
            }
        }
    }, [codeElement, map])

    return (
        <>
            <h2>MAP</h2>
            <pre><code ref={codeElement} dangerouslySetInnerHTML={{__html: map}}>
                
            </code>
            </pre>

            <div ref={infoBoxElement} className="infobox">
                {WorldDisplay[currentMap].displayName}
            </div>
        </>
    )
}

function InterfaceMemo() {
    const [memo, setMemo] = useGlobal().memo;
    const [memoPage, setMemoPage] = useGlobal().memoPage;
    const [currentMemo, setCurrentMemo] = useState("");
    const maxMemoLength = 5;

    useEffect(() => {
        setCurrentMemo(memo[memoPage]);
        console.log(memo);
    }, [memoPage]);

    useEffect(() => {
        setMemo(memo.map((_, i) => {
            if (i !== memoPage) return memo[i];
            return currentMemo;
        }));
    }, [currentMemo]);

    return (
        <>
            <div className="memo-header-wrapper">
                <h2>{t("interface/memo/h")}</h2>      
                
                <div className="memo-buttons">
                    {currentMemo !== "" ? 
                    <button className="" onClick={() => {setCurrentMemo("")}}>{t("interface/memo/clear-button")}</button>
                    : null}
                    <button className="" onClick={() => {setMemoPage((memoPage - 1 + maxMemoLength) % maxMemoLength)}}>{t("interface/memo/previous-button")}</button>
                    <span>{memoPage + 1}</span>
                    <button className="" onClick={() => {setMemoPage((memoPage + 1) % maxMemoLength)}}>{t("interface/memo/next-button")}</button>
                </div>  
                
            </div>
            <textarea
                spellCheck="false" 
                value={currentMemo} 
                onInput={e => setCurrentMemo((e.target as any).value)}
            />
        
        </>
    )
}
