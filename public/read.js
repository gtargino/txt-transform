function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files;

    for (f of files) {
        var reader = new FileReader();        
        
        reader.onload = function(e) {
            var dataContent = e.target.result;
            dropAndInputZone.innerHTML = dataContent;
        };
        reader.readAsText(f);
    }
}

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
}

function propStyle (str) {
    str = str.toUpperCase().trim();
    str = textFilter(str);
    str = str.replace(/  /g, ' ');
    str = str.replace(/ /g, '_');
    return str;
}

function textFilter(str) {
    com_acento = "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ!.,?:;({[]})/ºª-–\"\'";
    sem_acento = "AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr";
    
    var novastr="";
    for(i=0; i<str.length; i++) {
        troca=false;
        for (a=0; a<com_acento.length; a++) {
            if (str.substr(i,1)==com_acento.substr(a,1)) {
                novastr+=sem_acento.substr(a,1);
                troca=true;
                break;
            }
        }
        if (!troca) {
            novastr+=str.substr(i,1);
        }
    }
    return novastr; 
}

function completeText(e) {
    let splited = outputZone.value.split('\n');
    for (v of splited) {
        splited[splited.indexOf(v)] += e.value;
    }

    outputZone.value = splited.join('\n');
}

function unHide(eList) {
    for (i = 0; i < eCollection.length; i++) {
        if (eList[i].style.display == 'none') {
            eList[i].style.display = 'block';
        } else {
            eList[i].style.display = 'none';
        }
    }
}

var dropAndInputZone = document.querySelector('ul #input');
var outputZone = document.querySelector('#output');
var checkBox = document.querySelector('#cb');
var btnElement = document.querySelector('#refactor-btn');
var btnAdd = document.querySelector('#add');
var hidden = document.querySelectorAll('.hidden');
var btnSubmit = document.querySelector('#submit');
var completeField = document.querySelector('#completeField');
var btnRedo = document.querySelector('#redo');

dropAndInputZone.addEventListener('dragover', handleDragOver, false);
dropAndInputZone.addEventListener('drop', handleFileSelect, false);

btnAdd.addEventListener('click', function() {
    unHide(hidden);
});

btnSubmit.addEventListener('click', function() {
    completeText(completeField);
    completeField.value = '';
    unHide(btnRedo);
    unHide(hidden);
});

btnRedo.addEventListener('click', function() {
    unHide(hidden);
    //let keepL = completeField.value.substr(0,test.indexOf(r));
    //let keepR = completeField.value.substr(keepL.length + r.length,test.length);
});

btnElement.onclick = function() {    
    let outVal = propStyle(dropAndInputZone.value);
    outputZone.value = outVal;    
}

//cf.onkeyup = function() {

    /* console.log('cf.value: ' + cf.value);
    console.log('colletedSoFar: ' + colletedSoFar);

    if (cf.value != colletedSoFar) {
        let splited = outputZone.value.split('\n');

        for (v of splited) {
            colletedSoFar += cf.value[cf.value.length-1];
            splited[splited.indexOf(v)] += cf.value[cf.value.length-1];
        }
        outputZone.value = splited.join('\n');
    }*/
//}
