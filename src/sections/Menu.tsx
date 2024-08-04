import "./Menu.css"
import { useEffect, useState } from "react";
import { useGlobal, t } from "../GlobalContextHandler";
import { State } from "../GlobalContextHandler";

export default function Menu() {
    
    const G = useGlobal();
    
    let menuComponents: Record<string, React.ReactElement> = {
        "options": <MenuOptions />,
        "save": <MenuSave />
    }
    let menuComponentKeys = ["options","save"];
    const [currentMenuComponent, setCurrentMenuComponent] = useGlobal().currentMenuComponent;

    return (
        <section className="menu">
            <nav>
                {menuComponentKeys.map((key, i) => {return (
                        <button
                        className={`${key} ${key === currentMenuComponent ? "current" : ""}`}
                        onClick={() => {setCurrentMenuComponent(key)}}
                        key = {i}
                        > {t(`menu/${key}`)}
                        </button>
                )})}
            </nav>
            <>
                {menuComponentKeys.map((key, i) => {
                    return (
                        <div 
                            className={`screen ${key} ${key === currentMenuComponent ? "current" : ""}`}
                            key = {i}
                        >
                            {menuComponents[key]}
                        </div>
                    )
                })
                }
            </>
        </section>
    );
}

function MenuOptions() {
    const optionKeys = ["recordTextSpeed", "colorTheme"];
    const [gameConfig, setGameConfig] = useGlobal().gameConfig;
    const [recordTextSpeed, setRecordTextSpeed] = useState("medium");
    const [colorTheme, setColorTheme] = useState("theme-default");
    
    useEffect(() => {
        const charDelays: Record<string, number> = {
            "slow": gameConfig._recordSlowCharDelay,
            "medium": gameConfig._recordMediumCharDelay,
            "fast": gameConfig._recordFastCharDelay,
            "max": gameConfig._recordMinCharDelay,
        } 
        gameConfig.recordCharDelay = charDelays[recordTextSpeed];
        setGameConfig({...gameConfig});
    }, [recordTextSpeed])

    useEffect(() => {
        gameConfig.colorTheme = colorTheme;
        setGameConfig({...gameConfig});
    }, [colorTheme])

    const options: Record<string, React.ReactElement> = {
        recordTextSpeed: 
            <MenuOptionStatefulButton
                optionText = {t("menu/options/text-speed")}
                states = {{
                    "slow": ">🐌...",
                    "medium": ">>🐢..",
                    "fast": ">>>🐎.",
                    "max": ">>>>🐇",
                }}
                stateVariableSetFunction={setRecordTextSpeed}
                stateKeys = {[ "medium", "fast", "max", "slow",]}
            >
            </MenuOptionStatefulButton>,
        colorTheme:
            <MenuOptionStatefulButton
                optionText = {t("menu/options/color-theme")}
                states = {{
                    "theme-default": "🌙...",
                    "theme-monokai": ".💫..",
                    "theme-brownie": "..🍰.",
                    "theme-light": "...💡",
                }}
                stateVariableSetFunction={setColorTheme}
                stateKeys = {["theme-default", "theme-monokai", "theme-brownie", "theme-light"]}
            >
            </MenuOptionStatefulButton>,
                
    }

    return (
        <>
            <h2>{t("menu/options/h")}</h2>
            <> 
                {optionKeys.map((key) => options[key])}
            </>
        </>
    )
}

interface iMenuOptionStatefulButtonProps {
    optionText: string,
    states: Record<string, string>,
    stateVariableSetFunction: (toSet: string) => void,
    stateKeys: string[],
}

function MenuOptionStatefulButton({optionText, states, stateVariableSetFunction, stateKeys}: iMenuOptionStatefulButtonProps) {
    
    const [currentStateIdx, setCurrentStateIdx] = useState(0);
    
    function incrementState() {
        let newIdx = (currentStateIdx + 1) % stateKeys.length
        setCurrentStateIdx(newIdx);
        stateVariableSetFunction(stateKeys[newIdx]);
    }

    return (
        <li>
            <span>{optionText}</span>
            <button
                onClick = {incrementState}
            >{states[stateKeys[currentStateIdx]]}</button>
        </li>
    )
}



function MenuSave() {

    return (
        <>
            <h2>{t("menu/save/h")}</h2>
            <p> TODO: IMPLEMENT LATER YOU HOE</p>
            <button> SAVE </button>
            <button> LOAD </button>
        </>
        
    )
}