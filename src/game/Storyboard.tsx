import { useGlobal } from "../GlobalContextHandler"
import { useEffect } from "react";
import S from "./Story";

interface IProps {
    pushToRecordFn: (s: string) => void
}

export default function Storyboard({pushToRecordFn}: IProps) {
    const G = useGlobal();
    const [F, _] = G.gameFlags;
    const [currentRoom, setCurrentRoom] = G.currentRoom;
    const [currentInterface, setCurrentInterface] = G.currentInterface;
    const [evidence, setEvidence] = G.evidence;

    useEffect(() => {
        if (false) {
        } else if (!F["1-1-checkedPrinter"] && currentRoom === "rec") {
            pushToRecordFn(S["1-1-longbeachgazette-rec-0"][0]);
            F["1-1-checkedPrinter"] = true;
        } else if (!F["1-1-tookNewspaper"] && evidence.some((ev) => ev.name === "newspaper-article-carjacking")) {
            pushToRecordFn(S["1-1-longbeachgazette-rec-0"][1]);
            setCurrentInterface("evidence");
            F["1-1-tookNewspaper"] = true;
        } else if (!F["1-1-talkedToWesley"] && F["1-1-tookNewspaper"] && currentRoom === "lobby") {
            pushToRecordFn(S["1-1-longbeachgazette-lobby-0"][0]);
            F["1-1-talkedToWesley"] = true;
        }
    }, [F, currentRoom, evidence])

    return (<></>)
}