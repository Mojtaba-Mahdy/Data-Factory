
// hoisting some variables 
// Can't hoist all variables in order to maintain logical sequencing and easy debugging
var list = document.getElementById('list');
var addButton = document.getElementById('add');
var title = document.getElementById('title');
var today = document.getElementById('today');
var burgerNav = document.getElementById('burgerNav');
var killSideBar = document.getElementById('smoothClosure');



// today's date on the navigation bar
// trimming the long default date to human friendly version
var longDate = new Date();
var text = longDate.toDateString();
var lastSpace = text.lastIndexOf(' ');
var refinedDate = text.slice(0, lastSpace);
today.innerHTML = refinedDate;







// adding a new task <li> to the <ol>
var canAdd = true;


function createTask(e) {
    
    if (canAdd === true) {
        // check that task name is not empty nor longer than 60 characters
        
        taskName = title.value;
        sameName();
        
        if (title.value !== '') {
            
            
            setTimeout(function(){ 
             if(exists == 'true'){
            alert('A task with this name already exists');
            title.value = '';
        } else {
            
            // the delete all secret function 
            if ( title.value.toLowerCase() == 'delete all') {
                deleteAll();
                title.value = '';
                return;
            }
            
            
            // marking the current task as special
            numberN++;
//            idStopwatch 
            
            localStorage.idStopwatch = 'stopwatch' + numberN.toString();
            
            localStorage.idendTask = 'endTask' + numberN.toString();
            
      
            // then add a new list item to the ol   
            item = 
            "<li> <span class='details' id='taskName'>" + title.value + "</span><b id='" + localStorage.idStopwatch + "' class='stopwatch'>00:00:00</b> <b id='" + localStorage.idendTask + "' class='end' onclick='endStopwatch()'>End</b></li>";
            
            taskTitle = title.value;
            
             list.innerHTML += item;
            
            insertItem();

            // finishing up
            title.value = "";
            localStorage.setItem('SWrun', 'true');
//            stopWatchRunning = true;
            
            // no more tasks could be added
            document.querySelector('#add').setAttribute('class', 'disable');
            document.querySelector('#title').setAttribute('disabled', 'true');
            canAdd = false;
            
            if(numberN == 1) {
                selectingIds();
            }

            // setting the stopwatch 
            timer();
            
            // voicing your task 
//            var voice = new SpeechSynthesisUtterance();
//            voice.text = title.value + ' is now being monitored';
//            speechSynthesis.speak(voice);  
        }
    },200);
        
    } else {
        alert("task name can't be empty");
    }
}
}


var numberN = 0;
function gettingN(tx, results){
    if (results.rows.length == 0){
        if (numberN !== 0) {
            numberN = numberN;
        } else { numberN = 0;
              }
    } else {
    var len = results.rows.length;
    var lastID = len - 1;
    numberN = results.rows.item(lastID).id;
   
    }
}

function noTasks() {
    numberN = numberN;
}
// how to start a stopwatch for the newly added <li>
var secs = 0;  
var mins = 0;
var hours = 0;
//var stopWatchRunning;

var displaySecs;
var displayMins;
var displayHours;

function timer () {

    // registering the time the task started 
    // startClock = startTime nowS nowM nowH
    var startTime = new Date();
    localStorage.startSecs = startTime.getSeconds();
    localStorage.startMins = startTime.getMinutes();
    localStorage.startHrs = startTime.getHours();

    
    // for good looks 
    if ( localStorage.startSecs < 10){
            localStorage.startSecs = "0" + localStorage.startSecs.toString();
        }
        else { localStorage.startSecs = localStorage.startSecs; }
        
        if ( localStorage.startMins < 10){
            localStorage.startMins = "0" + localStorage.startMins.toString();
        }
        else { localStorage.startMins = localStorage.startMins; }
        
        if ( localStorage.startHrs < 10){
            localStorage.startHrs = "0" + localStorage.startHrs.toString();
        }
        else { localStorage.startHrs = localStorage.startHrs; }
    
    // declaring a variable without the 'var' keyword makes //it auomaticly global
localStorage.startString =  localStorage.startHrs + ":" + localStorage.startMins + ":" + localStorage.startSecs;
    
    
    
    
    
    tickTock = setInterval(stopwatch, 1000);
}

function stopwatch () { 
        if (localStorage.SWrun == 'true'){
            
            nowSecs = new Date().getSeconds();
     nowMins = new Date().getMinutes();
     nowHrs = new Date().getHours();
       
       // seconds
        if(nowSecs < localStorage.startSecs){
            nowSecs += 60;
            secs = nowSecs - localStorage.startSecs;
            nowMins -= 1;
        } else {
            secs = nowSecs - localStorage.startSecs;
        }
           // minutes 
        if(nowMins < localStorage.startMins){
            nowMins += 60;
            mins = nowMins - localStorage.startMins;
            nowHrs -= 1;
        } else {
            mins = nowMins - localStorage.startMins;
        }
        //Hours
           if(nowHrs < localStorage.startHrs){
            nowHrs += 24;
            hours = nowHrs - localStorage.startHrs;
        } else {
            hours = nowHrs - localStorage.startHrs;
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
            
            
    var updatedLI = '<li>' + document.getElementById(localStorage.idendTask).parentNode.innerHTML + '</li>';
    
    
    var taskName = document.getElementById(localStorage.idendTask).previousElementSibling.previousElementSibling;
    
    var stripped = '';
    for (var i =0; i < updatedLI.length; i++){
        
        if (updatedLI[i] == '"' ){
                stripped = stripped;
            } else {
                stripped += updatedLI[i];
            }
        }
                
            
    db.transaction(function(tx){
        tx.executeSql('UPDATE tasks SET content ="' + stripped + '" WHERE task_name ="' + taskName.innerHTML + '";');
        });
            
     document.getElementById(localStorage.idStopwatch).innerHTML = displayHours + ':' + displayMins + ':' + displaySecs;
         }
    }

// an event for when adding a new task
addButton.addEventListener('click', createTask);


// end button function
function endStopwatch () {
    // get the value of the stop watch 
    // set things so you could add a new task

       // stop the stopwatch count

        clicked = true;
//        stopWatchRunning = false;
    localStorage.SWrun = 'false';
        secs = 0;
        mins = 0;
        hours = 0;
    
        
        // replace end with the value and the stopwatch with time range

        var timeConsumed = document.getElementById(localStorage.idStopwatch).innerHTML;
    
    // adding labels (seconds, minutes, hours)
        if(timeConsumed.slice(0,2) == '00') {
            if(timeConsumed.slice(0,5) == '00:00'){
                timeConsumed = timeConsumed.slice(6) + ' Sec';
            }
            else {
                 timeConsumed = timeConsumed.slice(3) + ' Min';
            }
        } else {
            
            timeConsumed = timeConsumed.slice(0,-3) + ' Hrs';
        }
 
        document.getElementById(localStorage.idendTask).innerHTML = timeConsumed;

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
        document.getElementById(localStorage.idStopwatch).innerHTML = localStorage.startString + ' - ' + endString;
            
       clearInterval(tickTock); 
    
       // can't press end agian 
        document.getElementById(localStorage.idendTask).setAttribute('onclick', '');
        document.getElementById(localStorage.idendTask).className = 'ended';
    
    document.getElementById(localStorage.idStopwatch).className = 'stopwatched';
    
    var updatedLI = '<li>' + document.getElementById(localStorage.idendTask).parentNode.innerHTML + '</li>';
    
    
    var taskName = document.getElementById(localStorage.idendTask).previousElementSibling.previousElementSibling;
    
    var stripped = '';
    for (var i =0; i < updatedLI.length; i++){
            console.log('inside for loop');
        if (updatedLI[i] == '"' ){
                stripped = stripped;
            } else {
                stripped += updatedLI[i];
            }
        }
        
     
    
    
        //can add a new task to your day now
        document.querySelector('#add').setAttribute('class', '');
        document.querySelector('#title').removeAttribute(
        'disabled');
        canAdd = true;

    db.transaction(function(tx){
        tx.executeSql('UPDATE tasks SET content ="' + stripped + '" WHERE task_name ="' + taskName.innerHTML + '";');
        }, databaseError, getItems);
    
    
}


function deleteAll(){
    db.transaction(function(tx){
        tx.executeSql('DELETE FROM tasks;');
        }, databaseError, getItems);
 }

// Opening and closing the side bar
burgerNav.addEventListener('click', openSideBar);
killSideBar.addEventListener('click', closeSideBar);


function openSideBar () {
    
   window.onscroll = function() {
        window.scrollTo(0,0);
    }
    
        document.getElementById('sidebar').style = 'display:block';
    
        killSideBar.style.display = 'block';
    
}

function closeSideBar () {
    
        document.getElementById('sidebar').style = 'display:none';   
        
        killSideBar.style.display = 'none';
    
     window.onscroll = function() {
        window.scroll();
    }
}



// changing the user name
 var currName = document.getElementById('userName');
currName.addEventListener('click', changeUserName);


function changeUserName () {
    var userName = prompt('Type your new user name', localStorage.userName);
    
    
     if(userName.toLowerCase() == 'noname' || userName.toLowerCase() == 'no one' || userName.toLowerCase() == 'nameless' || userName.toLowerCase() == 'nobody'){
        userName = 'Mr. Mystery';
    }
    
    // create a local storage variable 
    localStorage.setItem('userName', userName);
    
    if (!userName){
        console.log('no user name');
        if(localStorage.userName){
            console.log('inside if');
            localStorage.userName = localStorage.userName;
        } else {
        localStorage.userName = 'John Doe';
        }
    }
    
   if (userName == '') {
       console.log('empty');
        if(localStorage.userName){
            localStorage.userName = localStorage.userName;
        } else {
        localStorage.userName = 'John Doe';
        }
    }
    
    document.getElementById('userName').innerHTML = localStorage.userName;
    
}


// setting the database - the next 6 functions
var db = openDatabase("taskMoniter", "1.0", "taskMoniter database", 200000);

db.transaction(function(tx){
        tx.executeSql('CREATE TABLE IF NOT EXISTS tasks(id INTEGER PRIMARY KEY AUTOINCREMENT, task_name string , content string)');
            }, databaseError, getItems);

function getItems(){
    db.transaction(function(tx){
    tx.executeSql('SELECT * FROM tasks',[], querySuccess, databaseError);
    }, databaseError);
}

function querySuccess(tx, results){
    var len = results.rows.length;
    var output = '';
    for (var i =0; i < len; i++){
        output += 
            results.rows.item(i).content;
    }
    list.innerHTML = output;
    
    var allTaskNames = document.querySelectorAll('.details');
for (var i =0; i < allTaskNames.length; i++){
           allTaskNames[i].addEventListener('click', details);
        }
}

function insertItem () {
    db.transaction(function(tx){
    tx.executeSql('INSERT INTO tasks (task_name, content) VALUES ("'+ taskTitle +'", "' + item  + '")');
    }, databaseError, getItems);
}

function databaseError (error) {
    alert('SQL error: ' + error);
}

function clearAll () {
    
    db.transaction(function(tx){
    tx.executeSql('DELETE FROM tasks');
    }, databaseError, getItems);
   
    
    if(localStorage.SWrun == 'true'){
        localStorage.SWrun = 'false';
    }
     return false;
}

var exists = 'false';
function sameName(){
    db.transaction(function(tx){
    tx.executeSql('SELECT * FROM tasks',[], worked, databaseError);
    }, databaseError);
    
}

function worked(tx, results){
    exists = 'false';
    var len = results.rows.length;
    
    for (var i =0; i < len; i++){
        var item_name =  results.rows.item(i).task_name;
        console.log(item_name);
        console.log(taskName);
        if(taskName == item_name){
            exists = 'true';
        }
    }
    
    console.log(exists);
    
}


 function selectingIds(){
     db.transaction(function(tx){
    tx.executeSql('SELECT id FROM tasks',[], gettingN, noTasks);
    }, databaseError);
 }

// previous data - runs onload of the page
function previousData(){
    // adding the username

   
    selectingIds();
    
    
    if (localStorage.userName){
        document.getElementById('userName').innerHTML = localStorage.userName;
    }
    
    var allTaskNames = document.querySelectorAll('.details');
    
for (var i =0; i < allTaskNames.length; i++){
           allTaskNames[i].addEventListener('click', details);
        }
    
    mottoStatus();
    
    if (localStorage.SWrun == 'true'){
        console.log('one task is not finished');
        
        document.querySelector('#add').setAttribute('class', 'disable');
            document.querySelector('#title').setAttribute('disabled', 'true');
            canAdd = false;
        
       tickTock = setInterval(stopwatch, 1000);
    }
    
}


// Change your profile picture 
var changePP = document.getElementById('profileChange');

var pictureSource = navigator.camera.PictureSourceType;

var destinationType = navigator.camera.DestinationType;


function addNewProfile(source) {
    navigator.camera.getPicture(onPhotoURISuccess, onError, {
        quality:50,
        destinationType: destinationType.FILE_URI,
        sourceType: source
    });
}

function onPhotoURISuccess (imageURI) {
    document.getElementById('profilePicture').src = imageURI;
}

function onError (error) {
    alert('Error: ' + error);
}


