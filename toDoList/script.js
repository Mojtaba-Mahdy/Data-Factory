
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





// adding a new task <li> to the <ol>
var n = 0;
add.addEventListener('click', addingTask);
                     
function addingTask(){
    // the task name can't be empty
    if (value.value != '') {        
        n++;
        idCheck = 'check' + n.toString();
        idendTask = 'taskName' + n.toString();
        
        var item = "<li> <span id='" + idendTask + "'>" + title.value + "</span> <b id='" + idCheck + "' class='end' data-checked='false'>Check</b><span id='del'>X</span></li>";
        
        
        
        localStorage.setItem(idCheck, item);
        
        
        // then add a new list item to the ol
        list.innerHTML += item;
            

        // re-setting the input
        value.value = "";  
        
        var allBs = document.querySelectorAll('b');
        for (var i =0; i < allBs.length; i++){
           allBs[i].addEventListener('click', check);
        } 
        
    } else {
        alert("To-do item can't be empty");
    }

}



// The check/uncheck button button

function check(e) {
   // strike through the taskName of task previous to the current id
    
    var currCheck = e.target;
    var currtaskid = e.target.id;
    var checked = currCheck.getAttribute('data-checked');
    var currTaskName = currCheck.previousElementSibling;
    
    if(checked == 'true') {
        currTaskName.style.textDecoration = 'none';
        currTaskName.style.color = '#000';
        currCheck.setAttribute('data-checked','false');
        currCheck.innerHTML = 'check';
        
        
        // update local storage
        var updatedLI = '<li>' + currCheck.parentElement.innerHTML + '</li>';
        localStorage.setItem(currtaskid, updatedLI);
        
    } else {
        currTaskName.style.textDecoration = 'line-through';
        currTaskName.style.color = '#888';
        currCheck.setAttribute('data-checked','true');
        currCheck.innerHTML = 'uncheck';
        
        // update local storage
        var updatedLI = '<li>' + currCheck.parentElement.innerHTML + '</li>';
        localStorage.setItem(currtaskid, updatedLI);
    }
    
}


// deleting to-do items
list.addEventListener('click', delItem);

function delItem(e) {
    if (e.target.id == 'del'){
        if (confirm('Are you sure?')){
            // delete from localstorage first
           var checkTag = e.target.previousElementSibling;
            
            var idToDelete = checkTag.id;
            localStorage.removeItem(idToDelete);
            
       
            
            // delete li tag
            var li = e.target.parentElement;
            list.removeChild(li);
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
        document.getElementById('sidebar').style = 'display:none';  
    
    killSideBar.style.display = 'none';
}



// adding previous task - runs onload of the body tag
function oldTasks() {
    
    for (var i=0; i < localStorage.length; i++){
        
        var oldTask = localStorage.getItem(localStorage.key(i));
        
        console.log(localStorage.key(i));
        
        if (oldTask == localStorage.userName){
            oldTask = '';
        }
        
        list.innerHTML +=  oldTask;
    }
     
    
     var allBs = document.querySelectorAll('b');
        for (var i =0; i < allBs.length; i++){
           allBs[i].addEventListener('click', check);
            
        } 
    
    // adding the username
    if (localStorage.userName){
        document.getElementById('userName').innerHTML = localStorage.userName;
    }
    
}


document.getElementById('userName').addEventListener('click', changeUserName);


// changing the user name
function changeUserName () {
    var userName = prompt('Type your new user name');
    
    
    
    // create a local storage variable 
    localStorage.setItem('userName', userName);
    
    if (!userName){
       localStorage.userName = 'John Doe';
    }
    
    if (userName == '') {
        localStorage.userName = 'John Doe';
    }
    
    document.getElementById('userName').innerHTML = localStorage.userName;
}

