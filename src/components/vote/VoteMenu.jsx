import React, {useState} from "react";
import VoteButton from "./VoteButton";
import VoteSection from "./VoteSection";

// Mock data for the vote menu
const formData = [
    {
        name: "Performance",
        totalPoints: 20,
        subcategories: [
            {name: "Energy", totalPoints: 5},
            {name: "Elasticity", totalPoints: 6},
            {name: "Action", totalPoints: 4},
            {name: "Something Else", totalPoints: 5}
        ]
    },
    {
        name: "Performance 1",
        totalPoints: 20,
        subcategories: [
            {name: "Energy", totalPoints: 4},
            {name: "Elasticity", totalPoints: 4},
            {name: "Action", totalPoints: 4},
            {name: "Something Else", totalPoints: 4},
            {name: "Something Else", totalPoints: 4},
        ]
    },
    {
        name: "Performance 3 ",
        totalPoints: 20,
        subcategories: [
            {name: "Energy", totalPoints: 5},
            {name: "Elasticity", totalPoints: 5},
            {name: "Action", totalPoints: 5},
            {name: "Something Else", totalPoints: 5}
        ]
    },
    {
        name: "Performance 4 ",
        totalPoints: 20,
        subcategories: [
            {name: "Energy", totalPoints: 5},
            {name: "Elasticity", totalPoints: 5},
            {name: "Action", totalPoints: 5},
            {name: "Something Else", totalPoints: 5}
        ]
    },
];

const VoteMenu = () => {
    // State to manage form values
    const [formValues, setFormValues] = useState({});
    const [activeButton, setActiveButton] = useState(null);
    const toggleSection = (buttonName) => {
        setActiveButton((prevActiveButton) =>
            prevActiveButton === buttonName ? null : buttonName
        );
    };
    // Common submit function
    const handleSubmit = () => {
        console.log("Form values:", JSON.stringify(formValues));
        // Add your logic to handle form submission here, e.g., send data to server
    };

    // Function to handle input change
    const handleInputChange = (categoryName, subcategoryName, value) => {
        setFormValues((prevFormValues) => ({
            ...prevFormValues,
            [categoryName]: {
                ...(prevFormValues[categoryName] || {}),
                [subcategoryName]: value
            }
        }));
    };

    // Check if all inputs are set
    const isFormComplete = () => {
        for (const category of formData) {
            for (const subcategory of category.subcategories) {
                if (!formValues[category.name]?.[subcategory.name]) {
                    return false;
                }
            }
        }
        return true;
    };

    return (
        <div>
            <div className={`flex w-full justify-center pt-2`}>

                <div className={`flex w-[90%] self-center items-center justify-between`}>
                    <div className="border border-gray-200 p-4 rounded-md">
                        <p className="text-lg font-semibold">Candidate Information</p>
                        <p className="text-gray-600">Team: DanceClub</p>
                        <p className="text-gray-600">Division: Junior</p>
                    </div>
                    <div>
                        <button type="button"
                                disabled={isFormComplete()}
                                onClick={handleSubmit}
                                className={`${isFormComplete() ? "opacity-1" : "opacity-1"} transition-opacity bg-blue-500 hover:bg-blue-700 text-white font-bold py-[1em] px-[2em] border border-blue-700 rounded`}
                        >
                            Submit
                        </button>
                    </div>
                    <div className="border border-gray-200 p-4 rounded-md">
                        <p className="text-lg font-semibold">Judge Information</p>
                        <p className="text-gray-600">Name: Ivan</p>
                    </div>
                </div>
            </div>
            <hr className='my-2'/>
            <div className="flex justify-between">
                {formData.map((data, index) => (
                    <VoteButton
                        key={index}
                        onClick={() => toggleSection(data.name)}
                        active={activeButton === data.name}
                        sectionName={data.name}
                        totalOfSection={data.totalPoints}
                    />
                ))}
            </div>
            {activeButton != null &&
                <VoteSection
                    activeButton={activeButton}
                    key={activeButton}
                    formData={formData}
                    formValues={formValues}
                    setFormValues={setFormValues}
                    handleInputChange={handleInputChange}
                />
            }
        </div>
    );
};

export default VoteMenu;
