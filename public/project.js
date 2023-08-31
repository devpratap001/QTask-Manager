// create a new project 
function getCookie(_name) {
    cookie = decodeURIComponent(document.cookie);
    let array = cookie.split(/; |=/);
    let n = array.indexOf(_name) + 1;
    return array[n]
}

const newProject= document.querySelector(".newProject");

newProject.onclick= async function(){
    document.querySelector("#projectName").style= "display:inline-block;"
};

document.querySelector(".close").onclick= function(){
    document.querySelector("#projectName").style= "display:none;"
}

var i=0;

document.querySelector("#projectName").onsubmit= async function (event){
    event.preventDefault();
    document.querySelector(".projectList").innerHTML= "";
    const form_data= new FormData(this);
    const formdata= new URLSearchParams(form_data);
    const list_data= await fetch("/home/projects/add/" + i +"/"+ getCookie("email"), {
        method: "POST",
        body: formdata
    })
    const response= await list_data.json();
    response.projects.forEach(element => {
        const li= document.createElement("div");
        li.classList.add("projectItem");
        li.classList.add("text");
        li.innerHTML= element.name;
        document.querySelector(".projectList").append(li);
    });
    i++;
}

// handling the project buuttton 

var j= 1;
var todos = document.querySelector(".To-Do");
document.querySelector(".project").addEventListener("click", async () => {
    document.querySelector(".projectList").innerHTML= "";
    todos.classList.remove("highlight")
    var list = document.querySelector(".projectList");
    var projects = document.querySelector(".project")
    if (list.classList.contains("hide")) {
        list.classList.remove("hide")
        projects.classList.add("highlight")
    } else {
        list.classList.add("hide")
        projects.classList.remove("highlight")
    }

    if (j%2 !==0){
        const list_names= await fetch("/home/projects/list/"+ getCookie("email"));
        const response= await list_names.json();
        response.projects.forEach(async (element)=>{
            const li= document.createElement("div");
            li.classList.add("projectItem");
            li.classList.add("text");
            li.innerHTML= element.name;
            document.querySelector(".projectList").append(li);
        })
    }
    if (j === 1){
        document.querySelector(".mainContent").innerHTML= "";
        const project_data= await fetch("/home/projects/temp/");
        const response= await project_data.text();
        console.log(response)
        document.querySelector(".mainContent").innerHTML= response;
    }
    j++;
})