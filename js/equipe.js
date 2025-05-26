document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.querySelector(".canvas-valentin");
    const context = canvas.getContext("2d");
  
    // Remplir d'un calque gris à gratter
    context.fillStyle = "gray";
    context.fillRect(0, 0, canvas.width, canvas.height);

    function effacer(x, y) {
        context.globalCompositeOperation = "destination-out"; // pour effacer 
        context.beginPath(); // debut du dessin 
        context.arc(x, y, 20, 0, Math.PI * 2); // cercle de rayon 20
        context.fill(); // remplir de l'effacement
        context.globalCompositeOperation = "source-over";
    };
    
    
    // Grattage à la souris
    canvas.addEventListener("mousemove", (e) =>{
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        effacer(x, y);
    });

});

