const image = document.querySelector(".fleche_haut");

image.addEventListener("click", function() {
    window.scrollTo({ top: 0, behavior: "smooth" });
});
