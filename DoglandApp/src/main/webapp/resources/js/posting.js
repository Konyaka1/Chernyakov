let scriptPosting = (function () {

    let user;

    let editPost = null;

    const xhr = new XMLHttpRequest();

    let linkPhoto = '';

    let firstScript;
    firstScript = () => {

        xhr.open("GET", "http://localhost:8080/session", false);
        xhr.send();

        user = xhr.responseText;

        let realBTN = document.getElementById('real-btn');
        let customBTN = document.getElementById('custom-btn');
        let name = document.getElementById('username');

        if (user === 'guest') {
            window.open("/error", "_self");
        } else {
            name.innerText = user;
        }

        xhr.open("GET", "http://localhost:8080/posting", false);
        xhr.send();
        let tmp = xhr.responseText;

        if (tmp.length !== 1) {
            tmp = JSON.parse(tmp);
            editPost = tmp;
            let preview = document.getElementById("preview");
            let img = document.createElement("img");
            img.classList = "img";
            linkPhoto = tmp.photoLink;
            img.src = tmp.photoLink;
            preview.appendChild(img);
            document.getElementById('tags').value = tmp.hashtags.join(" ");
            document.getElementById('description').value = tmp.description;
        }else
            editPost = false;

        customBTN.addEventListener("click", function () {
            realBTN.click();
        });

        realBTN.addEventListener("change", function () {
            if (realBTN.value) {
                xhr.open("POST", "http://localhost:8080/posting", false);
                let asd = new FormData();
                asd.append("fileName", realBTN.files[0]);
                xhr.send(asd);
                if (xhr.status !== 200)
                    window.open("/error");
                let preview = document.getElementById("preview");
                let img = document.createElement("img");
                let src = xhr.responseText;
                linkPhoto = src;
                let tmp = document.getElementsByClassName('img')[0];
                if (!(tmp === undefined))
                    tmp.remove();
                if (!(src === undefined)) {
                    img.classList = "img";
                    img.src = src;
                    preview.appendChild(img);
                }
            } else {
                linkPhoto = "";
                let img = document.getElementsByClassName('img')[0];
                if (!(img === undefined))
                    img.remove();
            }
        });

        editPost = tmp;
    };

    let logOut = () => {
        window.open("/login", "_self");
    };

    let tryPost = () => {
        let id;
        if (editPost == false)
            id = "0";
        else
            id = editPost.id;
        let link = linkPhoto;
        if (link === "")
            link = '';
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

        xhr.open("PUT", "http://localhost:8080/addPost", false);

        xhr.setRequestHeader("post", JSON.stringify(post));

        if (editPost == false)
            xhr.setRequestHeader("edit", "false");
        else
            xhr.setRequestHeader("edit", "true");

        xhr.send();
    };

    return {
        firstScript,
        logOut,
        tryPost,
    }
}());