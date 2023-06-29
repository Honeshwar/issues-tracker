const searchByTitleOrLabelForm = document.getElementById("search-by-title-or-label");
const searchByAuthorForm = document.getElementById("search-by-author");
const clearFilter = document.getElementById('clear-filter');
const tableBody = document.getElementById("table-body");

const createIssueForm = document.getElementById('create-project-form');

/* */
searchByTitleOrLabelForm.onsubmit = function(e){
    e.preventDefault();
    console.log("send fetch ajax request");

    // const xhr = new XMLHttpRequest();

    // //initialize req
    // xhr.open("GET","../search-by-title",true);
    // //event handler add
    // xhr.onerror=(e)=>{
    //     console.log(e);
    // }

    // xhr.onload = (resData)=>{
    //         addToPage(resData);
    //         console.log("res data",resData);
    //     };

    // xhr.send();

    // fetch("../search-by-title").then((res)=>res.json()).then((resData)=>{
    //     addToPage(resData);
    //     console.log("res data",resData);
    // })

    console.log(e.target[0].value);

    const projectId = clearFilter.getAttribute('data-projectId');
    console.log("data-projectId",projectId);
    /** jquery way */
    $.ajax({
        method:"Post",
        url: `../search-by-title/${projectId}`,
        data:{search:e.target[0].value},
        success:function(resDataJson){
            console.log("res data",resDataJson);
            addToPage(resDataJson.data.issues);
            //display on DOM
            // if(resDataJson.data.deleted){
            //     a= `${resDataJson.data.postLikes.likes.length} `;//array length
            //     btn[i].style.backgroundColor="lightgray";
            //      return count[i].innerText=a;
            // }else{
            //    a= `${resDataJson.data.postLikes.likes.length} `;
            //    btn[i].style.backgroundColor="lightblue";
            //     return count[i].innerText=a;

            // }
            
        },error:function(resErrorJson){
            return console.log(resErrorJson.responseText);
        }
    }) 
}
function addToPage(issues){

    tableBody.innerHTML="";
    if(issues.length===0){
        tableBody.innerHTML=`<tr>
        <td colspan='4' style="text-align:center">No issue found!..</td>
        </tr>`;
        return;
    }
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

/* search by author form */
searchByAuthorForm.onsubmit = function(e){
    e.preventDefault();
    console.log("send fetch ajax request");


    console.log(e.target[0].value);
    const projectId = clearFilter.getAttribute('data-projectId');
    console.log("data-projectId",projectId);

    /** jquery way */
    $.ajax({
        method:"Post",
        url: `../search-by-author/${projectId}`,
        data:{author:e.target[0].value},
        success:function(resDataJson){
            console.log("res data",resDataJson);
            addToPage(resDataJson.data.issues);            
        },error:function(resErrorJson){
            return console.log(resErrorJson.responseText);
        }
    }) ;
}


/* clear filter */
clearFilter.onsubmit = function(e){
    e.preventDefault();
    console.log("send fetch ajax request");

    const projectId = clearFilter.getAttribute('data-projectId');
    console.log("data-projectId",projectId);

    /** jquery way */
    $.ajax({
        method:"get",
        url: `../clear-filter/${projectId}`,
        success:function(resDataJson){
            console.log("res data",resDataJson);
            addToPage(resDataJson.data.issues);            
        },error:function(resErrorJson){
            return console.log(resErrorJson.responseText);
        }
    }) ;
}

/* create issue form */
// createIssueForm.onsubmit = function(e){
//     e.preventDefault();
//     console.log("send fetch ajax request");


//     console.log(e);
//     // return;
//     /** jquery way */
//     $.ajax({
//         method:"Post",
//         url: "../create-issue",
//         data:{
//             title:e.target[0].value,
//             description:e.target[1].value,
//             labels:e.target[2].value,
//             author:e.target[3].value
//         },
//         success:function(resDataJson){
//             console.log("res data",resDataJson);
//             addNewIssueToPage(resDataJson.data.issue);  
                 
//         },error:function(resErrorJson){
//             return console.log(resErrorJson.responseText);
//         }
//     }) ;
// }

// function addNewIssueToPage(issue) {

//     const tr = document.createElement('tr');
//     tr.innerHTML=`
//         <td>${issue.title}</td>
//         <td>${issue.description}</td>
//         <td>${issue.author}</td>
//         <td class="open">Open</td>
//     `;
//     tableBody.prepend(tr);
// }