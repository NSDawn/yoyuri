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

    useEffect(() => {
        if (!F["1-1-checkedPrinter"] && currentRoom === "rec") {
            pushToRecordFn(S["1-1-longbeachgazette-rec-0"][0]);
            F["1-1-checkedPrinter"] = true;
        }
    }, [F, currentRoom])

    return (<></>)
}