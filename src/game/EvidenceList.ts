const _E :Record<string, Evidence> = {
    "": {
        name: "",
        cmdAliases: [""],
        displayName: "",

        origin: "",
        icon: "",
        type: "",
        desc: "",
    },
    "red-herring": {
        name: "red-herring",
        cmdAliases: ["rh", "herring"],
        displayName: "Red Herring",

        origin: "Found at the fish market.",
        icon: "🐟",
        type: "produce",
        desc: "Seems quite conspicous. Could be the key to solving the entire case.",
    },
    "utah-teapot": {
        name: "utah-teapot",
        cmdAliases: ["ut", "teapot"],
        displayName: "Utah Teapot",

        origin: "Unknown.",
        icon: "🫖",
        type: "artifact",
        desc: "A refined item of exemplary design.",
    },
    "email-tip-estrella": {
        name: "email-tip-estrella",
        cmdAliases: ["et", "email-tip"],
        displayName: "Email Tip",

        origin: "Emailed by Estrella de la Cruz.",
        icon: "📧",
        type: "document",
        desc: "---\nHayu.\nSan Diego carjacking. H4KT01E34. Please follow up.\n-E",
    },
    "newspaper-article-carjacking": {
        name: "newspaper-article-carjacking",
        cmdAliases: ["na", "newspaper-article"],
        displayName: "Newspaper Article",

        origin: "Printed myself.",
        icon: "📰",
        type: "document",
        desc: "An article from the San Diego Times about a carjacking, involving the arrest of Alejandro Perez.",
    },

}

export const EvidenceList  :Record<string, Record<string, Evidence>> = {
    "red-herring" : {
        "prototype": {..._E["red-herring"]}
    },
    "utah-teapot" : {
        "prototype": {..._E["utah-teapot"]}
    },
    "email-tip-estrella" : {
        "prototype": {..._E["email-tip-estrella"]}
    },
    "newspaper-article-carjacking" : {
        "prototype": {..._E["newspaper-article-carjacking"]}
    }
}
export interface Evidence {
    name :string,
    cmdAliases :string[],
    displayName :string,
    
    origin: string,
    icon :string,
    type :string,
    desc :string,
}