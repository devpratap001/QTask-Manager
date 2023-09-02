function getCookie(_name) {
    cookie = decodeURIComponent(document.cookie);
    let array = cookie.split(/; |=/);
    let n = array.indexOf(_name) + 1;
    return array[n]
}

// signout user from the page 

document.querySelector(".signout").onclick= function (){
    window.location.replace("/login");
};

// delete todo from database 

function deleteToDo (emai, val){
    fetch("/home/todoFetch/"+ getCookie("email")+ "/"+ val , {method: "DELETE"})
    .then(response => response.json())
    .catch(err => {console.log(err)})
}

// generate todo from the databases 

function loadData() {
    document.querySelector(".lists").innerHTML = "";
    fetch("/home/todoFetch/" + getCookie("email"))
        .then(responseDoc => responseDoc.json())
        .then((todoList) => {
            document.querySelector(".lists").innerHTML = `<div class="item"><span class="text">Title</span><span class="text">Description</span><span class="text">From</span><span class="text">To</span><span class= 'text'>Remove</span></div>`;
            todoList.forEach(element => {

                var idToDelete= element._id;
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
                btnElem.innerHTML = `<button type= "button" onclick= 'deleteToDo("${getCookie('email')}", "${idToDelete}")' class= 'btn delete'>Delete</button>`
                li.appendChild(btnElem)

                document.querySelector(".lists").appendChild(li)
            });
        })
        .catch((err) => { console.log(err) })
};

// page ux design 

var date = new Date()
document.querySelector(".date").innerHTML = date;

document.querySelector(".To-Do").addEventListener("click", async () => {
    document.querySelector(".mainContent").innerHTML = "";
    let dataText = await fetch(`${getCookie("url")}/todoTemp`);
    let data = await dataText.text();
    document.querySelector(".mainContent").innerHTML = data;
    if (!todos.classList.contains("highlight")) {
        todos.classList.add("highlight")
    }

    // submitting the todo 

    var formSubmit = document.querySelector("#form");
    formSubmit.addEventListener("submit", async (Event) => {
        var form_Data = new FormData(document.querySelector("#form"));
        const formData = new URLSearchParams(form_Data);
        Event.preventDefault();
        const listSubmitted = await fetch("/home/todoPosted/" + getCookie('email'), {
            method: "POST",
            body: formData
        })
        const result = listSubmitted.json();
        console.log(result)
        return false;
    })
})

// handling resposiveness 

document.querySelector(".dashboard").onclick= function () {
    document.querySelector(".navigation").style= 
    "width:250px;position:absolute;top:0;left:0;z-index:2;";
    document.querySelector(".newProject").style= "display:inline-block;"
}
document.querySelector(".leftSwipe").onclick= function () {
    document.querySelector(".navigation").style= 
    "width:0px; position:relative;";
    document.querySelector(".newProject").style= "display:none;"
}