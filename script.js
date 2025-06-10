/**
 * Basic math operators including add, subtract, multiply, and divide
 * 
 * These operators will work on 2 parameters
 */

function add(a,b)
{
    return a+b;
}

function subtract(a,b)
{
    return a-b;
}

function multiply(a,b)
{
    return a*b;
}

function divide(a,b)
{

    if(b === 0)
    {
        return "ERROR";
    }
   
    let divided = a/b;
    return +divided.toFixed(2);
}

/**
 * Function operate
 * - Calls one of the basic math operators.
 * Input: Number, Operator, Number
 * Output: The result of the operation
 * 
 * Handle the different operators, which are +, - , * and /
 * 
 * Use a switch case for the different operators
 * 
 */

function operate(num1, operator, num2)
{
    if(num1 === "" || num2 === "" || operator === "")
    {
        return "ERROR";
    }

    if(operator.length !== 1)
    {
        return "ERROR";
    }

        

    switch(operator)
    {
        case "+":
            return add(num1, num2);
            break;
        case "-":
            return subtract(num1, num2);
            break;
        case "*":
            return multiply(num1, num2);
            break;
        case "/":
            return divide(num1, num2);
            break;
            
    }

}

/**
 * Function that displays the output when a button is clicked
 * 
 * We need to get the buttons, 
 * We need to use event listeners on the buttons that on click
 * displays the corresponding values
 * 
 * Some how get the buttons text value and then use that to display a value into
 * the calc-output
 */
function displayOutput()
{
    let getButtons = document.querySelectorAll("button");
    let getOutput = document.querySelector(".calc-output");
    


    //sends in a nodeList -> convert it to an array list and then loop through
    //and add an event listener to each button
    let initialCalc = true; //Represents the first calculation with num operator num operator
    let calculationResult = ""; //Represents the total value of the calculation

    let firstNum = true; //Represents if we are calculating the firstNum in num operator num operator
    let lastNum = false; //Represents that all numbers have been calculated, and we can now handle the last operator.
        
    let num1 = ""; //Stores the first num
    let operator1 = ""; //Stores the first operator
    let num2 = ""; //Stores the second num
    let operator2 = ""; //Stores the second operator

    let operators = ["+", "-", "/", "*"]; // represents the valid operators.

    let usedEquals = false; //represents if equals was used to calculate the operation

    let firstValue = true; //represents the value that is given in the second part
    

    Array.from(getButtons).forEach(button =>
    {

        button.addEventListener("click",()=>{
           // getOutput.textContent += button.textContent;

           //Parses the values for the first part.

           if(initialCalc)
           {

            if(button.textContent == "Clear")
            {
                num1 = "";
                operator1 = "";
                num2 = "";
                operator2 = "";
                getOutput.textContent = "";
                firstNum = true;
                lastNum = false;

                initialCalc = true;
                firstValue = true;

                    let usedEquals = false;
                   

            }


            if(!isNaN(button.textContent) && firstNum)
            {
                num1 += button.textContent;
                getOutput.textContent += button.textContent;
                console.log("first num " + num1)
            }
            else if(isNaN(button.textContent) && operators.includes(button.textContent))
            {
                operator1 += button.textContent;
                getOutput.textContent += button.textContent;

                
                firstNum = false;
            }
            else if(!isNaN(button.textContent) && !firstNum)
            {

                num2 += button.textContent;
                getOutput.textContent += button.textContent;

                lastNum = true;
             
            }
            
            

            //Checks the values for computation
            if(button.textContent == "=")
            {
            
                calculationResult = operate(+num1, operator1, +num2);

                initialCalc = false;
                usedEquals = true;

                operator1 = ""
                num1 = ""
                num2 = ""
                lastNum = false;
                getOutput.textContent = calculationResult;


            }
            else if(operators.includes(button.textContent) && lastNum)
            {
                operator2 = button.textContent;
                console.log(operator2);
                
                
                calculationResult = operate(+num1, operator1[0], +num2);


                initialCalc = false;
                operator1 = ""
                num1 = ""
                num2 = ""
                lastNum =false;
                getOutput.textContent = calculationResult;


            }
        }

        else if(!initialCalc)
        {

            //parse operator

            if(button.textContent == "Clear")
            {
                num1 = "";
                operator1 = "";
                num2 = "";
                operator2 = "";
                getOutput.textContent = "";
                firstNum = true;
                lastNum = false;

                initialCalc = true;

                usedOperator =false;
                usedEquals =false;
                firstValue = true;

            }

            /**
             * Example: 5 + 3 * 
             * -> 8 * 3
             * 
             * Needs to parse operator(already given from *) number
             * 
             * Example 2:
             * 5 + 3 =
             * -> (8) + number 
             * 
             * Needs to parse operator number
             * 
             * operator2 is empty so we need to parse in our own operator
             * 
             * 
             */

            if(usedEquals)
            {
                if(operators.includes(button.textContent) && isNaN(button.textContent))
                {
                    operator1 += button.textContent;
                    getOutput.textContent += operator1;


                }
                else if(!isNaN(button.textContent))
                {
                    num2 += button.textContent;
                    getOutput.textContent += num2;
                    lastNum = true;
                }
            }
            else if(!usedEquals)
            {
                
                if(firstValue)
                {
                    operator1 = operator2;
                    getOutput.textContent += operator1; 
                    firstValue = false;

                }
                else if(operators.includes(button.textContent) && isNaN(button.textContent) && !firstValue) {
                    operator1 += button.textContent;
                    getOutput.textContent += operator1;
                }


               if(!isNaN(button.textContent))
                {
                    num2 = button.textContent;
                    getOutput.textContent += num2;
                    lastNum = true;
                }
                
            }

            if(button.textContent === "=")
            {
                calculationResult = operate(+calculationResult, operator1, +num2); 

                operator1 = "";
                num2 = "";
                usedEquals = true;

                lastNum = false;

            

                getOutput.textContent = calculationResult;

            }

            if(operators.includes(button.textContent) && lastNum)
            {
                operator2 = button.textContent;

                calculationResult = operate(+calculationResult, operator1[operator1.length-2], +num2); 
                operator1 = "";
                num2 = "";
                usedEquals = false;
                firstValue = true;

                getOutput.textContent = calculationResult;


            }





            
        }

            




        });

    }
    );


}





displayOutput();
