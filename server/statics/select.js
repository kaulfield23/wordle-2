const selectLength = document.querySelector(".wordLength");
const selectType = document.querySelector(".wordType");
const sortButton = document.getElementById("sortBtn");

let wordLength = 3;
let wordType = "all";
let id;

if (localStorage.getItem("userId")) {
    id = localStorage.getItem("userId");
}
selectLength.addEventListener("change", (e) => {
    wordLength = e.target.value;
});

selectType.addEventListener("change", (e) => {
    wordType = e.target.value;
});

sortButton.addEventListener("click", (event) => {
    window.location.href = `/highscores/sorted?id=${id}&wordLength=${wordLength}&type=${wordType}`
});