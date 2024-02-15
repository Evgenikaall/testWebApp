import React, {useEffect, useState} from "react";
import VoteButton from "./VoteButton";
import VoteSection from "./VoteSection";

// Mock data for the vote menu
const formData = [
    {
        candidate: {
            number: 1,
            name: "Team 1",
            division: "JUNIOR"
        },
        voteCategories: [
            {
                name: "Performance",
                totalPoints: 20,
                subcategories: [
                    {name: "Showmanship", totalPoints: 5},
                    {name: "Facials", totalPoints: 6},
                    {name: "Energy", totalPoints: 4},
                    {name: "Stage Presence", totalPoints: 5},
                    {name: "Stage Presence0", totalPoints: 5},
                    {name: "Stage Presence5", totalPoints: 5},
                    {name: "Stage Presence6", totalPoints: 5},
                    {name: "Stage Presence1", totalPoints: 5}
                ]
            }
        ]
    },
    {
        candidate: {
            number: 2,
            name: "Team 2",
            division: "SENIOR"
        },
        voteCategories: [
            {
                name: "Performance",
                totalPoints: 20,
                subcategories: [
                    {name: "Showmanship", totalPoints: 5},
                ]
            },
            {
                name: "Technique",
                totalPoints: 20,
                subcategories: [
                    {name: "Execution", totalPoints: 4},
                ]
            }
        ]
    },
    {
        candidate: {
            number: 3,
            name: "Team 3",
            division: "JUNIOR"
        },
        voteCategories: [
            {
                name: "Performance",
                totalPoints: 20,
                subcategories: [
                    {name: "Showmanship", totalPoints: 5},
                ]
            },
            {
                name: "Technique",
                totalPoints: 20,
                subcategories: [
                    {name: "Cleanliness", totalPoints: 4}
                ]
            }
        ]
    }
];

const VoteMenu = () => {
    const [formValues, setFormValues] = useState({});
    const [activeButton, setActiveButton] = useState(null);
    const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0); // Track current candidate index

    const toggleSection = (buttonName) => {
        setActiveButton((prevActiveButton) =>
            prevActiveButton === buttonName ? null : buttonName
        );
    };

    useEffect(() => {
        restoreFormValues();
    }, []);

    const restoreFormValues = () =>{
        // Initialize formValues with default values for all categories when the component mounts
        const initialFormValues = {};
        formData.forEach(candidateData => {
            const candidateName = candidateData.candidate.name;
            initialFormValues[candidateName] = {};
            candidateData.voteCategories.forEach(category => {
                const categoryName = category.name;
                initialFormValues[candidateName][categoryName] = {};
                category.subcategories.forEach(subcategory => {
                    initialFormValues[candidateName][categoryName][subcategory.name] = 0;
                });
            });
        });
        setFormValues(initialFormValues);
    }
    const handleSubmit = () => {
        if (window.confirm("Are you sure you want to submit the votes?")) {

            console.log(JSON.stringify(formValues))
            const transformedData = Object.entries(formValues).map(([candidateName, categories]) => ({
                candidate: {
                    name: candidateName
                },
                votes: Object.entries(categories).map(([categoryName, subcategories]) => ({
                    name: categoryName,
                    subcategories: Object.entries(subcategories).map(([subcategoryName, points]) => ({
                        name: subcategoryName,
                        points: points
                    }))
                }))
            }));

            console.log("POST: " + JSON.stringify(transformedData));
            setActiveButton(null);
            setCurrentCandidateIndex((prevIndex) => (prevIndex + 1));
            restoreFormValues(); // Clear form values after submission
        }
    };

    const handleInputChange = (candidateName, categoryName, subcategoryName, value) => {
        setFormValues((prevFormValues) => ({
            ...prevFormValues,
            [candidateName]: {
                ...(prevFormValues[candidateName] || {}),
                [categoryName]: {
                    ...(prevFormValues[candidateName]?.[categoryName] || {}),
                    [subcategoryName]: value
                }
            }
        }));
    };


    const isFormComplete = () => {
        if (currentCandidateIndex < formData.length) {
            // Check if all inputs are set for the current candidate
            const candidate = formData[currentCandidateIndex];
            for (const category of candidate.voteCategories) {
                for (const subcategory of category.subcategories) {
                    if (!formValues[category.name]?.[subcategory.name]) {
                        return false;
                    }
                }
            }
        }
        return true;
    };


    const isVotingFinished = () => {
        return currentCandidateIndex === formData.length;
    }


    return (
        <div>
            {/* Render Candidate Information */}
            <div className={`flex w-full justify-center pt-2`}>
                <div className={`flex w-[90%] self-center items-center justify-between`}>
                    {!isVotingFinished() && <>
                        <div className="border border-gray-200 p-4 rounded-md">
                            <p className="text-lg font-semibold">Candidate Information</p>
                            <p className="text-gray-600">Team: {formData[currentCandidateIndex].candidate.name}</p>
                            <p className="text-gray-600">Division: {formData[currentCandidateIndex].candidate.division}</p>
                        </div>
                        <div>
                            <button type="button"
                                // disabled={isFormComplete()}
                                    onClick={handleSubmit}
                                // className={`${isFormComplete() ? "opacity-1" : "opacity-0"} transition-opacity bg-blue-500 hover:bg-blue-700 text-white font-bold py-[1em] px-[2em] border border-blue-700 rounded`}
                            >
                                Submit
                            </button>
                        </div>
                    </>}

                    <div className="border border-gray-200 p-4 rounded-md">
                        <p className="text-lg font-semibold">Judge Information</p>
                        <p className="text-gray-600">Name: Ivan</p>
                    </div>
                </div>
            </div>
            <hr className='my-2'/>
            <div className="flex justify-evenly">
                {currentCandidateIndex < formData.length && formData[currentCandidateIndex].voteCategories.map((category, index) => (
                    <VoteButton
                        key={index}
                        onClick={() => toggleSection(category.name)}
                        active={activeButton === category.name}
                        sectionName={category.name}
                        totalOfSection={category.totalPoints}
                    />
                ))}
            </div>
            {/* Render Vote Section */}
            {activeButton != null && !isVotingFinished() &&
                <VoteSection
                    activeButton={activeButton}
                    formData={formData[currentCandidateIndex]}
                    formValues={formValues}
                    setFormValues={setFormValues}
                    handleInputChange={handleInputChange}
                    currentCandidate={formData[currentCandidateIndex].candidate.name}
                />

            }
        </div>
    );
};

export default VoteMenu;