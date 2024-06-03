export const WorldDisplay :Record<string, Location> = {
    "long-beach-gazette-main-office": {
        template: (
            `
              ┌ rec ──────┬ main ──────────────┐
              │           │                    │
              │  [?] [?]  │                    │
              │           │      [?]           │
              ├ hall ─ # ─┤           [?]      │
 ┌ conf ──────┤           #                    │
 │            #           │                    │
 │  [?] [?]   │  [?] [?]  └───────┬ lobby ─ # ─┤
 │            │                   │   [?] [?]  │
 └────────────┼ rr ─────────── # ─┼────────────┘
              │                   │             
              │ [?] [?]           │             
              └───────────────────┘              
`
        ),
        rooms: ["rec", "main", "conf", "hall", "lobby", "rr"],
        roomDisplayNames: ["Rec Room", "Main", "Conference Room", "Hall", "Lobby", "Restrooms"],
        isLargeMap: false,
        slots: 2,
        displayName: "Long Beach Gazette Main Office",
    },
    "long-beach": {
        template: (
            `
                            1st av
                            │
                        [?] │
────── route 1 ──────────── × ──────────────────────────────────────────
                            │
                            │
                 [?]    [?] │             [?]           [?]
──── highwater st ─ × ───── × ────────────── × ─────────── × ────────────────
        ┌────────────┐      │    ┌────────────┐ ┌────────────┐
        │            │      │    │            │ │            │
        │     19     │      │    │     21     │ │     23     │
        │            │      │    │            │ │            │
        ╘════════════╛      │    ╘════════════╛ ╘════════════╛                                                          
            `
        ),
        rooms: ["route-1-&-1st-av", "19-highwater-st", "1st-av-&-highwater-st", "21-highwater-st", "23-highwater-st"],
        roomDisplayNames: ["Route 1 & 1st Av", "19 Highwater St", "Highwater St & 1st Av", "21 Highwater St.", "23 Highwater St."],
        isLargeMap: true,
        slots: 1,
        displayName: "Long Beach",
    }
};


export interface Location {
    displayName: string,
    template: string,
    rooms: string[],
    roomDisplayNames: string[],
    isLargeMap: boolean,
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
    },
    "long-beach": {
        "route-1-&-1st-av": {
            name: "route-1-&-1st-av",
            south: "1st-av-&-highwater-st",
        }, 
        "19-highwater-st": {
            name: "19-highwater-st",
            east: "1st-av-&-highwater-st",
        }, 
        "1st-av-&-highwater-st": {
            name: "1st-av-&-highwater-st",
            west: "19-highwater-st",
            north: "route-1-&-1st-av",
            east: "21-highwater-st"
        }, 
        "21-highwater-st": {
            name: "21-highwater-st",
            west: "1st-av-&-highwater-st",
            east: "23-highwater-st",
        }, 
        "23-highwater-st" : {
            name: "23-highwater-st",
            west: "21-highwater-st"
        },

    }
}

export type Room = Record<string, string>
import { Profile } from "./ProfileList";

export type PlaceChar = [profile: Profile, room: string]
export function renderRoomTemplate(location: Location, placeChars: PlaceChar[]): string {
    let rm = location.template;
    
    const default_val = "   ";
    let slotInserts: string[] = Array(location.slots * location.rooms.length).fill(default_val);
    for (let place of placeChars) {
        let idx = location.rooms.indexOf(place[1]) * location.slots;
        //console.log(roomDisplay.slots);
        for (let i = 0; i < location.slots; i ++) {
            if (slotInserts[idx + i] === default_val) {
                slotInserts[idx + i] = `<span class="map-point-of-interest" data-display-name="${place[0].displayName}" data-cmd-alias="${place[0].cmdAliases[0]}">[${place[0].mapChar}]</span>`;
                break;
                // change hardcoded css later
            }
        }
    }

    const replace_slot_val = "[?]"
    for (let slotInsert of slotInserts) {
        rm = rm.replace(replace_slot_val, slotInsert);
    } 
    
    rm = rm.replaceAll("#", "<span style='color: var(--rgb-ui)'>#</span>");

    if (location.isLargeMap) {
        for (let i in location.rooms) {
            rm = rm.replace("×", `<span class="map-point-of-interest" data-display-name="${location.roomDisplayNames[i]}" data-cmd-alias="${location.rooms[i]}">!_REPLACE_!</span>`);
        }
        rm = rm.replaceAll("!_REPLACE_!", "×")
    }
    
    return rm;
}


export function getRoomDisplayName(locationName: string, roomName: string): string {
    if (!WorldDisplay[locationName]) return "";
    if (!WorldDisplay[locationName].rooms.includes(roomName)) return "";
    return WorldDisplay[locationName].roomDisplayNames[WorldDisplay[locationName].rooms.indexOf(roomName)];
}

export default World;