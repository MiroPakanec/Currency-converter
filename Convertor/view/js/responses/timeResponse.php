<?php

/**
 *  File forms XML response to clients Request to load time (as called in currency.xml file)
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
  //echo data returned from controller
  echo $convertorControllerObject->getDocumentUpdateDate();
  //close root element
  echo '</response>';

?>
