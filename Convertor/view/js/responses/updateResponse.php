<?php

/**
 *  File forms XML response to clients Request to check whether currency.xml file is up to date
 *  Data are requested from convertorController
 *  Response is received by xmlHttp object
 */
  include_once $_SERVER['DOCUMENT_ROOT'].'/convertor/controller/convertorController.php';
  include_once $_SERVER['DOCUMENT_ROOT'].'/convertor/model/convertorModel.php';

  //form response is in xml
  header('Content-Type: text/xml');
  echo '<?xml version="1.0" encoding="utf-8" standalone="yes" ?>';

  //root element
  echo '<response>';
  //create an instance of controller class
  $convertorControllerObject = new ConvertorController();
  //echo message returned from controller (checks if xml file is current)
  echo $convertorControllerObject->checkUpdate();
  //close root element
  echo '</response>';

?>
