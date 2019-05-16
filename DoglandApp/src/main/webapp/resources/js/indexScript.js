scriptModule = (function () {

    const xhr = new XMLHttpRequest();

    let postsList;

    let user;

    let filter = {
        user: "",
        date: "",
        tags: ""
    };

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

        xhr.open("GET", "http://localhost:8080/session", false);
        xhr.send();

        user = xhr.responseText;

        if (user === 'guest') {
            document.getElementById('auth-btn').hidden = false;
        } else
            logIn(user);

        xhr.open("GET", "http://localhost:8080/getPosts", false);

        xhr.send();

        let answer = xhr.responseText.substr(9);

        postsList = new PostsList(JSON.parse(answer.substr(0, answer.length - 2)));

        postsList.array.forEach(function (item) {
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

        postsList.remove(id);

        let tmp = document.getElementById(id);
        tmp.remove();
    };

    let removeAll = () => {
        let tmp = document.getElementsByClassName('feed')[0];
        while (tmp.lastChild)
            tmp.lastChild.remove();
    };

    let addMorePosts = () => {
        let tmp = document.getElementsByClassName('feed')[0];
        tmp.lastChild.remove();

        xhr.open("GET", "http://localhost:8080/getPosts", false);
        xhr.setRequestHeader("oldSize", postsList.getArray().length);
        if (filter.date.length > 1)
            xhr.setRequestHeader("createdAt", filter.date);
        if (filter.user.length > 1)
            xhr.setRequestHeader("user", filter.user);
        if (filter.tags.length > 1)
            xhr.setRequestHeader("tags", filter.tags);
        xhr.send();

        if (xhr.status !== 200)
            window.open("/error", "_self");

        let answer = xhr.responseText.substr(9);

        let newPosts = JSON.parse(answer.substr(0, answer.length - 2));
        newPosts.forEach(function (item) {
            postsList.add(item);
            makePost(item.id);
        });

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
        xhr.open("DELETE", "http://localhost:8080/session", false);
        xhr.send();
        window.open("/login", "_self");
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
        if (like.style.background === 'url("/resources/img/dog-icon-like.png")') {
            xhr.open("PUT", "http://localhost:8080/like", false);
            xhr.setRequestHeader("id", id);
            xhr.setRequestHeader("user", user);
            xhr.send();
            like.style.background = 'url("/resources/img/dog-icon.png")';
            let tmp = postsList.get(id);
            let index = tmp.likes.indexOf(user);
            tmp.likes.splice(index, 1);
        } else {
            xhr.open("PUT", "http://localhost:8080/like", false);
            xhr.setRequestHeader("id", id);
            xhr.setRequestHeader("user", user);
            xhr.send();
            like.style.background = 'url("/resources/img/dog-icon-like.png")';
            let tmp = postsList.get(id);
            tmp.likes.push(user);
        }
    };

    let posting = () => {
        if (user === 'guest')
            window.open("/login", "_self");
        else {
            window.open("/addPost", "_self");
        }
    };

    let pressTag = (name) => {
        document.getElementsByClassName('search')[0].value = '';
        document.getElementsByClassName('search')[1].value = '';
        document.getElementsByClassName('search')[2].value = name.toString();
        filter.user = "";
        filter.date = "";
        filter.tags = name.toString();
        document.getElementsByClassName('search-btn')[0].click();
    };

    let search = () => {
        let arr = document.getElementsByClassName('search');
        filter.user = arr[0].value.trim();
        filter.date = arr[1].value.trim();
        filter.tags = arr[2].value.trim();
        scriptModule.removeAll();
        postsList.removeAll();
        if (filter.user.length > 1 || filter.date.length > 1 || filter.tags.length > 1) {

            xhr.open("GET", "http://localhost:8080/getPosts", false);
            if (filter.date.length > 1)
                xhr.setRequestHeader("createdAt", filter.date.toString());
            if (filter.user.length > 1)
                xhr.setRequestHeader("user", filter.user.toString());
            if (filter.tags.length > 1)
                xhr.setRequestHeader("tags", filter.tags.toString());
            xhr.send();

            if (xhr.status !== 200)
                window.open("/error", "_self");

            let answer = xhr.responseText.substr(9);

            let newPosts = JSON.parse(answer.substr(0, answer.length - 2));
            newPosts.forEach(function (item) {
                postsList.add(item);
                makePost(item.id);
            });

            let btn = document.createElement("div");
            btn.classList.add("add-btn");
            btn.onclick = function () {
                scriptModule.addMorePosts()
            };
            let feed = document.getElementsByClassName("feed")[0];
            feed.appendChild(btn);
        } else {
            xhr.open("GET", "http://localhost:8080/getPosts", false);

            xhr.send();

            let answer = xhr.responseText.substr(9);

            postsList = new PostsList(JSON.parse(answer.substr(0, answer.length - 2)));

            postsList.array.forEach(function (item) {
                makePost(item.id);
            });

            let feed = document.getElementsByClassName("feed")[0];
            let tmp = document.createElement("div");
            tmp.classList.add("add-btn");
            tmp.onclick = function () {
                scriptModule.addMorePosts()
            };
            feed.appendChild(tmp);
        }
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