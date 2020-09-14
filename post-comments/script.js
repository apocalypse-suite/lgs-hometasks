let comments = [];
let posts = [];
let userPictures = ['https://likewise-stage.azureedge.net/uploads/3eb6cf23-895b-45e9-b92c-5fb1b457dd04/bill-gates-profile-pic.jpg', 'https://i.ytimg.com/vi/KUwROhuhZ-Q/maxresdefault.jpg', 'https://pbs.twimg.com/media/DAjkAE_XoAM_SKF.jpg', 'https://1.bp.blogspot.com/-QaeKO6CXz8U/TbqlGsVGsxI/AAAAAAAADyY/0FFeXF_nN3A/s1600/Dame%2BEdna%2B1.jpg', 'https://wallpaperaccess.com/full/2090923.jpg', 'https://64.media.tumblr.com/036c3491ca544f1893a284b5ac746fd7/tumblr_pvxkrjVzhA1xb21v7o2_500.jpg']

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

function concatPostsAndComments(posts, comments) {
    comments.forEach((comment, index) => {
        const postId = comment.postId;
        let foundPost = posts.find(post => post.id === postId);
        if (foundPost.hasOwnProperty('comments')) {
            foundPost.comments.push(comment);
        } else {
            foundPost.comments = [];
            foundPost.comments.push(comment);
        }
    })
    console.log(posts)
}

async function main() {
    try {
        posts = await getPosts();
        comments = await getComments();
        concatPostsAndComments(posts, comments);
        drawBlocks(posts);
    } catch (err) {
        alert(err)
    }
}

main();

function drawBlocks() {
    // let colors = ['#03071e', '#370617', '#6a040f', '#9d0208', '#d00000', '#dc2f02', '#e85d04', '#f48c06', '#faa307'];

    posts.forEach(post => {
        let container = document.querySelector('.container');
        let postDiv = document.createElement('div');
        postDiv.classList.add('post');
        postDiv.innerHTML = `<p class="postTitle">${post.title}</p> <p class="postText">${post.body}</p>`;
        container.append(postDiv);

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
    // let postTitles = Array.prototype.slice.call(document.querySelectorAll('.postTitle'));
    // postTitles.forEach(elem => {
    //     elem.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];;
    // })

}