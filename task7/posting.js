let scriptPosting = (function () {

    let user = localStorage.getItem('user');

    let editPost = null;

    let firstScript = () => {
        let realBTN = document.getElementById('real-btn');
        let customBTN = document.getElementById('custom-btn');
        let customText = document.getElementById('custom-text');
        let name = document.getElementById('username');

        if (user === 'guest') {
            window.open("error.html", "_self");
        } else {
            name.innerText = user;
        }

        let tmp = localStorage.getItem('editPost');
        if (!(tmp === null)) {
            tmp = JSON.parse(tmp);
            let preview = document.getElementById("preview");
            let img = document.createElement("img");
            img.classList = "img";
            img.src = tmp.photoLink;
            preview.appendChild(img);
            customText.innerHTML = tmp.photoLink;
            document.getElementById('tags').value = tmp.hashtags.join(" ");
            document.getElementById('description').value = tmp.description;
        }

        customBTN.addEventListener("click", function () {
            realBTN.click();
        });

        realBTN.addEventListener("change", function () {
            if (realBTN.value) {
                let preview = document.getElementById("preview");
                customText.innerHTML = realBTN.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
                let img = document.createElement("img");
                let src = customText.innerHTML;
                let tmp = document.getElementsByClassName('img')[0];
                if (!(tmp === undefined))
                    tmp.remove();
                if (!(src === undefined)) {
                    img.classList = "img";
                    img.src = src;
                    preview.appendChild(img);
                }
            } else {
                customText.innerHTML = "No file chosen, yet";
                let img = document.getElementsByClassName('img')[0];
                if (!(img===undefined))
                    img.remove();
            }
        });

        editPost = tmp;
    };

    let logOut = () => {
        localStorage.removeItem('user');
        localStorage.setItem('user', 'guest');
        window.open("login.html", "_self");
    };

    let tryPost = () => {
        let posts = new PostsList(JSON.parse(localStorage.getItem('posts')));
        let id;
        let customText = document.getElementById('custom-text');
        let link = customText.innerHTML;
        if (link === "No file chosen, yet")
            link = '';
        if (editPost === null)
            id = (posts.array.length + 1).toString();
        else
            id = editPost.id;
        let tags = document.getElementById('tags').value.trim().split(/\s+/);
        if (tags[0] === '')
            tags = [];
        let post = {
            id: id,
            description: document.getElementById('description').value.trim(),
            createdAt: new Date(Date()),
            author: user,
            photoLink: link,
            hashtags: tags,
            likes: []
        };
        if (PostsList.validate(post)) {
            localStorage.removeItem('posts');
            if (!(editPost === null))
                posts.remove(id);
            posts.add(post);
            localStorage.removeItem('editPost');
            localStorage.setItem('posts', JSON.stringify(posts.array));
            window.open("index.html", "_self");
        } else
            alert('post is not validate');
    };

    return {
        firstScript,
        logOut,
        tryPost,
    }
}());