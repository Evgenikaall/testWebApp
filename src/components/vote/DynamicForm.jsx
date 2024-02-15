import React from "react";

const DynamicForm = ({
                         formData,
                         formValues,
                         setFormValues,
                         handleInputChange,
                         currentCandidate,
                     }) => {
    const toggleSelection = (subcategoryName, value) => {
        if (formValues[currentCandidate]?.[formData.name]?.[subcategoryName] === value) {
            // If the button is already selected, unselect it
            handleInputChange(currentCandidate, formData.name, subcategoryName, 0);
        } else {
            // Otherwise, select the button
            handleInputChange(currentCandidate, formData.name, subcategoryName, value);
        }
    };

    return (
        <div className="bg-gray-100 max-h-[100vh] h-screen overflow-auto">
            <form className="p-5 flex flex-col justify-between">
                {formData.subcategories.map((subcategory, subcategoryIndex) => (
                    <div key={subcategoryIndex} className="flex w-[90%] items-center self-center pb-[3em]">
                        <label className="uppercase self-center w-[25%]">{subcategory.name}</label>
                        <div className="items-center flex self-center w-full">
                            <div>
                                {[...Array(subcategory.totalPoints)].map((_, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        className={`${
                                            formValues[currentCandidate]?.[formData.name]?.[subcategory.name] === index + 1
                                                ? "bg-blue-500 text-white"
                                                : "bg-gray-200"
                                        } w-[5em] h-[5em] border bg-blue-500 text-black text-md focus:outline-none mr-6 mb-4`}
                                        onClick={() => toggleSelection(subcategory.name, index + 1)}>
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </form>
        </div>
    );
};

export default DynamicForm;
