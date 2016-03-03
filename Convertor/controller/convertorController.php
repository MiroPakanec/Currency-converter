<?php

  include_once $_SERVER['DOCUMENT_ROOT'].'/convertor/dataAccess/convertorDataAccess.php';

  /**
   *  Class ConvertorController
   *  controls clients requests for data
   *  provides communication between data access layer and clients
   */
  Class ConvertorController{

    /**
     * Function loadData loads requests all data from Data Access Layer
     * Returns array populated with ConvertorModel objects
     */
    public function loadData(){

        $convertorDataAccess = new ConvertorDataAccess();
        return $convertorDataAccess->loadData();
    }

    /**
     *  Function requests from Data Access Layer date, specifying when was XML document updated
     *  Returns string
     */
    public function getDocumentUpdateDate(){

      $convertorDA = new ConvertorDataAccess();
      return $convertorDA->getDocumentUpdateDate();
    }

    /**
     * Function checks if XML document is current (updated today)
     * If XML file is current, returns message to clients
     * If XML file is not current, it is downloaded and updated from Europe Central Bank
     * Returns string
     */
    public function checkUpdate(){

      $convertorDataAccess = new ConvertorDataAccess();
      $date = $convertorDataAccess->getDocumentUpdateDate();

      //check if document is up to date (if date is sooner then today, download and update it)
      if(date("Y-m-d") < strtotime($date)){

        //call updateXMLFile function with this instance of controller class and assign returned string to result
        $result = $this->updateXMLFile();
        //return result
        return $result;
      }
      else{

        //if file date is not sooner than today, return confirming message
        return "Rates are up to date";
      }
    }

    /**
     *  Function downloads XML file from Europe Central Bank website
     *  And updates current XML file
     *  Returns string
     */
     private function updateXMLFile(){

      try{

        //get content from ECB and replace content of your file
        $output_filename = $_SERVER['DOCUMENT_ROOT'].'/convertor/data/currency.xml';

        $host = "http://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml";
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $host);
        curl_setopt($ch, CURLOPT_VERBOSE, 1);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_AUTOREFERER, false);
        curl_setopt($ch, CURLOPT_REFERER, "http://www.ecb.europa.eu");
        curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        $result = curl_exec($ch);
        curl_close($ch);

        // the following lines write the contents to a file
        $fp = fopen($output_filename, 'w');
        fwrite($fp, $result);
        fclose($fp);

        return "Rates are up to date";
      }
      catch(Exception $e){

        return "Error";
      }
    }
  }
?>
