function Menu(x, y) {
    $("#" + x).click(() => {
        DesativaNavs();
        Sections();  
        $("." + y).css('display', 'block');
        AtivaNav(x);
    })
};

function Sections() {
    $('section').css('display', 'none');
};

function AtivaNav(x){
    $("#" + x).removeAttr("class");
    $("#" + x).attr("class", "nav-link active");
};

function DesativaNavs() {
    $("#menu-home").removeAttr("class");
    $("#menu-home").attr("class", "nav-link");

    $("#menu-cad-cliente").removeAttr("class");
    $("#menu-cad-cliente").attr("class", "nav-link");

    $("#menu-lista-cli").removeAttr("class");
    $("#menu-lista-cli").attr("class", "nav-link");

    $("#menu-cad-avalia").removeAttr("class");
    $("#menu-cad-avalia").attr("class", "nav-link");

    $("#menu-lista-avalia").removeAttr("class");
    $("#menu-lista-avalia").attr("class", "nav-link");
};