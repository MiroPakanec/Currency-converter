<?php

  /**
   *  ConvertorModel class
   *  encapsulates individual currencies
   */
  Class ConvertorModel{

      private $name;
      private $rate;

      public function __construct($name, $rate){
        $this->name = $name;
        $this->rate = $rate;
      }

      public function getName(){
        return $this->name;
      }

      public function getRate(){
        return $this->rate;
      }

      public function setName($value){
        $this->name = $value;
      }

      public function setRate($value){
        $this->rate = $value;
      }
  }

?>
