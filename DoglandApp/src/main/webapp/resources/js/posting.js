let scriptPosting = (function () {

    let user = "USER";

    let editPost = null;

    const xhr = new XMLHttpRequest();

    let firstScript;
    firstScript = () => {
        let realBTN = document.getElementById('real-btn');
        let customBTN = document.getElementById('custom-btn');
        let customText = document.getElementById('custom-text');
        let name = document.getElementById('username');

        if (user === 'guest') {
            window.open("/error", "_self");
        } else {
            name.innerText = user;
        }

        xhr.open("GET", "http://localhost:8080/posting", false);
        xhr.send();
        let tmp = xhr.responseText;


        if (!(tmp.length !== 0)) {
            tmp = JSON.parse(tmp);
            let preview = document.getElementById("preview");
            let img = document.createElement("img");
            img.classList = "img";
            img.src = tmp.photoLink;
            preview.appendChild(img);
            customText.innerHTML = "old photo";
            document.getElementById('tags').value = tmp.hashtags.join(" ");
            document.getElementById('description').value = tmp.description;
        }

        customBTN.addEventListener("click", function () {
            realBTN.click();
        });

        realBTN.addEventListener("change", function () {
            if (realBTN.value) {
                xhr.open("POST", "http://localhost:8080/posting", false);

                let preview = document.getElementById("preview");
                customText.innerHTML = realBTN.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
                let img = document.createElement("img");
                let src = xhr.responseText;
                let tmp = document.getElementsByClassName('img')[0];
                xhr.send();
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
                if (!(img === undefined))
                    img.remove();
            }
        });

        xhr.abort();

        editPost = tmp;
    };

    let logOut = () => {
        localStorage.removeItem('user');
        localStorage.setItem('user', 'guest');
        window.open("/login", "_self");
    };

    let tryPost = () => {
        alert('here');
        let id;
        if (editPost === null)
            id = "0";
        else
            id = editPost.id;
        let customText = document.getElementById('custom-text');
        let link = customText.innerHTML;
        if (link === "No file chosen, yet")
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
        if (PostsList.validate(post)) {
            alert('here');

            xhr.open("POST", "http://localhost:8080/posting", false);

            xhr.setRequestHeader("post", JSON.stringify(post));

            if (editPost === null)
                xhr.setRequestHeader("edit", "false");
            else
                xhr.setRequestHeader("edit", "true");

            xhr.send();

            if (xhr.status !== 200)
                window.open("/error", "_self");
            else
                window.open("/", "_self");
        } else
            alert('post is not validate');
    };

    return {
        firstScript,
        logOut,
        tryPost,
    }
}());