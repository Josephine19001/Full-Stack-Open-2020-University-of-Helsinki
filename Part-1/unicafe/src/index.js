import React, {useState} from "react";
import ReactDom from "react-dom";

//Buttom component
const Buttom = (props) => {
    const {handleClick } = props;
    return(
        <button onClick = {handleClick} >{props.name}</button>
    );
}

//Statistic component
const Statistic = (props) => {
    const {text,value} = props
    return (
        <div>
            
            <table>
                <tbody>
                    <tr>
                        <td >{text}</td>
                        <td >{value}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
    );
}

//All Statistics
const Statistics = (props) => {
    const {all,good,neutral,bad} = props
    if(all === 0){
        return (
        <div>
            No feeback given
        </div>
        )
    }

    return (
       <div>
            <Statistic 
            text = "good"
            value = {good}
        />
         <Statistic 
            text = "neutral"
            value = {neutral}
        />
         <Statistic 
            text = "bad"
            value = {bad}
        />
         <Statistic 
            text = "all"
            value = {all}
        />
         <Statistic 
            text = "average"
            value = {((good-bad)/all).toFixed(2)}
        />
         <Statistic 
            text = "positive"
            value = {((good/all) *100).toFixed(2)}
        />
        </div> 
    );
}


//App component
const App = () => {
    const [good,setGood] = useState(0);
    const [neutral,setNeutral] = useState(0)
    const [bad,setBad] = useState(0)
    const [all,setAll] = useState(0)
   
    //Handling Buttom clicks
   
   const buttomHandling = [
        
            function handleGoodClick(){
                setGood(good +1);
                setAll(all+1);
            },
            function handleNeutralClick(){
                setNeutral(neutral +1);
                setAll(all+1);
        
            },
                function handleBadClick(){
                    setBad(bad +1);
                    setAll(all+1);
            }
    ]


    return(
    <div>
        <h1>give feeback</h1>
        <Buttom 
        handleClick = {buttomHandling[0]}
        name = "good"
        />
        <Buttom 
        handleClick = {buttomHandling[1]}
        name = "neutral"
        />
        <Buttom 
        handleClick = {buttomHandling[2]}
        name = "bad"
        />
        <h1>statistics</h1>
        <Statistics 
        all = {all}
        good = {good}
        neutral = {neutral}
        bad ={bad}
        />
    </div>);
}

//App rendering
ReactDom.render(
    <App />,
    document.getElementById("root")
)