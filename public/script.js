let jokes = document.querySelector(".jokes")

function render() {
fetch("http://localhost:3000/jokes")
.then((res)=>res.json())
.then(data=>{
    console.log(data)
    jokes.innerHTML = ""
    data.forEach(j=>{
        jokes.innerHTML += joke(j)
    })
})
}
function joke(data){
    return `<div class="joke">
                <div class="content">
                    ${data.content}
                </div>
                <div class="buttons">
                    <div class="likes">${data.likes}</div>
                    <button onclick="like(${data.id})" class="like"><i class="fa-solid fa-thumbs-up"></i></button>
                    <div class="dislikes">${data.dislikes}</div>
                    <button onclick="dislike(${data.id})"class="dislike"><i class="fa-solid fa-thumbs-down"></i></button>
                </div>
            </div>`
}


function like(id){
    fetch("http://localhost:3000/like?id=" + id).then(res=> res.status == 200 && render())
}

function dislike(id){
    fetch("http://localhost:3000/dislike?id=" + id).then(res=> res.status == 200 && render())
}

document.querySelector("form").addEventListener("submit", (e)=>{
    e.preventDefault()
    let content = e.target["content"].value
    console.log(content)
    if(content.length < 3){
        alert("😂🤣🤣🤣")
        return
    }
    fetch("http://localhost:3000/jokes", {
        method : "POST",
        body: JSON.stringify({content})
    }).then(res=> res.status == 200 && render())
})
render()