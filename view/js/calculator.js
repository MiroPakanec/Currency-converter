/**
 *  Function loads inputed data (currencies, rate, input) from html elements,
 *  validates inputed ammount,
 *  sets output html elements with result
 *
 *  Function is called on page load, when dropdown option is selected
 *  and when input ammount is entered
 */
function calculation(){

  //loads selected currency from dropdown menus
  var currency1 = document.getElementById("leftCurrencyDropdown").value;
  var currency2 = document.getElementById("rightCurrencyDropdown").value;
  //loads ammount from user input
  var ammount = document.getElementById("leftCurrencyInput").value;
  //loads rate from html element topRate (above "SWAP" button)
  var rate = document.getElementById("topRate").innerHTML;

  //checks if ammount is empty/undifined
  ammount = checkAmmount(ammount);
  //generates strings to be displaied in output areas
  //text for small output area
  var toDisplay1 = getOutputString(currency1, ammount, " is:");
  //text for large output area
  var toDisplay2 = getOutputString(currency2, calculateResult(ammount, rate), "");

  //checks if input is a number
  if(!isNaN(ammount))
    setOutputArea(toDisplay1, toDisplay2);
  else
    //if input is not a number display ERROR in large output area and leave small output area empty
    setOutputArea("", "ERROR");
}

/**
 *  Function calculates result to be displayed as autput,
 *  Adjusts the format of result based on its lenght
 *
 *  ammount is a value inputed by user
 *  rate is a value from html element with id 'topRate'
 *  returns an integer
 */
function calculateResult(ammount, rate){

    result = ammount * rate;
    //if number is too big adjust number of digits after decimal point (to prevent inconsistent displaying)
    if(result > Math.pow(10, 12))
        return Number((result).toFixed(3));

    return Number((result).toFixed(6));
}

/**
 *  Function checks if ammout was entered
 *  Returns an integer
 */
function checkAmmount(ammount){

  if(ammount === undefined || ammount == null || ammount.length <= 0)
    ammount = 0;

  return ammount;
}

/**
 *  Function generates a string to be displayed in the output area
 *
 *  currency is a value from a dropdowns
 *  ammount is either a calculated value or value inputed by user
 *  additionaltext is optional string
 *  Returns a string
 */
function getOutputString(currency, ammount, additionalText){

  var output =  ammount + '  ' + currency + additionalText ;
  return output;
}

/**
 *  Function sets both output areas accessing their HTML elements
 *
 *  output1 is an output string for small output area
 *  output2 is an output string for large output area
 */
function setOutputArea(output1, output2){

  //set inner value of HTML elements
  document.getElementById("convertedValue1").innerHTML= output1;
  document.getElementById("convertedValue2").innerHTML = output2;
}

/**
 *  Function exchanges values selected between both dropdown menus
 *  Requests data from the Server, which recalculates the ammount
 */
function swap(){

  //get selected currencies from dropdowns
  var selectedCurrency1 = getSelectedCurrencyValue("leftCurrencyDropdown");
  var selectedCurrency2 = getSelectedCurrencyValue("rightCurrencyDropdown");

  //set html elements (exchange variables)
  document.getElementById("leftCurrencyDropdown").value = selectedCurrency2;
  document.getElementById("rightCurrencyDropdown").value = selectedCurrency1;

  //request data from server
  loadData();
}
