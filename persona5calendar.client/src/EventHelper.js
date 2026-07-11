export default function ExtrapolateEventInformation(event) {
    switch (event["Type"]) {
        case "Jazz Club":
            event["Details"] = `Taking a party member to the Jazz Club will teach them '${event['Title']}.'`;
            break;
        case "Subway":
            event["Details"] = "Joker is able to read on the train today.";
            break;
        case "Crane":
            event["Title"] = `${event['Footnote']} Doll`;
            event["Details"] = `The ${event['Title']} doll is now in the crane game at the arcade in Akihibara (If you collected previous dolls already.)`;
            break;
        case "Puzzle":
            event["Title"] = `Crossword ${event["Footnote"]}`;
            event["Details"] = `New crossword at Leblanc! The solution is:`;
            break;
        case "Exam":
            if (event["Title"] == "Exam Scores")
                event["Details"] = "Exam scores posted today!";
            if ("AnswerList" in event)
                event["Details"] = "Here are the answers to the prompts in order:";
            break;
        case "Shopping":
            if (event["Title"] == "TV Shop")
                event["Details"] = "Tune into the home shopping program on a TV in Leblanc for a choice between these two packages:";
            if (event["Title"] == "New DVD Rentals")
                event["Details"] = "The video rental shop Scarlet in Shibuya's central street has some new media you can check out:";
            break;
        case "Class":
            if ("AnswerList" in event)
                event["Details"] = "Here are the answers to the prompts in order:";
            else
                event["Details"] = `The answer to the prompt is:`
            break;
        case "TV":
            event["Details"] = `Watch the quiz show on a TV in Leblanc to gain Knowledge without spending time! The answer to the question is:`
            break;
    }

    return event;
}