
// hoisting some variables 
// can't hoist all variables in order to maintain logic and easy debugging
var list = document.getElementById('list');
var add = document.getElementById('add');
var title = document.getElementById('value');
var today = document.getElementById('today');
var burgerNav = document.getElementById('burgerNav');
var killSideBar = document.getElementById('smoothClosure');



// today's date on the navigation bar
// trimming the long default date to human friendly version
var longDate = new Date();
var text = longDate.toDateString();
var lastSpace = text.lastIndexOf(' ');
var refinedDate = text.slice(0,lastSpace);
today.innerHTML = refinedDate;





var n = 0;
add.addEventListener('click', addingTask);
                     
function addingTask(){
    // the task name can't be empty
    taskName = title.value;
    sameName();
    
    if (title.value != '') {
        
        setTimeout(function () {
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
        
        n++;
        idCheck = 'check' + n.toString();
        
         item = "<li> <span class=details id=taskName>" + title.value + "</span> <b id=" + idCheck + " class=unchecked data-checked=false></b><span id=del></span></li>";
        
        insertItem();
        
        // then add a new list item to the ol
        list.innerHTML += item;
            

        // re-setting the input
        title.value = "";  
        
     }
    }, 200)
        
    } else {
        alert("To-do item can't be empty");
    }

}



// The check/uncheck button button

function check(e) {
   // strike through the taskName of task previous to the current id
    console.log('inside check');
    var currCheck = e.target;
 
    var currtaskid = e.target.id;
    
    var checked = currCheck.getAttribute('data-checked');
 
    var currTaskName = currCheck.previousElementSibling;
 
    
    if(checked == 'true') {
        console.log('unchecking ...');
        currTaskName.style = 'text-decoration:none';
        currTaskName.style = 'color:#000';
        currCheck.setAttribute('data-checked','false');
        currCheck.setAttribute('class', 'unchecked');
       
        
        
        // update local storage
        var updatedLI = '<li>' + currCheck.parentNode.innerHTML + '</li>';
        
        
        
     
        
        for (var i =0; i < updatedLI.length; i++){
            //console.log('inside for loop');
            
            
            
        var output = '';
        var positive = 0;
        var enough = 0;
        for (var i =0; i < updatedLI.length; i++){
            //console.log('inside for loop');
            
            // stripping the list item from the quotes
            if (updatedLI[i] == 's'){
                positive = 1;
            }
            if (positive == 1 && updatedLI[i] == 't'){ positive = 2;}
            if (positive == 2 && updatedLI[i] == 'y'){ positive = 3;}
            if (positive == 3 && updatedLI[i] == 'l'){ positive = 4;}
            if (positive == 4 && updatedLI[i] == 'e'){ positive = 5;}

            if (positive == 5 && updatedLI[i] == '"'){ 
                
                output += "'";
                enough++;
                
               
                
                if (enough == 2) {
                    enough = 0;
                    positive = 0;
                    
        
                }
                
            }
            
            
            
            
            if (updatedLI[i] == '"' ){
                output = output;
            } else {
                output += updatedLI[i];
            }
            
        }
            
        
        db.transaction(function(tx){
        tx.executeSql('UPDATE todos SET content ="' + output + '" WHERE task_name="' + currTaskName.innerHTML + '";');
       }, databaseError, getItems);
        }
         
        
    } else {
        console.log('checking ...');
        currTaskName.style = 'text-decoration:line-through';
        currTaskName.style.color = '#888';
        
        currCheck.setAttribute('data-checked','true');
        currCheck.setAttribute('class', 'checked');
        
        
        
        // update local storage
        var updatedLI = '<li>' + currCheck.parentNode.innerHTML + '</li>';
        
        var stripped = '';
        var positive = 0;
        var enough = 0;
        for (var i =0; i < updatedLI.length; i++){
            //console.log('inside for loop');
            
            // stripping the list item from the quotes
            if (updatedLI[i] == 's'){
                positive = 1;
            }
            if (positive == 1 && updatedLI[i] == 't'){ positive = 2;
            }
            if (positive == 2 && updatedLI[i] == 'y'){ positive = 3;
            }
            if (positive == 3 && updatedLI[i] == 'l'){ positive = 4;
            }
            if (positive == 4 && updatedLI[i] == 'e'){ positive = 5;
            }

            if(enough !== 13) {
                
                if (positive == 5 && updatedLI[i] == '"'){ 
                
                stripped += "'";
                enough++;
                                
                if (enough == 2) {
                    enough = 13;
                    positive = 0;
                    
                }
                
            }
            }
            
            
            
            
            if (updatedLI[i] == '"' ){
                stripped = stripped;
            } else {
                stripped += updatedLI[i];
            }
            
        }
        
        
        // the issue turned out to be is that the style attribute needs its quotes inorder to function
           
         
        db.transaction(function(tx){
        tx.executeSql('UPDATE todos SET content ="' + stripped + '" WHERE task_name ="' + currTaskName.innerHTML + '";');
        }, databaseError, getItems);
        
    }
    
}


// deleting to-do items 
list.addEventListener('click', delItem);

function delItem(e) {
    if (e.target.id == 'del'){
        if (confirm('Are you sure?')){    
            
            // delete li tag
             var li = e.target.parentElement;

            
            var tnametoDel = e.target.previousElementSibling.previousElementSibling.innerHTML;
            
                        
            db.transaction(function(tx){
        tx.executeSql('DELETE FROM todos WHERE task_name ="' + tnametoDel + '";');
        }, databaseError, getItems);
        }   
        
        list.removeChild(li);
    }
}


function deleteAll(){
    db.transaction(function(tx){
        tx.executeSql('DELETE FROM todos;');
        }, databaseError, getItems);
 }

var exists = 'false';
function sameName(){
    console.log('inside same name');
    db.transaction(function(tx){
    tx.executeSql('SELECT * FROM todos',[], worked, databaseError);
    }, databaseError);
    
}

function worked(tx, results){
    exists = 'false';
    var len = results.rows.length;
    
    for (var i =0; i < len; i++){
        var item_name =  results.rows.item(i).task_name;
        if(taskName == item_name){
            exists = 'true';
        } 
    }
}

// Opening and closing the side bar
burgerNav.addEventListener('click', openSideBar);
killSideBar.addEventListener('click', closeSideBar);




function openSideBar () {
    
    window.onscroll = function () {
        window.scrollTo(0,0);
    }
    
        document.getElementById('sidebar').style = 'display:block';
    
    killSideBar.style.display = 'block';
    
}

function closeSideBar () {
    
        window.onscroll = function(){
            window.scroll();
        }
        document.getElementById('sidebar').style = 'display:none';  
    
    killSideBar.style.display = 'none';
}



// setting the database - the next 6 functions
var db = openDatabase("taskMoniter", "1.0", "taskMoniter database", 200000);


function getItems(){
    db.transaction(function(tx){
    tx.executeSql('SELECT * FROM todos',[], querySuccess, databaseError);
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
    
    
     var allBs = document.querySelectorAll('b');
        for (var i =0; i < allBs.length; i++){
           allBs[i].addEventListener('click', check);
        }
    
    var allTaskNames = document.querySelectorAll('.details');
for (var i =0; i < allTaskNames.length; i++){
           allTaskNames[i].addEventListener('click', details);
        }
}

function insertItem () {
    db.transaction(function(tx){
    tx.executeSql(
        'INSERT INTO todos (task_name, content) VALUES ("' + taskName  + '", "' + item + '")'
    );
    }, databaseError, getItems);
}

function databaseError (error) {
    alert('SQL error: ' + error);
}

function clearAll () {
    db.transaction(function(tx){
    tx.executeSql('DELETE FROM todos');
    }, databaseError, getItems);
    return false;
}



// adding previous task - runs onload of the body tag
function oldTasks() {
    
    db.transaction(function(tx){
        tx.executeSql('CREATE TABLE IF NOT EXISTS todos(id INTEGER PRIMARY KEY AUTOINCREMENT, task_name string, content string)');
            }
     , databaseError, getItems);
    
    
        console.log('inside the first old tasks');

     
    
     var allBs = document.querySelectorAll('b');
        for (var i =0; i < allBs.length; i++){
           allBs[i].addEventListener('click', check);
        } 
    
    
    var allTaskNames = document.querySelectorAll('.details');

for (var i =0; i < allTaskNames.length; i++){
           allTaskNames[i].addEventListener('click', details);
        }
    
     mottoStatus();
    
    // adding the username
    if (localStorage.userName){
        document.getElementById('userName').innerHTML = localStorage.userName;
    }
    
}


document.getElementById('userName').addEventListener('click', changeUserName);


// changing the user name
function changeUserName () {
    var userName = prompt('Type your new user name');
    
    
    if(userName.toLowerCase() == 'noname' || userName.toLowerCase() == 'no one' || userName.toLowerCase() == 'nameless' || userName.toLowerCase() == 'nobody'){
        userName = 'Mr. Mystery';
    }
    
    // create a local storage variable 
    localStorage.setItem('userName', userName);
    
    if (!userName){
       localStorage.userName = 'John Doe';
    }
    
    if (userName == '') {
        if(localStorage.userName){
            localStorage.userName = localStorage.userName;
        } else {
        localStorage.userName = 'John Doe';
        }
    }
    
    document.getElementById('userName').innerHTML = localStorage.userName;
}

