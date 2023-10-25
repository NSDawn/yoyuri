const Story :Record<string, Record<number, string>> = {
    "debug" : {
        0:             "--------------------------------------" + 
            "<br />" + "5 FEBRUARY⑤ 2005.⑳ 5:17 PM." +
            "<br />" + "LONG BEACH GAZETTE⑩ - MAIN OFFICE" +
            "<br />" + "--------------------------------------" +
            "<br />" + "⑳" +
            "<br />" + "UEHARA, WESLEY" +
            "<br />" + "| You got on the front page again. Nice job, bro." +
            "<br />" + "| This one was even more phoned-in than your last one,⑤ heh." +
            "<br />" + "⑳" +
            "<br />" + "HAKAHILO, HAYU" +
            "<br />" + "| Was it that obvious...?" +
            "<br />" + "⑳" +
            "<br />" + "UEHARA" +
            "<br />" + "| Nah, I don't think the readers will mind. " +
            "<br />" + "| Heh, all,⑤ uh... three of them." +
            "<br />" + "⑩" +
            "<br />" + "HAKAHILO" +
            "<br />" + "| Wow.⑳" +
            "<br />" + "| I mean... you're right, but..." +
            "<br />" + "⑳" +
            "<br />" + "UEHARA" +
            "<br />" + "| I'm joking, dude.⑤ It's really impressive.⑩" +
            "<br />" + "| You're seriously the best reporter I know." +
            "<br />" + "| It's almost a shame to see you...⑩ uh...⑩ here." +
            ""   
        ,
        1: "<br/>" + ""
        ,
    }
}

for (let div in Story) {
    for (let index in Story[div]) {
        Story[div][index] = storyPrepareString(Story[div][index]);
    }
}

function storyPrepareString(s: string): string {
    return s.
        replaceAll("⑤", "     ").
        replaceAll("⑩", "          ").
        replaceAll("⑮", "               ").
        replaceAll("⑳", "                    ").
        replaceAll("㉕", "                         ").
        replaceAll("㊿", "                                                  ")
}

export default Story;