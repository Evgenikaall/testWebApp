import React, { useState } from "react";

const DynamicForm = ({
                         formData,
                         formValues,
                         setFormValues,
                         handleInputChange
                     }) => {
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form values:", formValues);
        // Add your logic to handle form submission here, e.g., send data to server
    };

    const handleInputValidation = (value, min, max) => {
        if (isNaN(value) || value < min || value > max) {
            setErrorMessage(`Please enter a number between ${min} and ${max}`);
        } else {
            setErrorMessage("");
        }
    };

    return (
        <div className={`bg-gray-100 max-h-[100vh] h-screen overflow-hidden`}>
            <form onSubmit={handleSubmit} className={`p-5 flex flex-col justify-between`}>
                {formData.subcategories.map((subcategory, subcategoryIndex) => (
                    <div key={subcategoryIndex} className="flex w-[90%] items-center self-center pb-[3em]">
                        <label className="uppercase self-center w-[25%]">{subcategory.name}</label>
                        <div className="items-center flex justify-between self-center w-full">
                            <div>
                                {[...Array(subcategory.totalPoints)].map((_, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        className={`${
                                            formValues[formData.name]?.[subcategory.name] === index + 1
                                                ? "bg-blue-500 text-white"
                                                : "bg-gray-200"
                                        } w-[5em] h-[5em] border bg-blue-500 text-black text-md focus:outline-none mr-6`}
                                        onClick={() =>{
                                            handleInputValidation(index + 1, 0.1, subcategory.totalPoints);
                                            handleInputChange(formData.name, subcategory.name, index + 1);
                                        }}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                            <div>
                                <input
                                    type="number"
                                    className={`w-[5em] h-[5em] text-center border border-gray-300`}
                                    max={subcategory.totalPoints}
                                    min={0}
                                    onChange={(e) => {
                                        const value = parseFloat(e.target.value);
                                        handleInputValidation(value, 0.1, subcategory.totalPoints);
                                        if (!isNaN(value)) {
                                            handleInputChange(formData.name, subcategory.name, value);
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </form>
        </div>
    );
};

export default DynamicForm;
