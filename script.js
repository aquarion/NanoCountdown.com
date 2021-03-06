

function getQueryString() {
  var result = {}, queryString = location.search.substring(1),
      re = /([^&=]+)=([^&]*)/g, m;

  while (m = re.exec(queryString)) {
    result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
  }

  return result;
}

function getCookie(c_name)
{
var i,x,y,ARRcookies=document.cookie.split(";");
for (i=0;i<ARRcookies.length;i++)
{
  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  x=x.replace(/^\s+|\s+$/g,"");
  if (x==c_name)
    {
    return unescape(y);
    }
  }
}

// parse a date in yyyy-mm-dd format
function parseDate(input) {
  var parts = input.split('-');
  // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
  return new Date(parts[0], parts[1]-1, parts[2]); // Note: months are 0-based
}


var countdown = document.getElementById("countdown");
var remaining = document.getElementById("remaining");

now = new Date;

year = now.getYear();
  
if (year < 2000){
  year = now.getYear()+1900;
}

var deadline    = new Date(year,11,1,0,0,0);
if(getQueryString()["deadline"]){
  var deadline = parseDate(getQueryString()["deadline"]);
}

var startdate   = new Date(year,10,1,0,0,0);
if(getQueryString()["startdate"]){
	var startdate = Date.parse(getQueryString()["startdate"]);
}

var targetWords = 50000;
if(getQueryString()["target"]){
  var targetWords = parseInt(getQueryString()["target"]);
}

var writtenWords = -1;
var writtenWords_cookie=getCookie("writtenWords");

if(writtenWords_cookie != null){
	writtenWords = parseInt(writtenWords_cookie)
}

var month       = deadline-startdate;
var persec      = targetWords/month;

var days        = 1000*60*60*24;
var hours       = 1000*60*60;
var minutes     = 1000*60;
var seconds     = 1000;
var tenths_sec  = 100;

var was_countup = false;


function formatNumber(num)
{    
    var n = num.toString();
    var nums = n.split('.');
    var newNum = "";
	nums[0] = nums[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (nums.length > 1)
    {
        var dec = nums[1].substring(0,2);
        newNum = nums[0] + "." + dec;
    }
    else
    {
    newNum = num;
    }
    return newNum;
}

function countdown_string(remain, tenths){
    
  remain_string = [];
  result = remain/days | 0
  if (result > 4){
    word = "day";
    if (result != 1) {word += "s";}
    
    remain_string.push(result+" "+word);
    remain = remain % days;
  }
  
  result = remain/hours | 0
  if (result > 12 || result < 200 ){
    word = "hour";
    if (result != 1) {word += "s";}
	if(result > 0){
		remain_string.push(result+" "+word);
	}
    remain = remain % hours;
  }
  
  result = remain/minutes | 0
  if (result){
    word = "minute";
    if (result != 1) {word += "s";}
	if(result > 0){
		remain_string.push(result+" "+word);
	}
    remain = remain % minutes;
  }
  
  result = remain/seconds | 0
  if (result){
    word = "second";
    if (result != 1) {word += "s";}
	if(result > 0){
		remain_string.push(result+" "+word);
	}
	num_seconds = result
    remain = remain % seconds;
  }
  
  if(tenths){
	  result = remain/tenths_sec | 0
	  if (result){
		word = "second";
		if (num_seconds != 1 || (num_seconds == 1 && result != 0) ) {word += "s";}
		if(result > 0){
			secs = remain_string.pop()
			remain_string.push(num_seconds+"."+result+" "+word);
		}
		remain = remain % tenths_sec;
	  }
  }
    
  return remain_string.join(", ")
    
}

function updateCountdown(){
  now    = new Date();
  delta  = (now-startdate);
  words  = (delta*persec).toFixed(2);
  remain = (deadline-now);
  
  if (now > deadline){
    countdown.innerHTML = "50,000";
    remaining.innerHTML = "no time";
    return;
  }
  
  if (now < startdate){
    was_countup = true;
    
    countdown.innerHTML = "Nothing";
    
    untilstart = startdate-now;
    
    remain_string = countdown_string(untilstart); 
    
    explain.innerHTML = "Nanowrimo "+year+" starts in " + remain_string;
    setTimeout("updateCountdown()", 1000);
    return;
  }
  
  if (was_countup){
      location.reload(true);
  }
  
    
  setTimeout("updateCountdown()", 200);
  countdown.innerHTML = formatNumber(words);
  document.title = formatNumber(words);

  remaining.innerHTML = countdown_string(remain);
  if (writtenWords == -1){
	//#return;
  } else if (writtenWords >= targetWords){
	remaining.innerHTML += "<p>You have won NaNoWriMo "+year+"!!</p>";
	
  } else if (words > writtenWords){
	num = (words - writtenWords).toFixed(2)
	remaining.innerHTML += "<p>You are "+formatNumber(num)+" words behind!</p>";
  } else {
	num = (writtenWords - words).toFixed(2)

	time = (writtenWords - words)/persec
	remain_string = countdown_string(time, true)

	remaining.innerHTML += "<p>At "+formatNumber(writtenWords)+" words, you are "+formatNumber(num)+" words ahead!<br/> You will remain ahead for "+remain_string+"</p>";

  }

  
}

function addListener(element, eventName, handler) {
  if (element.addEventListener) {
    element.addEventListener(eventName, handler, false);
  }
  else if (element.attachEvent) {
    element.attachEvent('on' + eventName, handler);
  }
  else {
    element['on' + eventName] = handler;
  }
}

updateCountdown();

var writtenWordsUpdate = function(){
	mywords = parseInt(window.prompt("How many words have you written? (-1 to remove)"));
	if(mywords){
		writtenWords = mywords;
		
		// Save as cookie
		var c_name="writtenWords"
		var c_value=escape(mywords) + "; expires="+deadline.toUTCString();
		document.cookie=c_name + "=" + c_value;
	}
	
	
};

wordprompt = document.getElementById("IveWrittenWords");

if(wordprompt){
	addListener(wordprompt, "click", writtenWordsUpdate);
}

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-19437942-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

