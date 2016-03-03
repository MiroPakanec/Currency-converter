<?php

  include_once $_SERVER['DOCUMENT_ROOT'].'/convertor/model/convertorModel.php';

  /**
   *  Class ConvertorDataAccess
   *  fetches data from XML file and returns them to ConvertorController
   */
  Class ConvertorDataAccess{

    /**
     *  Function specifies the location of XML document,
     *  requests all currencies in a form of array calling private function
     *  Returns Array populated with ConvertorModel
     */
    public function loadData(){

      //location of the XML file
      $path = $_SERVER['DOCUMENT_ROOT'].'/convertor/data/currency.xml';
      //loads xml document and assigns it to $xml variable
      $xml = simplexml_load_file($path);
      return $this->createModelArray($xml);
    }

    /**
     *  Function fetches all currencies names and rates from XML file, puts them into ConvertorModel objects
     *  Adds Model Objects to the Array
     *  Parameter $xml is loaded XML file (currency.xml)
     *  Returns Array populated with ConvertorModel objects
     */
    private static function createModelArray($xml){

      $modelArray = array();
      //loops through all xml 'cube' elements (the ones that have name and rate attributes)
      foreach ($xml->Cube->Cube->Cube as $cube) {

        //creates ConvertorModel object, constructor requires name and rate
        $convertorModel = new ConvertorModel(
          $cube['currency'], $cube['rate']
      );
      //pushes model object to the array
      array_push($modelArray, $convertorModel);
      }

      //returns array
      return $modelArray;
    }

    /**
     *  Function fetches date from the XML file
     *  Returns string
     */
    public function getDocumentUpdateDate(){

      //specify location of the XML file
      $path = $_SERVER['DOCUMENT_ROOT'].'/convertor/data/currency.xml';
      //loads xml document and assigns it to $xml variable
      $xml = simplexml_load_file($path);

      //loops through all xml 'cube' elements (the one with time attribute)
      foreach ($xml->Cube->Cube as $cube) {

        //returns time attribute (date) to the controller
        return $cube['time'];
      }

      return 'not found';
    }
}

?>
