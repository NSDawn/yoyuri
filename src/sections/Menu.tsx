import "./Menu.css"
import { useGlobal } from "../GlobalContextHandler";

export default function Menu() {
    
    const G = useGlobal();
    
    let menuComponents: Record<string, React.ReactElement> = {
        "options": <MenuOptions />

    }

    return (
        <section className="menu">
            

        </section>
    );
}

function MenuOptions() {

    return (
        <>
        </>
    )
}