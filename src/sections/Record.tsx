import "./Record.css"
import { useGlobal } from "../GlobalContextHandler";
import { useEffect, useState } from "react";
import Typewriter from "../components/Typewriter";

export default function Record() {
    const G = useGlobal();
    const charDelay = 20;

    return (
        <section className="record">
            <Typewriter text={G.record.text} delay={charDelay}></Typewriter>
        </section>
    );
}