<html>
<head>
  <title>Nanowrimo Countdown</title>  
<link href='//fonts.googleapis.com/css?family=Cabin+Condensed'               rel='stylesheet' type='text/css'>
<link href='http://fonts.googleapis.com/css?family=Nova+Mono' rel='stylesheet' type='text/css'>
<link href='style.css' rel='stylesheet' type='text/css'>

<style type="text/css">

<?PHP if(isset($_GET['bg'])){ ?>

body {
	background-image: url("custom_bg/<?PHP echo $_GET['bg']; ?>.jpg");
}

<?PHP } ?>

</style>

</head>


<body> 
  <!-- Traditionally, there are jokes in the comments of these things. This time, the joke's on you -->
  <div id="surround">
    <div class="bubble">To hit the deadline, you should have written</div>
    <h1 id="countdown"></h1>
    <div id="explain" class="bubble">words by now. You have <span id="remaining"></span>
	<p><a href="#" id="IveWrittenWords">I've written words!</a></p>
    </div>
  </div>
  
  <div id="footer">
    By <a href="http://www.aquarionics.com">Aquarion</a>, 
    [ <a href="http://www.twitter.com/aquarion">twitter</a> | <a href="http://tumblr.aquarionics.com">tumblr</a> | <a href="http://wiki.aquarionics.com/Walrus">elseweb</a> ] - There are some [ <a href="advanced.html">Advanced Options</a> ]<br/>
    Entirely unaffiliated with <a href="http://www.nanowrimo.org">NaNoWriMo</a>, Hate it with the hashtag <code>#BastardWidget</code> on <a href="https://twitter.com/#!/search/%23BastardWidget">twitter</a> or <a href="https://tumblr.com/tagged/BastardWidget">tumblr</a> (Thanks to <a href="http://www.twitter.com/LondonNaNo">@LondonNaNo</a> for naming it.) Good&nbsp;luck!
  </div>
  
  
   
<script type="text/javascript" src="script.js">
</script>

</body>
</html>
