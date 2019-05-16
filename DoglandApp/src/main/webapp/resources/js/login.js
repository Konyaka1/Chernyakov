loginModule = (function () {

    const xhr = new XMLHttpRequest();

    let check = () => {
        xhr.open("GET", "http://localhost:8080/session", false);
        xhr.send();
        let answer = xhr.responseText;
        if (answer !== 'guest')
            window.open("/error", "_self");
    };

    return {
        check
    }
}());