const urlApi = 'https://dummyjson.com/products'
const containerProduto = document.querySelector('.container-produto')

async function colocandoProdutos(){
    const response = await fetch (urlApi)
    const httpDeValidacao = 200

    if (response.status === httpDeValidacao){
        const obj = await response.json()
        console.log(obj.products);

        obj.products.forEach((produtos) =>{
            containerProduto.innerHTML += `
                            
                            <div class="container-produto">
                            <div class="image-produto">
                                <img src="${produtos.images[0]}" alt="${produtos.title}">
                            </div>
                            <div class="container-descricao-produto">
                                <p class="id-produto">${produtos.category}</p>
                                <h1 class="nome-produto">${produtos.title}</h1>
                                <p class="descricao-produto">${produtos.description}</p>
                                <div class="preco-produto">
                                    <h2 class="preco-descontado">$ ${produtos.discountPercentage} </h2>
                                    <p class="preco-antes">$ ${produtos.price}</p>
                                </div>
                                    <button class="btn-cart">
                                    <img src="./src/images/icon-cart.svg" alt="icone carrinho">
                                    Add to Cart</button>
                            </div>
                            </div>            
            `
        })
    }
}

colocandoProdutos()