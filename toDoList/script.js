
// hoisting some variables 
// can't hoist all variables in order to maintain logic and easy debugging
var list = document.getElementById('list');
var add = document.getElementById('add');
var title = document.getElementById('value');
var today = document.getElementById('today');
var burgerNav = document.getElementById('burgerNav');
var killSideBar = document.getElementById('killSideBar');



// today's date on the navigation bar
// trimming the long default date to human friendly version
var longDate = new Date();
var text = longDate.toDateString();
var lastSpace = text.lastIndexOf(' ');
var refinedDate = text.slice(0,lastSpace);
today.innerHTML = refinedDate;





// adding a new task <li> to the <ol>
var n = 0;
add.onclick = function(){
    // the task name can't be empty
    if (value.value != '') {        
        n++;
        idCheck = 'check' + n.toString();
        idendTask = 'taskName' + n.toString();
        
        // then add a new list item to the ol
        list.innerHTML += 
            "<li> <span id='" + idendTask + "'>" + title.value + "</span> <b id='" + idCheck + "' class='end' data-checked='false'>Check</b><span id='del'>X</span></li>";

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
    var checked = currCheck.getAttribute('data-checked');
    var currTaskName = currCheck.previousElementSibling;
    
    if(checked == 'true') {
        currTaskName.style.textDecoration = 'none';
        currTaskName.style.color = '#000';
        currCheck.setAttribute('data-checked','false');
        currCheck.innerHTML = 'check';
    } else {
        currTaskName.style.textDecoration = 'line-through';
        currTaskName.style.color = '#888';
        currCheck.setAttribute('data-checked','true');
        currCheck.innerHTML = 'uncheck';
    }
    
}


// deleting to-do items
list.addEventListener('click', delItem);

function delItem(e) {
    if (e.target.id == 'del'){
        if (confirm('Are you sure?')){
            var li = e.target.parentElement;
            list.removeChild(li);
        }   
    }
}




burgerNav.addEventListener('click', sideBar);
killSideBar.addEventListener('click', closeSideBar);


function sideBar () {
        document.getElementById('sidebar').style = 'display:block';
}

function closeSideBar () {
        document.getElementById('sidebar').style = 'display:none';   
}








