//https://jsonplaceholder.typicode.com/posts

async function readPosts(){
    let postArea= document.querySelector('.posts');
    postArea.innerHTML= 'Carregando........';
    let response= await fetch('https://jsonplaceholder.typicode.com/posts');
    let json = await response.json();

    if(json.length> 0){
        postArea.innerHTML = '';
        for( let i in json){
            let postHtml = `<div><h1>${json[i].title}</h1> ${json[i].body}</div>  <hr>`;
            postArea.innerHTML += postHtml; // não é  a melhor forma de fazer 
        }
    }
    else {
        postArea.innerHTML = "NENHUM POST PARA SER EXIBIDO";
    }
}

async function addNewPost(title,body){
    await fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title : title, //pode ser escrito so title pois tem o mesmo nome da propriedade como no body
                body,
                userId : 2

            })
        }
    );
   document.querySelector('#titleField').value= '';
   document.querySelector('#bodyField').value= '';

   readPosts();

}



document.querySelector('#insertButton').addEventListener('click',()=>{
    let title = document.querySelector('#titleField').value;
    let body= document.querySelector('#bodyField').value;

    if(title && body ){
            addNewPost(title,body);
    }
    else {
        alert("Prencha todos os campos");
    }

})

readPosts();