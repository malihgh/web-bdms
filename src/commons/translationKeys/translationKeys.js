import React, { useState, useEffect } from "react";
import * as Styled from "./styles";
import { withTranslation } from "react-i18next";

const TranslationKeys = (prop) => {
  const [selectedLanguage, setSelectedLanguage] = useState();

  const languages = [
    { id: 0, language: "de" },
    { id: 1, language: "fr" },
    { id: 2, language: "it" },
    { id: 3, language: "en" },
  ];

  useEffect(() => {
    let lang;

    switch (prop.i18n.language) {
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
  }, [prop.i18n.language]);

  return (
    <Styled.Container>
      {languages.map((item, key) => (
        <Styled.Keys
          key={key}
          onClick={() => {
            setSelectedLanguage(item);
            prop.i18n.changeLanguage(item.language);
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

export default withTranslation("common")(TranslationKeys);
