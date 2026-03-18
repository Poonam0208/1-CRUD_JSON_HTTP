let cl = console.log;

const PostContainer = document.getElementById('PostContainer');
const spinner = document.getElementById('spinner');


let BASE_URL = `https://postcard-6a86d-default-rtdb.firebaseio.com`;
let POST_URL = `${BASE_URL}/posts.json`;



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
                        <button class="btn btn-outline-primary">Edit</button>
                        <button class="btn btn-outline-danger">Delete</button>
                    </div>
                </div>
            </div>
        
        `
    }
    PostContainer.innerHTML = result;
}


function fetchPosts(){
    spinner.classList.remove('d-none');
  fetch(POST_URL)
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


