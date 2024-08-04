import Fuse from 'fuse.js';

export const InfoList  :Record<string, Info> = {
    "": {
        name: "",
        sprite: "default",
        isSuccess: true,
        textHTML: 
`
`,       
    },
    "default": {
        name: "No result",
        sprite: "default",
        isSuccess: false,
        textHTML: 
`
No result closely matched your search query.
`,
    },
    "hakatau": {
        name: "Hakataù",
        sprite: "map_hakatau",
        isSuccess: true,
        textHTML: 
`
<u>Hakataù</u> (<nobr>/həˈkɑ.taʊ/</nobr> or <nobr>/ˈhɑ.kə.taʊ/</nobr>, Kauloan: <nobr>/hɐˈkaː.tɐʊ/</nobr> 'salt shore') is a city in the county of the same name in the state of Kaùloia. 
`,
    },
    "sali-sali": {
        name: "Sāli Sāli",
        sprite: "map_salisali",
        isSuccess: true,
        textHTML: 
`
Sāli Sāli (<nobr>/ˈsɑ.li ˈsɑ.li/</nobr>, Kauloan: <nobr>/ˈsa.li ˈsa.li/</nobr> 'rocks') is the capital city state of Kaùloia, in the county of the same name.
`,
    },
    "liwe": {
        name: "Liwe",
        sprite: "map_liwe",
        isSuccess: true,
        textHTML: 
`
Liwe (<nobr>/ˈliweɪ/</nobr>, Kaùloan: <nobr>/ˈliwe/</nobr> 'jade') is a town in Sāli Sāli county state of Kaùloia. Known for being a common tourist destination, it is home to many resorts and other 'must-see' tourist spots. 
`,
    },
    "kauloia": {
        name: "Kaùloia",
        sprite: "map_kauloia",
        isSuccess: true,
        textHTML: 
`
Kaùloia (<nobr>/kaʊˈlɔɪ.ə/</nobr>, Kaùloan: <i>wēsū</i> <nobr>/ˈwɛː.suː/</nobr>) is a non-continguous U.S. state, composed of 4 major islands and 374 officially recognized minor islands in the Pacific Ocean approximately 3,400 miles (5500 km) from the west coast of California. <br> Home to approximately 2.3 million people (2.1 million living on the main island, Kaìaùkema), its main industries include tourism, sugarcane, coffee, pineapple, and electronics. <br> Annexed in 1946 as a conession from the Japanese Empire, it was the 51st state, with Sāli Sāli as its capital. 
`,
    },
    "california": {
        name: "California",
        sprite: "map_california",
        isSuccess: true,
        textHTML: 
`
California (<nobr>/kæ.lɪˈfɔɹ.njə/</nobr>) is a U.S. state lying on the west coast. <br> Home to approximately 36 million people, it is the most populous state, home to one of the largest economies in the world, with varied prolific sectors in agriculture, technology, business, health, education, and tourism. <br> The 31st state, its capital was established at Sacramento.
`,
    },
    "long-beach": {
        name: "Long Beach",
        sprite: "map_longbeach",
        isSuccess: true,
        textHTML: 
`
California (<nobr>/kæ.lɪˈfɔɹ.njə/</nobr>) is a U.S. state lying on the west coast. <br> Home to approximately 36 million people, it is the most populous state, home to one of the largest economies in the world, with varied prolific sectors in agriculture, technology, business, health, education, and tourism. <br> The 31st state, its capital was established at Sacramento.
`,
    },
}

export const InfoAliasList :Record<string, string> = {
    "hakatau": "hakatau",
    "salisali": "sali-sali",
    "sali-sali": "sali-sali",
    "liwe": "liwe",
    "kauloia": "kauloia",
    "default": "default",
    "california": "california",
    "long-beach": "long-beach",
    "longbeach": "long-beach",
    "": "",
}

export interface Info {
    name :string,
    sprite: string,
    isSuccess: boolean,
    textHTML: string,
}
 
export function getInfo(query: string): Info {

    if (query === "") return InfoList[InfoAliasList[""]]

    const data = Object.keys(InfoAliasList).map(key => ({ key }));
    const options = {
        keys: ['key'],
        threshold: 0.2 
    };
    const fuse = new Fuse(data, options);

    const result = fuse.search(query);
    let bestQuery = "default"
    if (result.length > 0) {
        bestQuery = result[0].item.key;
    }

    return InfoList[InfoAliasList[bestQuery]];

}