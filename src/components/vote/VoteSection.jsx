import React from "react";
import DynamicForm from "./DynamicForm";

const VoteSection = ({
                         activeButton,
                         formData,
                         formValues,
                         setFormValues,
                         handleInputChange,
                     }) => {
    return (
        <div
            className={`${activeButton ? "bg-gray-100 opacity-1" : "bg-white opacity-0"} transition-all`}
        >
            <DynamicForm
                formData={formData.find((data) => data.name === activeButton)}
                formValues={formValues}
                setFormValues={setFormValues}
                handleInputChange={handleInputChange}
            />
        </div>
    );
};


export default VoteSection;
