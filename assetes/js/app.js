let cl = console.log;

const PostContainer = document.getElementById('PostContainer');
const spinner = document.getElementById('spinner');
const PostForm = document.getElementById('PostForm');
const titleControl = document.getElementById('title');
const bodyControl = document.getElementById('body');
const userIdControl = document.getElementById('userId');
const AddPostBtn = document.getElementById('AddPostBtn');
const UppdatePostbtn = document.getElementById('UppdatePostbtn');

let BASE_URL = `https://postcard-6a86d-default-rtdb.firebaseio.com`;
let POST_URL = `${BASE_URL}/posts.json`;

function snackBar(msg, icon){
    Swal.fire({
        title : msg,
        icon : icon,
        timer : 3000
    })
}

let postArr =[];

function CreatePostCard(arr){
    postArr = arr;

    let result = ``;
    for(let i = arr.length -1 ; i >=0; i--){
        result+= `
            <div class="col-md-4 mb-5"id="${arr[i].name}">
                <div class="card h-100">
                    <div class="card-header">
                        <h4>${arr[i].title}</h4>
                    </div>
                    <div class="card-body">
                        <p>${arr[i].body}</p>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                        <button onclick="onEdit(this)" class="btn btn-outline-primary">Edit</button>
                        <button onclick="onRemove(this)" class="btn btn-outline-danger">Delete</button>
                    </div>
                </div>
            </div>
        
        `
    }
    PostContainer.innerHTML = result;
}


function fetchPosts(){
spinner.classList.remove('d-none');
  fetch(POST_URL,{
    method : 'GET',
    body : null,
    headers : {
        'content-type' : 'aplication/json',
        'auth': 'Token from Local Strorege'
    }
  })
    .then(res=>{
       return res.json()
    })
    .then(data=>{

        for(const key in data){
            postArr.push({...data[key], id:key})
            cl(postArr)
        }
        CreatePostCard(postArr)
    })
    .catch(err=>{
        cl(err);
    })
    .finally(()=>{
        spinner.classList.add('d-none');
    })
}
fetchPosts();


function onPostSubmit(eve){
    eve.preventDefault();

    let postObj ={
        title : titleControl.value,
        body : bodyControl.value,
        userId : userIdControl.value
    }
   
    const configobj ={
        method : "POST",
        body : JSON.stringify(postObj),
        headers : {
             'content-type' : 'aplication/json',
             Auth : 'Token from LS'
        }
    }
    spinner.classList.remove('d-none');
    fetch(POST_URL, configobj)
       .then(res=>{
        return res.json()
       }).then(data =>{
          cl(data)

        let col = document.createElement('div');
        col.className = `col-md-4 mb-5`;
        col.id = data.name ;
        col.innerHTML = `
                <div class="card h-100">
                    <div class="card-header">
                        <h4>
                           ${postObj.title} 
                        
                        </h4>
                    </div>
                    <div class="card-body">
                        <p>${postObj.body}</p>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                        <button onclick="onEdit(this)" class="btn btn-outline-primary">Edit</button>
                        <button onclick="onRemove(this)" class="btn btn-outline-danger">Delete</button>
                    </div>
                </div>
        
        `
        PostContainer.prepend(col);
        snackBar(`The Post card with Id ${data.name} Added Successfully !!!`, `success`);
       })
       .catch(err =>{
           cl(err)
           spinner.classList.add('d-none')
       })
       .finally(()=>{
        spinner.classList.add('d-none')
       })
}






PostForm.addEventListener('submit', onPostSubmit)