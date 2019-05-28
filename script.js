
// hoisting some variables 
// Can't hoist all variables in order to maintain logical sequencing and easy debugging
var list = document.getElementById('list');
var addButton = document.getElementById('add');
var title = document.getElementById('title');
var today = document.getElementById('today');
var burgerNav = document.getElementById('burgerNav');
var killSideBar = document.getElementById('killSideBar');



// today's date on the navigation bar
// trimming the long default date to human friendly version
var longDate = new Date();
var text = longDate.toDateString();
var lastSpace = text.lastIndexOf(' ');
var refinedDate = text.slice(0, lastSpace);
today.innerHTML = refinedDate;





// adding a new task <li> to the <ol>
var n = 0;
var canAdd = true;

function createTask(e) {
    
    if (canAdd === true) {
        // check that task name is not empty nor longer than 60 characters
        if (title.value !== '') {
            // marking the current task as special
            n++;
            idStopwatch = 'stopwatch' + n.toString();
            idendTask = 'endTask' + n.toString();
            // idTaskName = 'taskName' + n.toString();
            
      
            // then add a new list item to the ol   
            list.innerHTML += 
            "<li> <span onclick='details()' id='taskName'>" + title.value + "</span><b id='" + idStopwatch + "' class='stopwatch'>00:00:00</b> <b id='" + idendTask + "' class='end' onclick='endStopwatch()'>End</b></li>";

            // finishing up
            title.value = "";
            stopWatchRunning = true;
            
            // no more tasks could be added
            document.querySelector('#add').setAttribute('class', 'disable');
            document.querySelector('#title').setAttribute('disabled', 'true');
            canAdd = false;

            // setting the stopwatch 
            timer();
            
            // voicing your task 
//            var voice = new SpeechSynthesisUtterance();
//            voice.text = title.value + ' is now being monitored';
//            speechSynthesis.speak(voice);  

        
    } else {
        alert("task name can't be empty");
    }
}
}



// how to start a stopwatch for the newly added <li>
var secs = 0;  
var mins = 0;
var hours = 0;
var stopWatchRunning = true;

var displaySecs;
var displayMins;
var displayHours;

function timer () {

    // registering the time the task started 
var startClock = new Date();
var nowH = startClock.getHours();
var nowM = startClock.getMinutes();
var nowS = startClock.getSeconds();
    
    // for good looks 
    if ( nowS < 10){
            nowS = "0" + nowS.toString();
        }
        else { nowS = nowS; }
        
        if ( nowM < 10){
            nowM = "0" + nowM.toString();
        }
        else { nowM = nowM; }
        
        if ( nowH < 10){
            nowH = "0" + nowH.toString();
        }
        else { nowH = nowH; }
    
    // declaring a variable without the 'var' keyword makes //it auomaticly global
startString =  nowH + ":" + nowM + ":" + nowS;
    
    
        function stopwatch () { 
        if (stopWatchRunning === true){
            secs++;
            if (secs == 60) {
                mins++;
                secs = 0;

                if ( mins == 60 ) {
                    hours++;
                    mins = 0;
                }
            }
            // for good looks
            if ( secs < 10){
                displaySecs = "0" + secs.toString();
            }
            else { displaySecs = secs; }

            if ( mins < 10){
                displayMins = "0" + mins.toString();
            }
            else { displayMins = mins; }

            if ( hours < 10){
                displayHours = "0" + hours.toString();
            }
            else { displayHours = hours; }
            
            document.getElementById(idStopwatch).innerHTML = displayHours + ':' + displayMins + ':' + displaySecs;
         }
    }
    
    
    tickTock = setInterval(stopwatch, 1000);
}

// an event for when adding a new task
addButton.addEventListener('click', createTask);


// end button function
function endStopwatch () {
    // get the value of the stop watch 
    // set things so you could add a new task

       // stop the stopwatch count

        clicked = true;
        stopWatchRunning = false;
        secs = 0;
        mins = 0;
        hours = 0;
    
        
        // replace end with the value and the stopwatch with time range

        var timeConsumed = document.getElementById(idStopwatch).innerHTML;
    
    // adding labels (seconds, minutes, hours)
        if(timeConsumed.slice(0,2) == '00') {
            if(timeConsumed.slice(0,5) == '00:00'){
                timeConsumed = timeConsumed.slice(6) + ' Seconds';
            }
            else {
                 timeConsumed = timeConsumed.slice(3) + ' Minutes';
            }
        } else {
            
            timeConsumed = timeConsumed.slice(0,-3) + ' Hours';
        }
 
        document.getElementById(idendTask).innerHTML = timeConsumed;

        // setting the stop watch place to show time range
        // figuring the time the task ended 
        var endClock = new Date();
        var nowH = endClock.getHours();
        var nowM = endClock.getMinutes();
        var nowS = endClock.getSeconds();
        // good looks 
        if ( nowS < 10){
            nowS = "0" + nowS.toString();
        }
        else { nowS = nowS;}
        
        if ( nowM < 10){
            nowM = "0" + nowM.toString();
        }
        else { nowM = nowM; }
        
        if ( nowH < 10){
            nowH = "0" + nowH.toString();
        }
        else { nowH = nowH; }
        var  endString =  nowH + ":" + nowM + ":" + nowS;
        
        
        // replacing the stopwatch with time range
        document.getElementById(idStopwatch).innerHTML = startString + ' - ' + endString;
            
       clearInterval(tickTock); 
    
       // can't press end agian 
        document.getElementById(idendTask).setAttribute('onclick', '');
        document.getElementById(idendTask).style.backgroundColor = '#777';
    
        //can add a new task to your day now
        document.querySelector('#add').setAttribute('class', '');
        document.querySelector('#title').removeAttribute(
        'disabled');
        canAdd = true;

    
    
}


burgerNav.addEventListener('click', sideBar);
killSideBar.addEventListener('click', closeSideBar);


function sideBar () {
        document.getElementById('sidebar').style = 'display:block';
}

function closeSideBar () {
        document.getElementById('sidebar').style = 'display:none';   
}



// Change your profile picture 
var changePP = document.getElementById('profileChange');
changePP.addEventListener('click', addNewProfile);
var pictureSource = navigator.camera.PictureSourceType;
var destinationType = navigator.camera.DestinationType;

function addNewProfile() {
    navigator.camera.getPicture(onPhotoURISuccess, onError, {
        quality:50,
        destinationType: destinationType.FILE_URI,
        sourceType: pictureSource.PHOTOLIBRARY
    });
}

function onPhotoURISuccess (imageURI) {
    document.getElementById('profilePicture').src = imageURI;
}

function onError (error) {
    alert('Error: ' + error);
}









