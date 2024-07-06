// import React, { useState, useEffect } from "react";
// import Autosuggest from "react-autosuggest";

// // Function to get suggestions based on input value
// const getSuggestions = (value, cities) => {
//     const inputValue = value.trim().toLowerCase();
//     const inputLength = inputValue.length;

//     return inputLength === 0
//         ? []
//         : cities.filter((loc) =>
//               loc.name.toLowerCase().includes(inputValue)
//           );
// };

// // Function to get suggestion value to display
// const getSuggestionValue = (suggestion) => suggestion.name;

// // Function to render suggestions
// const renderSuggestion = (suggestion) => (
//     <div>
//         {suggestion.flag && <img src={suggestion.flag} alt="flag" style={{ width: 20, marginRight: 10 }} />}
//         {suggestion.name}
//     </div>
// );

// const LocationSuggest = () => {
//     // const [value, setValue] = useState("");
//     // const [suggestions, setSuggestions] = useState([]);
//     // const [countries, setCountries] = useState([]);
//     // const [cities, setCities] = useState([]);

//     // useEffect(() => {
//     //     const fetchCountries = async () => {
//     //         try {
//     //             const response = await fetch('https://countriesnow.space/api/v0.1/countries/flag/images');
//     //             if (!response.ok) {
//     //                 throw new Error('Network response was not ok');
//     //             }
//     //             const data = await response.json();
//     //             setCountries(data.data);
//     //         } catch (error) {
//     //             console.error('There has been a problem with your fetch operation:', error);
//     //         }
//     //     };

//     //     fetchCountries();
//     // }, []);

//     // useEffect(() => {
//     //     const fetchCities = async () => {
//     //         try {
//     //             const response = await fetch('https://countriesnow.space/api/v0.1/countries');
//     //             if (!response.ok) {
//     //                 throw new Error('Network response was not ok');
//     //             }
//     //             const data = await response.json();
//     //             setCities(data.data.flatMap(country => country.cities.map(city => ({
//     //                 name: `${city}, ${country.country}`,
//     //                 flag: countries.find(c => c.name === country.country)?.flag || null
//     //             }))));
//     //         } catch (error) {
//     //             console.error('There has been a problem with your fetch operation:', error);
//     //         }
//     //     };

//     //     fetchCities();
//     // }, [countries]);

//     // const onChange = (event, { newValue }) => {
//     //     setValue(newValue);
//     // };

//     // const onSuggestionsFetchRequested = ({ value }) => {
//     //     setSuggestions(getSuggestions(value, cities));
//     // };

//     // const onSuggestionsClearRequested = () => {
//     //     setSuggestions([]);
//     // };

//     // const inputProps = {
//     //     placeholder: "Type a location",
//     //     value,
//     //     onChange: onChange,
//     // };

//     return (
//         <Autosuggest
//             suggestions={suggestions}
//             onSuggestionsFetchRequested={onSuggestionsFetchRequested}
//             onSuggestionsClearRequested={onSuggestionsClearRequested}
//             getSuggestionValue={getSuggestionValue}
//             renderSuggestion={renderSuggestion}
//             inputProps={inputProps}
//         />
//     );
// };

// export default LocationSuggest;
