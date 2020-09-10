let comments = [];
let posts = [];

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
    } catch (err) {
        alert(err)
    }
}

main();