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
        inspectDesc: `
| The Utah teapot, or the Newell teapot, is a 3D test model that has become a standard reference object and an in-joke[1] within the computer graphics community. It is a mathematical model of an ordinary Melitta-brand teapot that appears solid with a nearly rotationally symmetrical body. Using a teapot model is considered the 3D equivalent of a "Hello, World!" program, a way to create an easy 3D scene with a somewhat complex model acting as the basic geometry for a scene with a light setup. Some programming libraries, such as the OpenGL Utility Toolkit,[2] even have functions dedicated to drawing teapots.
        `
    },
    "email-tip-estrella": {
        name: "email-tip-estrella",
        cmdAliases: ["et", "email-tip"],
        displayName: "Email Tip",

        origin: "Emailed by Estrella de la Cruz.",
        icon: "📧",
        type: "document",
        desc: "---\nHayu.\nSan Diego carjacking. H4KT01E34. Please follow up.\n-E",
        inspectDesc: `
| - - - - - - - - - - - - - - - - -
| From: Estrella de la Cruz [e_cruz@kmail.com]
| To: Me [hthakahilo1978@pangaa.org]
|
| Hayu-
| 
| Been some time. I don't like to bother you, but I think I got something.
| San Diego carjacking. License plate: H4KT01E34.
| Alejandro Perez.
| Please follow up.
|
| Best,
| E
|
| P.S. Your mom misses you. She knows I've been able to reach you, and she's been on my ass about it.
| Please call her.
| - - - - - - - - - - - - - - - - -
|
        `
    },
    "newspaper-article-carjacking": {
        name: "newspaper-article-carjacking",
        cmdAliases: ["na", "newspaper-article"],
        displayName: "Newspaper Article",

        origin: "Printed myself.",
        icon: "📰",
        type: "document",
        desc: "An article from the San Diego Times about a carjacking, involving the arrest of Alejandro Perez.",
        inspectDesc: `
| - - - - - - - - - - - - - - - - -
| SAN DIEGO, CA. Alejandro Perez taken in by police this morning, under suspicion 
| 
| - - - - - - - - - - - - - - - - -
|
        `
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
    inspectDesc?: string,
}
