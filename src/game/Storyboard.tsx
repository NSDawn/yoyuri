import { useGlobal } from "../GlobalContextHandler"
import { useEffect } from "react";
import S from "./Story";

interface IProps {
    pushToRecordFn: (s: string) => void
}

export default function Storyboard({pushToRecordFn}: IProps) {
    const G = useGlobal();
    const [F, _] = G.gameFlags;
    const [currentRoom, setCurrentRoom] = useGlobal().currentRoom;
    const [evidence, setEvidence] = useGlobal().evidence;

    useEffect(() => {
        console.log(evidence);
        if (!F["1-1-checkedPrinter"] && currentRoom === "rec") {
            pushToRecordFn(S["1-1-longbeachgazette-rec-0"][0]);
            F["1-1-checkedPrinter"] = true;
        }
        if (!F["1-1-tookNewspaper"] && evidence.some((ev) => ev.name === "newspaper-article-carjacking")) {
            pushToRecordFn(S["1-1-longbeachgazette-rec-0"][1]);
            F["1-1-tookNewspaper"] = true;
        }
    }, [F, currentRoom, evidence])

    return (<></>)
}