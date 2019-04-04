let currentPosts;
``//this post is just for test function editPost
let photoPost = {
    id: '5',
    description: 'qweqwewqeqweqweqwewqeqwe',
    createdAt: new Date(Date()),
    author: 'ivan',
    photoLink: 'edit.png',
    hashtags: ['#dog'],
    likes: ['lol', 'kek']
};

scriptModule = (function () {

    let user = 'ivan';

    let postsList = new PostsList(posts);

    let makePost = (id) => {
        let feed = document.getElementsByClassName("feed")[0];
        let tmp = document.createElement("div");
        tmp.id = id;
        tmp.innerHTML = drawPosts(postsList.get(id));
        feed.appendChild(tmp);
    };

    let drawPosts = (photoPost) => {
        let data = photoPost.createdAt;
        let HTML = '<div class="post-row">\n' +
            '            <h1 class="post-title">' + photoPost.author + '</h1>\n' +
            '            <p class="post-date">' + photoPost.createdAt + '</p>\n' +
            '            <div class="post-content">\n' +
            '                <img src="' + photoPost.photoLink + '" class="post-img fl_l " alt="">\n' +
            '                <p class="post-text">' + photoPost.description + '\n' +
            '                </p>\n' +
            '                <div class="clr"></div>\n' +
            '            </div>\n' +
            '            <div class="hashtags">\n';

        photoPost.hashtags.forEach(function (item, i, hashtags) {
            HTML += '<a href="index.html" class="hashtag">' + item + '</a>\n';
        });

        HTML += '</div>\n<div class="edit-btn">\n' +
            '\n' +
            '                </div>\n' +
            '                <div class="delete-btn">\n' +
            '\n' +
            '                </div>' +
            '            <div class="like-btn">\n' +
            '\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </div>';
        return HTML;
    };

    let makePosts = () => {
        currentPosts = postsList.getPage();
        currentPosts.forEach(function (item) {
            makePost(item.id);
        });
        let feed = document.getElementsByClassName("feed")[0];
        let tmp = document.createElement("div");
        tmp.classList.add("add-btn");
        feed.appendChild(tmp);
    };

    let removePhotoPost = (id) => {
        let tmp = getPhotoPost(id);
        if (tmp === undefined)
            alert("You can't delete this photo123");
        else {
            if (tmp.author === user) {
                let i = currentPosts.indexOf(tmp);
                currentPosts.splice(i, 1);
                alert(currentPosts.length);
                tmp = document.getElementById(id);
                tmp.remove();
            } else {
                alert("You can't delete this photo");
            }
        }
    };

    let getPhotoPost = (id) => {
        let tmp = new PostsList(currentPosts);
        return tmp.get(id);
    };

    let removeAll = () => {
        currentPosts = null;
        let tmp = document.getElementsByClassName('feed')[0];
        while (tmp.lastChild)
            tmp.lastChild.remove();
    };

    let addMorePosts = () => {
        let tmp = document.getElementsByClassName('feed')[0];
        tmp.lastChild.remove();
        let oldSize = currentPosts.length;
        let newPosts = postsList.getPage(oldSize);
        newPosts.forEach(function (item) {
            currentPosts.push(item);
        });
        for (var x = oldSize; x < oldSize + newPosts.length; x++)
            makePost(currentPosts[x].id);
        let btn = document.createElement("div");
        btn.classList.add("add-btn");
        tmp.appendChild(btn);
    };

    let logIn = () => {
        let tmp = document.getElementById('auth-btn');
        tmp.hidden = true;
        let name = document.getElementById('username');
        name.innerText = user;
    };

    let logOut = () => {
        let tmp = document.getElementById('auth-btn');
        tmp.hidden = false;
        let name = document.getElementById('username');
        name.innerText = '';
    };

    let editPost = (id) => {
        if (PostsList.validate(photoPost)) {

            let tmp = postsList.get(id);
            if (tmp.author === user) {
                let index = currentPosts.indexOf(tmp);
                if (index === -1) {
                    postsList.edit(id, photoPost);
                } else {
                    let editPost = document.getElementById(id);
                    let arr = editPost.getElementsByClassName('post-text')[0];
                    arr.textContent = photoPost.description;
                    arr = editPost.getElementsByTagName('IMG')[0];
                    arr.src = photoPost.photoLink;
                    arr = editPost.getElementsByClassName('post-date')[0];
                    arr.textContent = photoPost.createdAt;
                    arr = editPost.getElementsByClassName('hashtag');
                    if (arr.length === photoPost.hashtags.length) {
                        for (var x = 0; x < arr.length; x++)
                            arr[x].textContent = photoPost.hashtags[x];
                    } else {
                        if (arr.length > photoPost.hashtags.length) {
                            for (var x = 0; x < photoPost.hashtags.length; x++)
                                arr[x].textContent = photoPost.hashtags[x];
                            for (var x = photoPost.hashtags.length; x < arr.length;)
                                arr[x].remove();
                        } else {
                            for (var x = 0; x < arr.length; x++)
                                arr[x].textContent = photoPost.hashtags[x];
                            for (var x = arr.length; x < photoPost.hashtags.length; x++) {
                                let hashtags = editPost.getElementsByClassName('hashtags')[0];
                                let tmp = document.createElement("a");
                                tmp.href = 'index.html';
                                tmp.classList = 'hashtag';
                                tmp.textContent = photoPost.hashtags[x];
                                hashtags.appendChild(tmp);
                            }
                        }
                    }
                }
            } else
                alert('U CANT DO IT. U R NOT ivan');
        }else
            alert('UR POST IS BAD')
    };

    return {
        makePosts,
        removePhotoPost,
        removeAll,
        addMorePosts,
        logIn,
        logOut,
        editPost
    }
}());