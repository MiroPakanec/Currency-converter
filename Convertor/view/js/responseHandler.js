/**
 * Function reads XML response (on load data request)
 * Adjusts HTML elements (dropdowns, table, displayed rate) according to reponse content
 */
function readResponseLoadData(){

  //get selected currency by selection in dropdown, if empty set default
  var selectedCurrency1 = getSelectedCurrencyValue("leftCurrencyDropdown", "DKK");
  var selectedCurrency2 = getSelectedCurrencyValue("rightCurrencyDropdown", "EUR");

  //get rates of currencies selected in dropdowns (compared to EUR)
  var selectedRate1 = getSelectedRate(selectedCurrency1);
  var selectedRate2 = getSelectedRate(selectedCurrency2);
  //calculate rate of one currency comared to other
  var selectedRate = calculateRate(selectedRate1, selectedRate2);

  //genereate HTML code for dropdowns
  var htmlDropdown1 = getHtmlCodeDropdown(selectedCurrency1);
  var htmlDropdown2 = getHtmlCodeDropdown(selectedCurrency2);
  //generate HTML code for table
  var htmlTable = getHtmlCodeTable(selectedCurrency1, selectedRate1);

  //set HTML elements with loaded data, using generated HTML code and rate
  setElements(htmlDropdown1, htmlDropdown2, htmlTable, selectedRate);
}

/**
 *  Function reads XML response (on load time request)
 *  Displays rates source and last update
 */
function readResponseTime(){

      xmlResponse = xmlHttp.responseXML;
      xmlDocumentElement = xmlResponse.documentElement;
      message = xmlDocumentElement.firstChild.data;
      document.getElementById("infotext").innerHTML = 'Rates from Europe Central Bank<br>Last update: ' + message;
}

/**
 *  Function reads XML response (on update request)
 *  Displays a message is all rates are up to date
 */
function readResponseUpdate(){

      xmlResponse = xmlHttp.responseXML;
      xmlDocumentElement = xmlResponse.documentElement;
      message = xmlDocumentElement.firstChild.data;
      document.getElementById("updatetext").innerHTML = message;
}

/**
 *  Function Calculates a rate of one selected currency compared to another selected currency
 *
 *  rate1 is a rate of currency 1 compared to EUR
 *  rate2 is a rate of currency 2 compared to EUR
 *  returns float
 */
function calculateRate(rate1, rate2){

  return 1* (1/ rate1) * rate2;
}

/**
 *  Function looks up a rate (compared to EUR) of sellected currency looping all currencies in XML response
 *
 *  selectedCurrency is a currency selected in a dropdown
 *  returns float
 */
function getSelectedRate(selectedCurrency){

  xmlResponse = xmlHttp.responseXML;
  xmlDocumentElement = xmlResponse.documentElement;
  //find out how many 'currency' tags XML response has
  var currencyLen = xmlDocumentElement.getElementsByTagName("currency").length;

  //loop response to number of 'currency' elements
  for(i = 0; i<currencyLen; i++){

    //get currency tag
    var currency = xmlDocumentElement.getElementsByTagName("currency")[i];
    //get name tag (which belongs to currency tag)
    var name = currency.getElementsByTagName("name")[0].firstChild.data;
    //get rate tag (which belongs to currency tag)
    var rate = currency.getElementsByTagName("rate")[0].firstChild.data;

    //if this currency matches return rate
    if(selectedCurrency == name)
      return rate;
  }

  //if currency was not found, selected currency is EUR (not present in corrency.xml)
  //its rate is 1 (compared to itself)
  return 1;

}

/**
 *  Function reads XML response and creates HTML code for a dropdown menu (with all currency names)
 *
 *  selectedCurrency is a currency name selected in a dropdown menu
 *  returns string
 */
function getHtmlCodeDropdown(selectedCurrency){

  xmlResponse = xmlHttp.responseXML;
  xmlDocumentElement = xmlResponse.documentElement;
  //find out how many 'currency' tags response has
  var currencyLen = xmlDocumentElement.getElementsByTagName("currency").length;
  //add EUR currency manually
  var htmlCode = generateHtmlCodeDropdown("EUR", selectedCurrency);
  //loop response based on number of 'currency' elements
  for(i = 0; i<currencyLen; i++){

    //get currency tag
    var currency = xmlDocumentElement.getElementsByTagName("currency")[i];
    //get name tag (which belongs to currency tag)
    var name = currency.getElementsByTagName("name")[0].firstChild.data;

    //generates html code for current currency name
    htmlCode += generateHtmlCodeDropdown(name, selectedCurrency);

    //checks the rate of currency which will be selected in this dropdown, assign global variable selected rate

  }
  return htmlCode;
}

//generate rate table based on left selection
/**
 *  Function generates HTML code for rates table by looping XML response
 *  selected currency is essential to find its rate compared to EUR
 *
 *  selectedCurrency1 is a currency name selected in a dropdown menu (left)
 *  returns string
 */
function getHtmlCodeTable(selectedCurrency1, selectedRate1){

  xmlResponse = xmlHttp.responseXML;
  xmlDocumentElement = xmlResponse.documentElement;
  //find out how many 'currency' tags response has
  var currencyLen = xmlDocumentElement.getElementsByTagName("currency").length;
  //add opening table tag on the beginning of the HTML code
  var htmlCode = '<table>';

  //loop response based on number of 'currency' elements
  for(i = 0; i<currencyLen; i++){

    //get currency tag
    var currency = xmlDocumentElement.getElementsByTagName("currency")[i];
    //get name tag (which belongs to currency tag)
    var name = currency.getElementsByTagName("name")[0].firstChild.data;
    //get rate tag (which belongs to currency tag)
    var rate = currency.getElementsByTagName("rate")[0].firstChild.data;

    htmlCode += generateHtmlCodeTable(name, rate, selectedRate1);
  }
  return htmlCode + '</table>';
}

/**
 *  Function determines what currency is selected in a dropdown menu
 *
 *  id is an id of a HTML tag
 *  defaultSelection determines what currency should be selected if its empty (on page load)
 *  returns string
 */
function getSelectedCurrencyValue(id, defaultSelection){

  var selectedCurrency = document.getElementById(id).value;

  if(selectedCurrency === undefined || selectedCurrency == null || selectedCurrency.length <= 0)
    return defaultSelection;
  else
    return selectedCurrency;
}

/**
 *  Function generates HTML code for a dropdown menu options
 *
 *  name is a name of the currency
 *  selected determines what option name should be selected in a dropdown menu
 *  returns string
 */
function generateHtmlCodeDropdown(name, selected){

  var htmlCode;
  //if name is to be selected create HTML option tag with selected attribute
  if(name == selected){

      htmlCode = '<option value="' + name + '" class="dropdowncontent" selected>' + name + '</option>';
      return htmlCode;
  }
  else{

      htmlCode = '<option value="' + name + '" class="dropdowncontent">' + name + '</option>';
      return htmlCode;
  }
}

/**
 *  Function generates HTML code for table of rates
 *
 *  name is a currency name
 *  rate is a rate of currency (from XML response) compared to EUR
 *  selectedRate is a rate of selected currency 1 (on the left) compared to EUR
 *  returns string
 */
function generateHtmlCodeTable(name, rate, selectedRate){

  //locade proper flag using currency name
  var flagPath = 'view/js/flags/' + name + '.gif';
  //new row and flag column
  var htmlCode = '<tr><td><img src="'+ flagPath +'" alt=""></td>';
  //calculate rate of one currency to another
  rate = Number((calculateRate(selectedRate, rate)).toFixed(6));
  //rate column
  htmlCode += '<td>' + rate + '</td>';
  //name column and end row
  htmlCode += '<td>' + name + '</td></tr>';

  return htmlCode;
}

/**
 *  Function that sets HTML elements
 *
 *  htmlCode1 is a html code for dropdown menu 1 (left)
 *  htmlCode2 is a html code for dropdown menu 2 (right)
 *  htmlTable is a html code for table with rates
 *  selected rate is a rate of one currency compared to another
 */
function setElements(htmlCode1, htmlCode2, htmlTable, selectedRate){

  //add options to both dropdowns (selects)
  document.getElementById("leftCurrencyDropdown").innerHTML = htmlCode1;
  document.getElementById("rightCurrencyDropdown").innerHTML = htmlCode2;
  //add default values to convertor
  document.getElementById("leftCurrencyInput").setAttribute("value", 100.0);
  document.getElementById("topRate").innerHTML = Number((selectedRate).toFixed(6));
  //set table title
  document.getElementById("tableTitle").innerHTML = '1 ' + document.getElementById("leftCurrencyDropdown").value + ' is:' ;
  //set div to hold table
  document.getElementById("ratesTable").innerHTML = htmlTable;
}
