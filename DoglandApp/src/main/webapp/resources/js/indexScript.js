let currentPosts;

scriptModule = (function () {

    const xhr = new XMLHttpRequest();

    let postsList;

    let user = 'USER';

    let filter = null;

    let makePost = (id) => {
        let feed = document.getElementsByClassName("feed")[0];
        let tmp = document.createElement("div");
        tmp.classList = "post-row";
        tmp.id = id;
        tmp.innerHTML = drawPosts(postsList.get(id));
        feed.appendChild(tmp);
    };

    let drawPosts = (photoPost) => {
        let data = new Date(photoPost.createdAt);
        let HTML = '<h1 class="post-title">' + photoPost.author + '</h1>\n' +
            '            <p class="post-date">' + data.getDate().toString() + '.' + (data.getMonth() + 1).toString() + '.' + data.getFullYear().toString() + '</p>\n' +
            '            <div class="post-content">\n' +
            '                <img src="' + photoPost.photoLink + '" class="post-img fl_l " alt="">\n' +
            '                <p class="post-text">' + photoPost.description + '\n' +
            '                </p>\n' +
            '                <div class="clr"></div>\n' +
            '            </div>\n' +
            '            <div class="hashtags">\n';

        photoPost.hashtags.forEach(function (item) {
            HTML += '<a class="hashtag" onclick="scriptModule.pressTag(\'' + item.toString() + '\')">' + item + '</a>\n';
        });

        if (user === 'guest') {
            HTML += '</div>';
        } else {
            if (user === photoPost.author)
                HTML += '</div>\n<div class="edit-btn" onclick="scriptModule.editPost(' + photoPost.id + ')">\n' +
                    '\n' +
                    '                </div>\n' +
                    '                <div class="delete-btn" onclick="scriptModule.removePhotoPost(' + photoPost.id + ')">\n' +
                    '\n' +
                    '                </div>' +
                    '        </div>\n' +
                    '    </div>';
            else {
                let index = photoPost.likes.indexOf(user);
                if (index === -1)
                    HTML += '</div>\n<div class="like-btn" onclick="scriptModule.like(' + photoPost.id + ')"></div>';
                else
                    HTML += '</div>\n<div class="like-btn" style="background: url(/resources/img/dog-icon-like.png)" onclick="scriptModule.like(' + photoPost.id + ')"></div>';
            }
        }
        return HTML;
    };

    let firstOpen = () => {
        if (user === 'guest') {
            document.getElementById('auth-btn').hidden = false;
        } else
            logIn(user);

        xhr.open("GET", "http://localhost:8080/getPosts", false);

        xhr.send();

        let answer = xhr.responseText.substr(9);

        postsList = new PostsList(JSON.parse(answer.substr(0, answer.length - 2)));

        currentPosts = postsList.getPage();
        currentPosts.forEach(function (item) {
            makePost(item.id);
        });
        let feed = document.getElementsByClassName("feed")[0];
        let tmp = document.createElement("div");
        tmp.classList.add("add-btn");
        tmp.onclick = function () {
            scriptModule.addMorePosts()
        };
        feed.appendChild(tmp);
    };

    let removePhotoPost = (id) => {
        id = id.toString();

        xhr.open("DELETE", "http://localhost:8080/getPosts", false);
        xhr.setRequestHeader("id", id);
        xhr.send();

        if (xhr.status !== 200)
            window.open("/error", "_self");

        let tmp = postsList.get(id);
        if (tmp === undefined)
            alert("VERY BIG ERROR");
        else {
            if (tmp.author === user) {
                let i = currentPosts.indexOf(tmp);
                if (i === -1) {
                    postsList.remove(id);
                    localStorage.removeItem('posts');
                    localStorage.setItem('posts', JSON.stringify(postsList.array));
                } else {
                    currentPosts.splice(i, 1);
                    tmp = document.getElementById(id);
                    tmp.remove();
                    postsList.remove(id);
                    localStorage.removeItem('posts');
                    localStorage.setItem('posts', JSON.stringify(postsList.array));
                }
            } else {
                alert("You can't delete this photo");
            }
        }
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
        let newPosts = postsList.getPage(oldSize, 10, filter);
        newPosts.forEach(function (item) {
            currentPosts.push(item);
        });
        for (var x = oldSize; x < oldSize + newPosts.length; x++)
            makePost(currentPosts[x].id);
        let btn = document.createElement("div");
        btn.classList.add("add-btn");
        btn.onclick = function () {
            scriptModule.addMorePosts()
        };
        tmp.appendChild(btn);
    };

    let logIn = (user) => {
        let tmp = document.getElementById('auth-btn');
        tmp.hidden = true;
        tmp = document.getElementById('not-auth-btn');
        tmp.hidden = false;
        let name = document.getElementById('username');
        name.hidden = false;
        name.innerText = user;
    };

    let logOut = () => {
        let tmp = document.getElementById('auth-btn');
        tmp.hidden = false;
        tmp = document.getElementById('not-auth-btn');
        tmp.hidden = true;
        let name = document.getElementById('username');
        name.hidden = true;
        name.innerText = '';
        user = 'guest';
        localStorage.removeItem('user');
        localStorage.setItem('user', 'guest');
        window.open("login.html", "_self");
    };

    let editPost = (id) => {
        id = id.toString();
        xhr.open("PUT", "http://localhost:8080/posting", false);
        xhr.setRequestHeader("postEdit", JSON.stringify(postsList.get(id)));
        xhr.send();
        window.open("/addPost", "_self");
    };

    let like = (id) => {
        id = id.toString();
        let post = document.getElementById(id);
        let like = post.getElementsByClassName('like-btn')[0];
        if (like.style.background === 'url("../img/dog-icon-like.png")') {
            like.style.background = 'url("../img/dog-icon.png")';
            let tmp = postsList.get(id);
            let index = tmp.likes.indexOf(user);
            tmp.likes.splice(index, 1);
            localStorage.removeItem('posts');
            localStorage.setItem('posts', JSON.stringify(postsList.array));
        } else {
            like.style.background = 'url("../img/dog-icon-like.png")';
            let tmp = postsList.get(id);
            tmp.likes.push(user);
            localStorage.removeItem('posts');
            localStorage.setItem('posts', JSON.stringify(postsList.array));
        }
    };

    let posting = () => {
        if (user === 'guest')
            window.open("/login", "_self");
        else {
            window.open("/addPost", "_self");
        }
    };

    let search = () => {
        let arr = document.getElementsByClassName('search');
        let name = arr[0].value.trim();
        let date = arr[1].value.trim();
        let tag = arr[2].value.trim();
        if (!(name === '' && date === '' && tag === '')) {
            scriptModule.removeAll();
            date = date.split(/\D/);
            if (date.length > 1) {
                if (date[0].length === 1)
                    date[0] = '0' + date[0];
                if (date[1].length === 1)
                    date[1] = '0' + date[1];
            }
            tag = tag.split(/\s/);
            let tmpFilter = {
                author: name,
                createdAt: new Date(date[2] + '-' + date[1] + '-' + date[0]),
                hashtags: tag
            };
            filter = tmpFilter;
            currentPosts = postsList.getPage(0, 10, filter);
            currentPosts.forEach(function (item) {
                makePost(item.id);
            });
            let feed = document.getElementsByClassName("feed")[0];
            let tmp = document.createElement("div");
            tmp.classList.add("add-btn");
            tmp.onclick = function () {
                scriptModule.addMorePosts()
            };
            feed.appendChild(tmp);
        } else {
            filter = null;
            let feed = document.getElementsByClassName("feed")[0];
            feed.innerHTML = '';
            currentPosts = postsList.getPage();
            currentPosts.forEach(function (item) {
                makePost(item.id);
            });
            let tmp = document.createElement("div");
            tmp.classList.add("add-btn");
            tmp.onclick = function () {
                scriptModule.addMorePosts();
            };
            feed.appendChild(tmp);
        }
    };

    let pressTag = (name) => {
        document.getElementsByClassName('search')[0].value = '';
        document.getElementsByClassName('search')[1].value = '';
        document.getElementsByClassName('search')[2].value = name.toString();
        scriptModule.search();
    };

    return {
        firstOpen,
        removePhotoPost,
        addMorePosts,
        logOut,
        editPost,
        like,
        posting,
        search,
        removeAll,
        pressTag
    }
}());