let fileira = document.querySelector('.fileiras');
let produtos = document.querySelectorAll('.fileira--elemento');

fileira.style.width = `${produtos.length * 192}px`;

// Fileira

let btnNovaFileira = document.querySelector('.btnNovaFileira');

btnNovaFileira.addEventListener('click', ()=>{
    document.querySelector('body').classList.toggle('ativarModelFileira');
});

let fecharModeloFileira = document.querySelector('.fecharModeloFileira');

fecharModeloFileira.addEventListener('click', ()=>{
    document.querySelector('body').classList = '';
});

// Produto

let btnNovoProduto = document.querySelector('.btnNovoProduto');

btnNovoProduto.addEventListener('click', ()=>{
    document.querySelector('body').classList.toggle('ativarModelProduto');
});

let fecharModeloProduto = document.querySelector('.fecharModeloProduto');

fecharModeloProduto.addEventListener('click', ()=>{
    document.querySelector('body').classList = '';
});

// Excluir fileira

let btnMostrarAlerta = document.querySelectorAll('.btnMostrarAlerta');

btnMostrarAlerta.forEach((e)=>{
    e.addEventListener('click', ()=>{
        let form = e.parentNode;
        let formChilds = form.childNodes[3];
        formChilds.style.display = 'block';
    });
});

let cancelarExcluir = document.querySelectorAll('.cancelarExcluir');

cancelarExcluir.forEach((e)=>{
    e.addEventListener('click', ()=>{
        let forDisplayNone = e.parentNode;
        forDisplayNone.style.display = 'none';
    });
});

// Editar produto

let tdIconEdit = document.querySelectorAll('.tdIconEdit');

tdIconEdit.forEach((e)=>{
    e.addEventListener('click', ()=>{
        let td = e.parentNode;
        let tbody = td.parentNode;
        let table = tbody.parentNode;
        let divOverflow = table.parentNode;
        let model = divOverflow.childNodes[1];
        model.style.display = 'flex';

        let tr = e.parentNode;
        let trChilds = tr.children;

        let form = document.querySelector('.model-editarProduto');
        let formChilds = form.children;
        formChilds[2].innerText = `Nome Atual: ${trChilds[0].innerHTML}`;
        formChilds[5].innerText = `Preço atual: ${trChilds[1].innerHTML}`;

        document.getElementById('idProdutoInput').setAttribute('value', trChilds[3].innerHTML);
    });
});

let fecharEditarProduto = document.querySelectorAll('.fecharEditarProduto');

fecharEditarProduto.forEach((e)=>{
    e.addEventListener('click', ()=>{
        let model = e.parentNode;
        model.style.display = 'none'
    });
});