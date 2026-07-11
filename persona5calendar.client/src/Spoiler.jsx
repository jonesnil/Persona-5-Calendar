import { useState } from 'react';

function Spoiler({ spoilerText, displaySpoilerAnswers }) {
    const [showSpoiler, setShowSpoiler] = useState(false);

    function onSpoilerClick() {
        if (!displaySpoilerAnswers)
            setShowSpoiler(!showSpoiler);
    }
    var classes = "";

    if (!displaySpoilerAnswers) {
        classes += showSpoiler ? "spoilerReveal" : "spoilerHide";
    }
    classes += " mt-1 w-75 d-block libre-franklin-bold"
    return (
        <span className={classes} onClick={onSpoilerClick}>
            {spoilerText}
        </span>
  );
}

export default Spoiler;