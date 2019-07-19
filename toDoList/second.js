

var form = document.getElementsByClassName('rename')[0];
var formShade = document.getElementsByClassName('formShade')[0];
var input = document.getElementById('renameInput');
var submitbtn = document.getElementById('submitBTN');


var motto = document.querySelector('h1.motto');





function details(e){
    console.log('inside details');
    
    oldName = e.target.innerHTML;
    console.log(oldName);
    
    
    form.style.display = 'block';
    formShade.style.display = 'block';
    
    input.value = oldName;
    
    window.onscroll = function(){
    window.scrollTo(0,0);
    }
    
}


submitbtn.addEventListener('click', submited);

function submited() {
    console.log('inside submitting ...')
    
    var newName = input.value;
    
    if(newName == ''){
        alert("Task name can't be empty");
    }
    else {
    taskName = newName;
    sameName();
    
    setTimeout(function(){ 
     if(exists == 'true'){
            alert('A task with this name already exists');
            title.value = '';
        } else {
    findingTask();
    setTimeout(function(){  
        newContent = currContent.replace(oldName, newName);
        
        
        db.transaction(function(tx){
         tx.executeSql('UPDATE todos SET content ="'+newContent+'" where task_name="'+oldName+'";')
                             });
   
    
    db.transaction(function(tx){
         tx.executeSql('UPDATE todos SET task_name ="'+newName+'" where task_name="'+oldName+'";')
                             });
        
        formShade.style.display = 'none';
    form.style.display = 'none';

        window.onscroll = function(){
    window.scroll();
    }
        getItems();
    },200); 
    }
    },200);
    }
    
}


function findingTask (){
    console.log('inside finding task');
    db.transaction(function(tx){
         tx.executeSql('SELECT * FROM todos',[], found, databaseError);}, databaseError);
    
}

function found(tx, results){
    console.log('inside selected');
    var len = results.rows.length;
    
    for(var i =0; i < len; i++){;
        console.log('i am there')
        if(oldName == results.rows.item(i).task_name){
            currContent = results.rows.item(i).content;
        }
    }
    
    console.log(currContent);
}





function changeMotto() {
    
    if(localStorage.motto == 'null'){
        var newMotto = prompt('Type your new motivational quote');   
    } else {
    
    var newMotto = prompt('Type your new motivational quote', localStorage.motto);
    }
    
    
    
    if(!newMotto && localStorage.motto == 'null'){
        motto.innerHTML = 'Type a motivational quote here';
    } else {
        if(!newMotto){
            motto.innerHTML = localStorage.motto;
        } else {
        localStorage.motto = newMotto;
        motto.innerHTML = newMotto;
        }
    }
   
}


function mottoStatus () {

    if (localStorage.motto == 'null' || localStorage.motto == '' || !localStorage.motto) {
        motto.innerHTML = 'Type a motivational quote here';
       
    }
    else {
        motto.innerHTML = localStorage.motto; 
    }
}

















