import React from "react";

const VoteButton = ({onClick, active, sectionName, totalOfSection }) => {
    return (
        <button
            className={`${
                active ? "bg-gray-100" : "bg-white"
            } text-black font-bold p-3`}
            onClick={onClick}
        >
            {sectionName} ({totalOfSection})
        </button>
    );
};

export default VoteButton;
