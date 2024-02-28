export const WorldDisplay :Record<string, RoomDisplay> = {
    "long-beach-gazette-main-office": {
        template: (
            `
long beach gazette main office
. . . . . . . . . . . . . . . . . . . . . . . . .
.              ┌ rec ──────┬ main ──────────────┐
.              │           │                    │
.              │  [?] [?]  │                    │
.              │           │      [?]           │
.              ├ hall ─ # ─┤           [?]      │
. ┌ conf ──────┤           #                    │
. │            #           │                    │
. │  [?] [?]   │  [?] [?]  └───────┬ lobby ─ # ─┤
. │            │                   │   [?] [?]  │
. └────────────┼ rr ─────────── # ─┼────────────┘
.              │                   │             
.              │ [?] [?]           │             
.              └───────────────────┘              
`
        ),
        rooms: ["rec", "main", "conf", "hall", "lobby", "rr"],
        slots: 2,
    }
};


export interface RoomDisplay {
    template: string,
    rooms: string[],
    slots: number,
}

export const World :Record<string, Record<string, Room>> = {
    "long-beach-gazette-main-office" : {
        "rec" : {
            name: "rec",
            south: "hall",
        },
        "main" : {
            name: "main",
            south: "lobby",
            west: "hall",
        },
        "hall" : {
            name: "hall",
            south: "rr",
            north: "rec",
            east: "main",
            west: "conf", 
        },
        "conf": {
            name: "conf",
            east: "hall",
        },
        "lobby" : {
            name: "lobby",
            north: "main",
        },
        "rr" : {
            name: "rr",
            north: "hall",
        },
    }
}

export type Room = Record<string, string>

export type PlaceChar = [char_alias: string, room: string]
export function renderRoomTemplate(roomDisplay: RoomDisplay, placeChars: PlaceChar[]): string {
    let rm = roomDisplay.template;
    
    const default_val = "   ";
    let slotInserts: string[] = Array(roomDisplay.slots * roomDisplay.rooms.length).fill(default_val);
    for (let place of placeChars) {
        let idx = roomDisplay.rooms.indexOf(place[1]) * roomDisplay.slots;
        //console.log(roomDisplay.slots);
        for (let i = 0; i < roomDisplay.slots; i ++) {
            if (slotInserts[idx + i] === default_val) {
                slotInserts[idx + i] = `<span style="color: var(--rgb-text-warning)">[${place[0]}]</span>`;
                break;
                // change hardcoded css later
            }
        }
    }

    const replace_slot_val = "[?]"
    for (let slotInsert of slotInserts) {
        rm = rm.replace(replace_slot_val, slotInsert);
    }
    
    rm = rm.replaceAll("#", "<span style='color: var(--rgb-ui)'>#</span>")
    // change hardcoded css later

    return rm;
}


export default World;