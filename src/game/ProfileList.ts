

const _P :Record<string, Profile> = {
    "": {
        name :"",
        cmdAliases :[""],
       
        displayName :"",
        icon: "👤",
        age: 0,
        ethnicity: "",
        hometown: "",
        desc: "",
    },
    "hayu-te-hakahilo": {
        name :"hayu-te-hakahilo",
        cmdAliases :["hth", "hh", "hayu-te-hakahilo", "hayu-tē-hakahilo", "hayu-hakahilo"],
       
        displayName :"Hayu Tē Hakahilo",
        icon: "👤",
        age: 25,
        ethnicity: "Kaùloan",
        hometown: "Hakataù, KA",
        desc: "Although I was once a public defender, for now I'm a investigative reporter at Long Beach Gazette.",
    },
    "wesley-uehara": {
        name :"wesley-uehara",
        cmdAliases :["wu", "wesley-uehara"],
        
        displayName :"Wesley Uehara",
        icon: "👤",
        age: 19,
        ethnicity: "Nisei Japanese",
        hometown: "Long Beach, CA",
        desc: "A junior intern at Long Beach Gazette, and a good friend of mine.",
    },
} 

export const ProfileList :Record<string, Record<string, Profile>> = {
    "hayu-te-hakahilo": {
        "prototype": {..._P["hayu-te-hakahilo"]},
    },
    "wesley-uehara" : {
        "prototype" : {..._P["wesley-uehara"]}
    },

}

export interface Profile {
    name :string,
    cmdAliases :string[],
    displayName :string,
    
    icon: string,
    age: number,
    ethnicity: string,
    hometown: string,
    desc: string,
};

// make a dictionary of base objects and then only store the differences.