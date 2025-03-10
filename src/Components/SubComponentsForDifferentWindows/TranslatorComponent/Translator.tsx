import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { colors } from "../../../constantsColors";

interface TranslatorState {
  inputText: string;
  outputText: string;
  targetLanguage: string;
}

export const TranslatorComponent: React.FC = () => {
  const [translators, setTranslators] = useState<TranslatorState[]>([
    { inputText: "", outputText: "", targetLanguage: "EN" },
    { inputText: "", outputText: "", targetLanguage: "ES" },
    { inputText: "", outputText: "", targetLanguage: "RU" },
  ]);

  const translateText = async (index: number) => {
    const apiKey = import.meta.env.VITE_DEEPL_API_KEY;
    if (!apiKey) {
      console.error("DeepL API key is missing");
      return;
    }

    try {
      const currentTranslator = translators[index];

      const response = await axios.post(
        "https://api-free.deepl.com/v2/translate",
        new URLSearchParams({
          auth_key: apiKey,
          text: currentTranslator.inputText,
          target_lang: currentTranslator.targetLanguage,
          preserve_formatting: "false",
          formality: "prefer_less",
          model_type: "prefer_quality_optimized",
        }),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );

      setTranslators((prev) =>
        prev.map((translator, idx) =>
          idx === index
            ? { ...translator, outputText: response.data.translations[0].text }
            : translator
        )
      );
    } catch (error) {
      console.error("Translation failed:", error);
    }
  };

  const handleInputChange = (index: number, value: string) => {
    setTranslators((prev) =>
      prev.map((translator, idx) =>
        idx === index ? { ...translator, inputText: value } : translator
      )
    );
  };

  return (
    <TranslatorComponentWrapper>
      {translators.map((translator, index) => (
        <div className="textAreaDiv" key={index}>
          <textarea
            placeholder="Enter text..."
            style={{ resize: "none" }}
            value={translator.inputText}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
          <button className="translateBtn" onClick={() => translateText(index)}>
            to {translator.targetLanguage}
          </button>
          <textarea
            // readOnly
            style={{ resize: "none" }}
            value={translator.outputText}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        </div>
      ))}
    </TranslatorComponentWrapper>
  );
};

const TranslatorComponentWrapper = styled.div`
  height: 450px;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background: ${colors.backgroundColorBlueDefault};
  padding: 10px;

  .textAreaDiv {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }

  .translateBtn {
    width: 100px;
    height: 40px;
    margin: 0px 5px;
    background: ${colors.primaryBlue};
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.5s ease, border-radius 0.5s ease;
    &:hover {
      background-color: ${colors.primaryBlueHover};
      border-radius: 4px;
    }
  }

  textarea {
    width: 375px;
    height: 250px;
    padding: 10px;
    border: 1px solid black;
    border-radius: 4px;
    font-size: 1rem;
    background-color: ${colors.secondaryBlueHover};
  }
`;

export default TranslatorComponent;
