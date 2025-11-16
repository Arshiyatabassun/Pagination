
 import { useState } from "react";
const Counter =()=>{
    const [count,setCount]=useState(0);
    const handleClick =()=>{
        setCount(count+1);
        setCount(count+1);
        setCount(count+1);
        console.log(count);

    }
    return(
        <button onClick={handleClick}>Click Here</button>
    )
}