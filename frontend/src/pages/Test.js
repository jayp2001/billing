import React, { useState } from 'react'
import { ReactTransliterate } from "react-transliterate";
import "react-transliterate/dist/index.css";

const Test = () => {
    const [text, setText] = useState("");
    return (
        <div>
            <ReactTransliterate
                value={text}
                onChangeText={(text) => {
                    setText(text);
                }}
                lang="gu"
            />
        </div>
    )
}

export default Test