function login() {
    const name = document.querySelector("#name");
    localStorage.setItem("username", name.value);
    window.location.href = "play.html";
}