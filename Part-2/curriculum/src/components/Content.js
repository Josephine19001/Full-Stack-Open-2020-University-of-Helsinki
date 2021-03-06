import React from "react";
import Part from "./Part";



function Content({parts}){

    return(parts.map((part) => {
        return(
            <Part 
                key={part.id}
                name={part.name}
                exercises={part.exercises}
            />
        )
    }
    ))
}

export default Content;