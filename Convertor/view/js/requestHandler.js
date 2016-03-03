/**
 *  File handles all clients requests to the serve
 */

//create object to comunicate with the server
var xmlHttp = createXmlHttpRequestObject();

/**
 *  Function checks what browser is a client running at
 *  and creates xmlHttpRequest object
 *  Returns xmlHttp object
 */
function createXmlHttpRequestObject(){
  var xmlHttp;

  //check if the user is running internet explorer
  if(window.ActiveXObject){

    try{

      xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    catch(e){

      xmlHttp = false;
    }
  }
  else{

    try{

      xmlHttp = new XMLHttpRequest();
    }
    catch(e){

      xmlHttp = false;
    }
  }

  //if variable was not assigned successfully
  if(!xmlHttp){

    alert("Unable to communicate with the Server");
  }
  else{

    return xmlHttp;
  }
}

/**
 *  Function checks the state of xmlHttp object
 *  Requests all curencies (names and rates) from the Server
 */
function loadData(){

    //check ready state to send request
    if(xmlHttp.readyState==4 || xmlHttp.readyState==0 ){
        //get response from convertorResponses.php
        xmlHttp.open("GET", "view/js/responses/convertorResponses.php", true);
        //handle response
        xmlHttp.onreadystatechange = handleServerResponse;
        xmlHttp.send(null);
    }
    else{

        //try again after 0.1s
        setTimeout('loadData()', 100);
    }
}

/**
 *  Function checks the state of xmlHttp object
 *  Requests the time when was xml document (currency.xml) updated
 */
function loadTime(){

  //check ready state to send request
  if(xmlHttp.readyState==4 || xmlHttp.readyState==0 ){

      //get response from timeResponses.php
      xmlHttp.open("GET", "view/js/responses/timeResponse.php", true);
      //handle response
      xmlHttp.onreadystatechange = handleServerTimeResponse;
      xmlHttp.send(null);
  }
  else{

      setTimeout('loadTime()', 100);
  }
}

/**
 *  Function checks the state of xmlHttp object
 *  Requests a check if xml file is current (updated today)
 */
function update(){

  //check ready state to send request
  if(xmlHttp.readyState==4 || xmlHttp.readyState==0 ){

      //get response from convertorResponses.php
      xmlHttp.open("GET", "view/js/responses/updateResponse.php", true);
      //handle response
      xmlHttp.onreadystatechange = handleServerUpdateResponse;
      xmlHttp.send(null);
  }
  else{

      setTimeout('update()', 100);
  }
}

/**
 *  Function handles servers update response and checks if its OK
 *  calls a function in responseHandler.js file
 */
function handleServerUpdateResponse(){

  if( xmlHttp.readyState==4){

    //check if responses status code is 'OK'
    if(xmlHttp.status==200){

        //read returned XML response and process it
        readResponseUpdate();
    }
    else{

      alert('Something went wrong');
      setTimeout('update()', 100);
    }
  }
}

/**
 *  Function handles servers Time response and checks if its OK
 *  calls a function in responseHandler.js file
 */
function handleServerTimeResponse(){

  if( xmlHttp.readyState==4){

    //check if status code is 'OK'
    if(xmlHttp.status==200){

        //read returned XML response and process it
        readResponseTime();
    }
    else{

      alert('Something went wrong');
      setTimeout('loadTime()', 100);
    }
  }
}

/**
 *  Function handles servers Data response and checks if its ok
 *  calls a function in responseHandler.js file
 */
function handleServerResponse(){

  if( xmlHttp.readyState==4){

    //if status code is 'OK'
    if(xmlHttp.status==200){

        //read returned XML response and process it
        readResponseLoadData();
        //calculate and output response result
        calculation();
    }
    else{
      
      alert('Something went wrong');
      setTimeout('loadData()', 100);
    }
  }
}
