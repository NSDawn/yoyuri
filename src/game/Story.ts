const Story :Record<string, Record<number, string>> = {
    "debug" : {
        0: `
        --------------------------------------
        <br />5 FEBRUARY⑤ 2005.⑳ 5:17 PM.
        <br />LONG BEACH GAZETTE⑩ - MAIN OFFICE
        <br />--------------------------------------
        <br />⑳
        <br />UEHARA, WESLEY
        <br /><I:0:wesley_happy1/>| You got on the front page again. Nice job, bro.
        <br />| This one was even more phoned-in than your last one,⑤ heh.
        <br />⑳
        <br />HAKAHILO, HAYU
        <br /><I:0:missing_happy1/>| Was it that obvious...?
        <br />⑳
        <br />UEHARA
        <br /><I:0:wesley_neutral/>| Nah, I don't think the readers will mind.
        <br /><I:0:wesley_happy1/>| Heh, all,⑤ uh... three of them.
        <br />⑩
        <br />HAKAHILO
        <br /><I:0:missing_angry1/>| Wow.⑳
        <br /><I:0:missing_neutral/>| I mean... you're right, but...
        <br />⑳
        <br />UEHARA
        <br /><I:0:wesley_neutral/>| I'm joking, dude.⑤ It's really impressive.⑩
        <br /><I:0:wesley_happy1/>| You're seriously the best reporter I know.
        <br /><I:0:wesley_neutral/>| It's almost a shame to see you...⑩ uh...⑩ here.
        `,
        1:            "" + 
            "<br />" +       "HAKAHILO, KOLENI" +
            "<br />" + "<back>| kike, hayu.</back>| Hi, Hayu." +
            "<br />" + "⑳" +
            "<br />" +       "HAKAHILO, HAYU" +
            "<br />" + "<back>| kike na...⑳ momo.</back>| Hello...⑤ Momo." +
            "<br />" + "<back>| nāke na...⑳ nake aùmo-so nana lo?</back>| Everything...⑤ everything okay over there?" + 
            "<br />" + "⑩" +
            "<br />" +       "HAKAHILO, KOLENI" +
            "<br />" + "<back>| ha, ha, ha. nana meì.</back>| Ha, ha, ha. Everything's just fine." +
            "<br />" + "" +
            "<br/>" + "" + 
            "<br/>" + "" + 
            ""
        ,
        2:            "<I:0:/>" + 
            "<br />" +       "HAKAHILO, HAYU" +
            "<br />" + "<back>| 記録によって、⑤犯行時刻は、⑤この周りにいたようです。</back>| According to records,⑤ you were around here when the crime was committed." +
            "<br />" + "<back>| 事件を目撃したのですか。</back>| Did you happen to witness the incident?" +
            "<br />" + "⑩" +
            "<br />" +       "SEIDA, ORENO" +
            "<br />" + "<back>| その間は、家の中じゃったのよ。⑩テレビ見てた。</back>| During that time, I was in my house. I was watching TV." +
            "<br />" + "<back>| ケイサッさんにもう言ったように、⑩何も見なかった。</back>| Like I told the officer before, I didn't see anything." + 
            "<br />" + "⑩" +
            "<br />" +       "HAKAHILO, HAYU" +
            "<br />" + "<back>| そうですか。</back>| I see." +
            "<br />" + "" +
            "<br/>" + "" + 
            "<br/>" + "" + 
            ""
        ,

    },
    "potat": {

    },
    "1-1-longbeachgazette-main-0": {
        0: `
⑤- - - - - - - - - - - - - - - - -⑤
| 5 FEBRUARY 2003.⑤ 5:22 PM.⑤
| LONG BEACH GAZETTE - MAIN⑤
| ⑤- - - - - - - - - - - - - - - - -⑤
|
| HAKAHILO, HAYU TĒ
| - (Wesley insisted on waiting for me,⑤ huh.) ⑩
| - (Good man.)⑤
| - (I wouldn't have stayed so late, my work's done and sent, after all.)⑤
| - (But her email...)⑳
| - (She wouldn't have emailed me if there wasn't something...)⑤
| - (Hm.)⑳
| - (Shouldn't keep him waiting too long. I can print out what I need to and go home.)
| - (Printer's in the rec room. I'll grab my papers and then meet him in the lobby.)
|
        `
    },
    "1-1-longbeachgazette-rec-0" : {
        0: `
| ⑤- - - - - - - - - - - - - - - - -⑤
| 5:25 PM.⑤
| LONG BEACH GAZETTE - REC⑤
| ⑤- - - - - - - - - - - - - - - - -⑤
| 
| HAKAHILO, HAYU TĒ
| - (No clue why they had to put the printer in here.)
| - (Let me grab the email...⑤ and the article she sent over.)
|
        `,
        1: `
| HAKAHILO
| - (Carjacking... San Diego...)
| - (...Suspect apprehended in San Diego after...⑤ stealing a car in Tijuana...?)⑳
| - (That's...⑤ odd...)⑤
| - (Better give this a thorough read-through later.)
|
        `,
    }
}

for (let div in Story) {
    for (let index in Story[div]) {
        Story[div][index] = storyPrepareString(Story[div][index]);
    }
}

function storyPrepareString(s: string): string {
    return s
        .replaceAll("⑤", "     ")
        .replaceAll("⑩", "          ")
        .replaceAll("⑮", "               ")
        .replaceAll("⑳", "                    ")
        .replaceAll("㉕", "                          ")
        .replaceAll("㊿", "                                                  ")
        .replaceAll("<back>", "<span class='back'>")
        .replaceAll("</back>", "</span>")
        .replaceAll("| ", "<br />")
        .replaceAll("|", "<br />")
}

export default Story;