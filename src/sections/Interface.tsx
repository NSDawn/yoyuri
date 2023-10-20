import "./Interface.css";
import { useGlobal } from "../GlobalContextHandler";
import { useEffect } from "react";

export default function Interface() {
    
    const G = useGlobal();

    return (
        <section className="interface">
            some text over here
        </section>
    )
}
