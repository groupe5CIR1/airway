function noCopy() {
    console.log("“Toute édition d'écrits, de composition musicale, de dessin […] imprimée ou gravée en entier ou en partie au mépris des lois et règlements relatifs à la propriété des auteurs est une contrefaçon et un délit […]” Art. L335-2 du Code de la propriété intellectuelle.")
};

function equipe(){
    const conf = confirm("Souhaitez-vous continuer ?");
    if (conf == true) {
        open("equipe.html");
        
    };
};