<?php



if (isset($_GET['callFunc1'])) {
        echo getData($_GET['callFunc1']);
        exit();
    }

function getData($data){
  // Create DOM from URL or file
  include('simple_html_dom.php');


  //$base = 'https://practiscore.com/patriot-match-1/squadding';
  $base = $data;

  $curl = curl_init();
  curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
  curl_setopt($curl, CURLOPT_HEADER, false);
  curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
  curl_setopt($curl, CURLOPT_URL, $base);
  curl_setopt($curl, CURLOPT_REFERER, $base);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE);
  $str = curl_exec($curl);
  curl_close($curl);

  // Create a DOM object
  $html_base = new simple_html_dom();
  // Load HTML from a string
  $html_base->load($str);

  //get all category links
  /*
  foreach($html_base->find('a') as $element) {
      print_r( $element->href );
  }*/
  foreach($html_base->find('span[data-placement=top]') as $element){
    echo $element;
  }

  $html_base->clear();
  unset($html_base);


}



?>
