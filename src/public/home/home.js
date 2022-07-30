function mostraSearch(){
    document.querySelector('body').classList.toggle('mostrarSearch');
    document.getElementById('inputSearch').focus();
};

let larguraTela = window.screen.width;

if(larguraTela <= 532){
    let containersProdutos = document.querySelectorAll('.produto--flex');

    for(let i=0; i<containersProdutos.length; i++){
        let widthContainer = containersProdutos[i].children.length * 200;
        containersProdutos[i].style.width = `${widthContainer}px`;
    };

    let containerProdutos = document.querySelectorAll('#maisvendidos .container--produto').length * 200;
    document.querySelector('#maisvendidos').style.width = containerProdutos + 'px';
};

let imgsBanner = document.querySelectorAll('.imgBanner').length;

if(imgsBanner > 1){
    let circleIcon = document.querySelectorAll('.fa-circle');
    let marginBanner = 0;

    circleIcon.forEach((e)=>{
        e.setAttribute('id', marginBanner);
        marginBanner = marginBanner - 100;
        e.addEventListener('click', mexerBanner);
    });

    function mexerBanner(element){
        let moveBanner = Number(element.target.id);

        document.querySelector('.overflow--banner').style.marginLeft = `${moveBanner}vw`;
        circleIcon.forEach(e => e.style.opacity = '.5');
        element.target.style.opacity = '1';
    };
};