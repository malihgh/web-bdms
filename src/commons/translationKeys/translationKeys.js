import React, { useState, useEffect } from "react";
import { composeInitialProps } from "react-i18next";
import * as Styled from "./styles";

const TranslationKeys = (prop) => {
  const { handleSelectedLanguage, defaultLanguage } = prop;
  const [selectedLanguage, setSelectedLanguage] = useState();

  const languages = [
    { id: 0, language: "de" },
    { id: 1, language: "fr" },
    { id: 2, language: "it" },
    { id: 3, language: "en" },
  ];

  useEffect(() => {
    let lang;
    switch (defaultLanguage) {
      case "de":
        lang = languages[0];
        break;
      case "fr":
        lang = languages[1];
        break;
      case "it":
        lang = languages[2];
        break;
      case "en":
        lang = languages[3];
    }
    setSelectedLanguage(lang);
    // console.log("hey", selectedLanguage, defaultLanguage);
  }, []);

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
              selectedLanguage?.language === item.language ? "red" : "black",
            textDecoration:
              selectedLanguage?.language === item.language
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
