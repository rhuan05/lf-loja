function mostraSearch(){
    document.querySelector('body').classList.toggle('mostrarSearch');
    document.getElementById('inputSearch').focus();
};

let larguraTela = window.screen.width;

if(larguraTela <= 532){
    let containersProdutos = document.querySelectorAll('.produto--flex');
    console.log(containersProdutos);

    for(let i=0; i<containersProdutos.length; i++){
        let widthContainer = containersProdutos[i].children.length * 200;
        containersProdutos[i].style.width = `${widthContainer}px`;
    };

    let containerProdutos = document.querySelectorAll('#maisvendidos .container--produto').length * 200;
    document.querySelector('#maisvendidos').style.width = containerProdutos + 'px';
};