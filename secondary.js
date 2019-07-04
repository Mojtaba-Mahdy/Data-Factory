

var motto = document.querySelector('h1.motto');
var form = document.getElementsByClassName('rename')[0];
var formShade = document.getElementsByClassName('formShade')[0];
var input = document.getElementById('renameInput');
var submitbtn = document.getElementById('submitBTN');


function changeMotto() {
    
    var newMotto = prompt('Type your new motivational quote', localStorage.motto);
    
    localStorage.motto = newMotto;
    
    motto.innerHTML = newMotto;
    
    if(!newMotto){
        motto.innerHTML = 'Type a motivational quote here';
    }
    
    
}


function mottoStatus(){
    if (localStorage.motto == 'null' || localStorage.motto == '') {
        motto.innerHTML = 'Type a motivational quote here';
       
    }
    else {
        motto.innerHTML = localStorage.motto; 
    }
    
}



function details(e){
    console.log('inside details');
    
    oldName = e.target.innerHTML;
    input.value = oldName;
    
    form.style.display = 'block';
    formShade.style.display = 'block';

     window.onscroll = function(){
    window.scrollTo(0,0);
    }
}


submitbtn.addEventListener('click', submited);

function submited() {
    console.log('inside submitting ...')
    
    var newName = input.value;
    taskName = newName;
    
    setTimeout(function(){
    findingTask();
    setTimeout(function(){
        
        if(exists == 'true'){
            alert('A task with this name already exists');
            title.value = '';
        } else {
        newContent = currContent.replace(oldName, newName);
        
        console.log(newContent);
        
        db.transaction(function(tx){
         tx.executeSql('UPDATE tasks SET content ="'+newContent+'" where task_name="'+oldName+'";')
                             });
   
    
    db.transaction(function(tx){
         tx.executeSql('UPDATE tasks SET task_name ="'+newName+'" where task_name="'+oldName+'";')
                             });
        
        formShade.style.display = 'none';
    form.style.display = 'none';

             window.onscroll = function(){
    window.scroll();
    }
            getItems();
        }
    },200);  
     },200)
    
}


function findingTask (){
    console.log('inside finding task');
    db.transaction(function(tx){
         tx.executeSql('SELECT * FROM tasks',[], found, databaseError);}, databaseError);
    
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





















