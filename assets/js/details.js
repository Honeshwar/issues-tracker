//fetching all element that we want to manipulate
const searchByTitleOrLabelForm = document.getElementById("search-by-title-or-label");
const searchByAuthorForm = document.getElementById("search-by-author");
const clearFilter = document.getElementById('clear-filter');
const tableBody = document.getElementById("table-body");
const createIssueForm = document.getElementById('create-project-form');


/************** add rows to table logic after getting response from server asynchronously***************/
function addIssuesToTableBody(issues){
    // empty the table
    tableBody.innerHTML="";
    // check for issue array is empty or not in response 
    if(issues.length===0){
        tableBody.innerHTML=`<tr>
        <td colspan='4' style="text-align:center">No issue found!..</td>
        </tr>`;
        return;
    }

    // iterate over issues array and create an row for each issue and append to tableBody
    for (let i = issues.length-1; i >=0 ; i--) {
        const tr = document.createElement('tr');
        tr.innerHTML=`
            <td>${issues[i].title}</td>
            <td>${issues[i].description}</td>
            <td>${issues[i].author}</td>
            <td class="open">Open</td>
        `;
        
        tableBody.appendChild(tr);
    }

}


/************** search issues by title or label form submit logic ***************/
searchByTitleOrLabelForm.onsubmit = function(e){
    //remove default action of button for this event
    e.preventDefault();

    //get projectId
    const projectId = searchByTitleOrLabelForm.getAttribute('data-projectId');
    
    //do ajax request
    $.ajax({
        method:"Post",
        url: `./search-by-title/${projectId}`,
        data:{search:e.target[0].value},
        success:function(resDataJson){
            // add issue to table body
            addIssuesToTableBody(resDataJson.data.issues);            
        },
        error:function(resErrorJson){
            return console.log(resErrorJson.responseText);
        }
    });
}

/************** search issues by author form submit logic ***************/
searchByAuthorForm.onsubmit = function(e){
    e.preventDefault();

    // get project ID
    const projectId = searchByAuthorForm.getAttribute('data-projectId');
    // do ajax request
    $.ajax({
        method:"Post",
        url: `./search-by-author/${projectId}`,
        data:{author:e.target[0].value},
        success:function(resDataJson){
            // add issue to table body
            addIssuesToTableBody(resDataJson.data.issues);            
        },error:function(resErrorJson){
            return console.log(resErrorJson.responseText);
        }
    }) ;
}

/* clear all search issues filter */
clearFilter.onsubmit = function(e){
    e.preventDefault();

    const projectId = clearFilter.getAttribute('data-projectId');
    // do ajax request
    $.ajax({
        method:"get",
        url: `./clear-filter/${projectId}`,
        success:function(resDataJson){
            // add issues to table body
            addIssuesToTableBody(resDataJson.data.issues);            
        },error:function(resErrorJson){
            return console.log(resErrorJson.responseText);
        }
    }) ;
}
