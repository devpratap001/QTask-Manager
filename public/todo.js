// page ux design 

var todos = document.querySelector(".To-Do");
document.querySelector(".project").addEventListener("click", () => {
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
})
function getCookie(_name) {
    cookie = decodeURIComponent(document.cookie);
    let array = cookie.split(/; |=/);
    let n = array.indexOf(_name) + 1;
    return array[n]
}

var date = new Date()
document.querySelector(".date").innerHTML = date;

document.querySelector(".To-Do").addEventListener("click", async () => {
    let dataText = await fetch(`${getCookie("url")}/todoTemp`);
    let data = await dataText.text();
    document.querySelector(".mainContent").innerHTML = data;
    if (!todos.classList.contains("highlight")) {
        todos.classList.add("highlight")
    }

    // submitting the todo 

    var formSubmit= document.querySelector("#form");
    formSubmit.addEventListener("submit",async (Event)=>{
        var form_Data= new FormData(document.querySelector("#form"));
        const formData= new URLSearchParams(form_Data);
        Event.preventDefault();
        const listSubmitted= await fetch("/home/todoPosted/"+ getCookie('email'), {
            method: "POST",
            body: formData
        })
        const result= listSubmitted.json();
        console.log(result)
        return false;
    })
})