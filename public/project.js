// create a new project 
function getCookie(_name) {
    cookie = decodeURIComponent(document.cookie);
    let array = cookie.split(/; |=/);
    let n = array.indexOf(_name) + 1;
    return array[n]
}

// clicking effcts on project list items 

function highlightProjectName(){
    document.querySelectorAll(".projectItem").forEach((element) => {
        element.onclick = function () {
            const projectList = document.querySelector(".projectList");
            if (projectList.querySelector(".highlight")) {
                projectList.querySelector(".highlight").classList.remove("highlight");
            }
            element.classList.add("highlight");
            document.querySelector(".projectName").innerHTML = element.innerHTML;

        }
    })
}

// adding a new project 

const newProject = document.querySelector(".newProject");

newProject.onclick = async function () {
    document.querySelector("#projectName").style = "display:inline-block;"
};

document.querySelector(".close").onclick = function () {
    document.querySelector("#projectName").style = "display:none;"
}

var i = 0;

document.querySelector("#projectName").onsubmit = async function (event) {
    event.preventDefault();
    document.querySelector(".projectList").innerHTML = "";
    const form_data = new FormData(this);
    const formdata = new URLSearchParams(form_data);
    const list_data = await fetch("/home/projects/add/" + i + "/" + getCookie("email"), {
        method: "POST",
        body: formdata
    })
    const response = await list_data.json();
    response.projects.forEach(element => {
        const li = document.createElement("div");
        li.classList.add("projectItem");
        li.classList.add("text");
        li.innerHTML = element.name;
        document.querySelector(".projectList").append(li);
    });
    // clicking individual project Name 
    highlightProjectName()
    i++;
}

// handling the project buuttton 

var j = 1;
var todos = document.querySelector(".To-Do");
document.querySelector(".project").addEventListener("click", async () => {
    document.querySelector(".projectList").innerHTML = "";
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

    if (j % 2 !== 0) {
        const list_names = await fetch("/home/projects/list/" + getCookie("email"));
        const response = await list_names.json();
        response.projects.forEach(async (element) => {
            const li = document.createElement("div");
            li.classList.add("projectItem");
            li.classList.add("text");
            li.innerHTML = element.name;
            document.querySelector(".projectList").append(li);
        })
    } else {
        document.querySelector(".active").innerHTML = "";
    }

    if (j === 1) {
        document.querySelector(".mainContent").innerHTML = "";
        const project_data = await fetch("/home/projects/temp");
        const response = await project_data.text();
        document.querySelector(".mainContent").innerHTML = response;
        console.log(response)
    }
    j++;

    // clicking individual project Name 
    highlightProjectName()

    // add tasks to the projects 

    document.querySelector("#project").addEventListener("submit", async (Event) => {
        Event.preventDefault();
        const form_data = new FormData(document.querySelector("#project"));
        const taskdata = new URLSearchParams(form_data)

        // post data to the server 

        const projName = document.querySelector(".active").innerHTML;
        if (projName !== "") {
            const data = await fetch("/home/projects/addtask/" + projName, {
                method: "POST",
                body: taskdata
            })
            const dataSubmitted = await data.json();
        }
    })

})

// fetch tasks of any project 

function loadTask() {
    document.querySelector(".lists").innerHTML = "";
    if (document.querySelector(".active").innerHTML !== "") {
        fetch("/home/projects/getTasks/" + document.querySelector(".active").innerHTML)
            .then(responseData => responseData.json())
            .then((response) => {
                document.querySelector(".lists").innerHTML = `<div class="item"><span class="text">Title</span><span class="text">Description</span><span class="text">From</span><span class="text">To</span><span class= 'text'>Remove</span></div>`;
                response.forEach(element => {

                    var idToDelete = element._id;
                    const li = document.createElement("div");
                    li.classList.add("item")

                    const titleElem = document.createElement("span");
                    titleElem.classList.add("text");
                    titleElem.innerHTML = element.title
                    li.appendChild(titleElem)

                    const descriptionElem = document.createElement("span");
                    descriptionElem.classList.add("text");
                    descriptionElem.classList.add("description");
                    descriptionElem.innerHTML = element.description
                    li.appendChild(descriptionElem)

                    const fromElem = document.createElement("span");
                    fromElem.classList.add("text");
                    fromElem.innerHTML = element.from
                    li.appendChild(fromElem)

                    const toElem = document.createElement("span");
                    toElem.classList.add("text");
                    toElem.innerHTML = element.to
                    li.appendChild(toElem)

                    const btnElem = document.createElement("span");
                    btnElem.classList.add("text");
                    btnElem.innerHTML = `<button type= "button" onclick= 'deleteProject("${element._id}", "${document.querySelector(".active").innerHTML}")' class= 'btn delete'>Delete</button>`
                    li.appendChild(btnElem)

                    document.querySelector(".lists").appendChild(li)
                })
            })
    }
}

// deleting a task from project 
function deleteProject(projectId, projName) {
    if (projName !== "") {
        fetch("/home/projects/deletetask/" + projName + "/" + projectId, {
            method: "DELETE"
        })
            .then(response => response.json())
            .catch((err) => { console.log("error") })
    }
}