// import React, { useState, useEffect } from "react";

// import ReactFlagsSelect from "react-flags-select";

// export default function LocationSuggest() {
//     const [selected, setSelected] = useState("");
//     const [selectedCountryName, setSelectedCountryName] = useState("");
//     const [selectedCountryFlag, setSelectedCountryFlag] = useState("");


//     function updateSelectedCountry (code) {
//         setSelected(code);
//         const countryContainer = document.querySelectorAll('.menu-flags-select button span span');
//         setSelectedCountryName(countryContainer[1].textContent);
//         setSelectedCountryFlag(countryContainer[0].querySelector('svg').getAttribute('xmlns'));
//     }

//     return (
//         <>
//             <ReactFlagsSelect
//                 selected={selected}
//                 onSelect={(code) => updateSelectedCountry(code)}
//                 searchable
//                 searchPlaceholder="Search countries"
//                 className="menu-flags-select"
//                 showSelectedLabel={true}
//                 onCountrySelect={(country) => console.log("djkfdjkfdjk")}
//             />
//         </>
//     );
// }
