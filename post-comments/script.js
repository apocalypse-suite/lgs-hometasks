let comments = [];
let posts = [];
let users = [];
let userPictures = ['https://likewise-stage.azureedge.net/uploads/3eb6cf23-895b-45e9-b92c-5fb1b457dd04/bill-gates-profile-pic.jpg', 'https://i.ytimg.com/vi/KUwROhuhZ-Q/maxresdefault.jpg', 'https://pbs.twimg.com/media/DAjkAE_XoAM_SKF.jpg', 'https://1.bp.blogspot.com/-QaeKO6CXz8U/TbqlGsVGsxI/AAAAAAAADyY/0FFeXF_nN3A/s1600/Dame%2BEdna%2B1.jpg', 'https://wallpaperaccess.com/full/2090923.jpg', 'https://64.media.tumblr.com/036c3491ca544f1893a284b5ac746fd7/tumblr_pvxkrjVzhA1xb21v7o2_500.jpg', 'https://image.shutterstock.com/image-photo/young-deer-staring-straight-back-260nw-1007525833.jpg', 'https://image.shutterstock.com/image-photo/young-deer-staring-straight-back-260nw-1007525833.jpg', 'https://i.insider.com/5c005d9bac00e20fe169f725?width=1100&format=jpeg&auto=webp', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTqvDYGv-L54vmSfLkRkg0mOcC8xMDT6I8h6w&usqp=CAU', 'https://e3.365dm.com/20/04/2048x1152/skynews-cat-meme-coronavirus_4967171.jpg']
let someDate = new Date(2020, 11, 07).toLocaleDateString()

async function getComments() {
    try {
        return new Promise((resolve, reject) => {
            fetch('https://jsonplaceholder.typicode.com/comments', {
                    method: 'get'
                }).then(responce => responce.json())
                .then(json => {
                    resolve(json);
                    // comment = json;
                })
                .catch(err => reject("Something wrong with fetch"));
        });
    } catch (err) {
        alert(err);
    }

}

async function getPosts() {
    try {
        return new Promise((resolve, reject) => {
            fetch('https://jsonplaceholder.typicode.com/posts', {
                    method: 'get'
                }).then(responce => responce.json())
                .then(json => {
                    resolve(json);
                    // posts = json;
                })
                .catch(err => reject("Something went wrong with fetch"));
        });
    } catch (err) {
        alert(err)
    }

}

async function getUsers() {
    try {
        return new Promise((resolve, reject) => {
            fetch('https://jsonplaceholder.typicode.com/users', {
                    method: 'get'
                }).then(responce => responce.json())
                .then(json => {
                    resolve(json);
                    // posts = json;
                })
                .catch(err => reject("Something went wrong with fetch"));
        });
    } catch (err) {
        alert(err)
    }

}


function concatPostsAndComments(posts, users, comments) {
    posts.forEach((post) => {
        const userId = post.userId;
        let foundUser = users.find(user => user.id === userId);
        if (foundUser.hasOwnProperty('posts')) {
            foundUser.posts.push(post);
        } else {
            foundUser.posts = [];
            foundUser.posts.push(post);
        }
    })
    comments.forEach((comment) => {
        const postId = comment.postId;
        let foundPost = posts.find(post => post.id === postId);
        if (foundPost.hasOwnProperty('comments')) {
            foundPost.comments.push(comment);
        } else {
            foundPost.comments = [];
            foundPost.comments.push(comment);
        }
    })
}

async function main() {
    try {
        posts = await getPosts();
        comments = await getComments();
        users = await getUsers();
        concatPostsAndComments(posts, users, comments);
        console.log(users)
        drawBlocks(users);
    } catch (err) {
        alert(err)
    }
}

main();

function drawBlocks() {
    let container = document.querySelector('.container');
    users.forEach(user => {
        user.posts.forEach(post => {
            let postDiv = document.createElement('div');
            postDiv.classList.add('post');
            postDiv.innerHTML = `<p class="postTitle">${user.name}<span class="date">${new Date(+(new Date()) - Math.floor(Math.random()*10000000000)).toLocaleDateString()}</span></p> <p class="postText">${post.body}</p> <p class="postText"><a href = "#">Reply</a></p>`;
            container.append(postDiv);

            let userImage = document.createElement('img');
            userImage.classList.add('avatar');
            postDiv.append(userImage);
            userImage.src = userPictures[user.id];

            let commentSection = document.createElement('div');
            commentSection.classList.add('commentSection');
            postDiv.append(commentSection);

            post.comments.forEach(comment => {
                let userComment = document.createElement('div');
                commentSection.append(userComment);
                userComment.classList.add('comment');
                userComment.innerHTML = `<h4>${comment.name}</h4><h6><a href="#" style="color:black;">${comment.email}</a></h6> <p>${comment.body}</p>`;
            })
        });
    })
}