<?php

  /**
   *  File forms XML response to clients Request to load data
   *  Data are requested from convertorController
   *  Response is received by xmlHttp object
   */
  include_once $_SERVER['DOCUMENT_ROOT'].'/convertor/controller/convertorController.php';
  include_once $_SERVER['DOCUMENT_ROOT'].'/convertor/model/convertorModel.php';

  //forms response is in xml
  header('Content-Type: text/xml');
  echo '<?xml version="1.0" encoding="utf-8" standalone="yes" ?>';

  //root element
  echo '<response>';

    $convertorControllerObject = new ConvertorController();
    //loads data (array of ConvertorModel objects) returned from controller
    $modelArray = $convertorControllerObject->loadData();
    //loops array, element is a ConvertorModel object
    foreach ($modelArray as $element) {

      //creates XML response
      echo '<currency>';
        echo '<name>';
          //prints elements name property
          echo $element->getName();
        echo '</name>';
        echo '<rate>';
          //prints elements rate property
          echo $element->getRate();
        echo '</rate>';
      echo '</currency>';
    }

  //closes root element
  echo '</response>';

?>
