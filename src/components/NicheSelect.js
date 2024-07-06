import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import "./NicheSelect.css";

const niches = [
    "Art",
    "Beauty",
    "Books",
    "Business",
    "Comics",
    "Crafts",
    "Dance",
    "Design",
    "Fashion",
    "Film & Video",
    "Food",
    "Games",
    "Journalism",
    "Music",
    "Photography",
    "Podcasts",
    "Technology",
    "Theater",
    "Travel",
    "Writing",
];

const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
        ? []
        : niches.filter(
              (niche) =>
                  niche.toLowerCase().slice(0, inputLength) === inputValue
          );
};

const getSuggestionValue = (suggestion) => suggestion;

const renderSuggestion = (suggestion) => <div>{suggestion}</div>;

export default function NicheSelect() {
    const [value, setValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const onChange = (event, { newValue }) => {
        setValue(newValue);
    };

    const onSuggestionsFetchRequested = ({ value }) => {
        setSuggestions(getSuggestions(value));
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const inputProps = {
        placeholder: "Type a niche",
        value,
        onChange: onChange,
    };

    return (
        <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            highlightFirstSuggestion={true}
        />
    );
}
