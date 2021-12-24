import React, { useState } from "react";
import * as Styled from "./styles";

const TranslationKeys = (prop) => {
  const { handleSelectedLanguage } = prop;
  const languages = [
    { id: 0, language: "de" },
    { id: 1, language: "fr" },
    { id: 2, language: "it" },
    { id: 3, language: "en" },
  ];
  const [selectedLanguage, setSelectedLanguage] = useState(languages[3]);

  return (
    <Styled.Container>
      {languages.map((item, key) => (
        <Styled.Keys
          key={key}
          onClick={() => {
            setSelectedLanguage(item);
            handleSelectedLanguage(item.language);
          }}
          style={{
            color:
              selectedLanguage.language === item.language ? "red" : "black",
            textDecoration:
              selectedLanguage.language === item.language
                ? "underline"
                : "none",
          }}
        >
          {item.language.toUpperCase()}
        </Styled.Keys>
      ))}
    </Styled.Container>
  );
};

export default TranslationKeys;
