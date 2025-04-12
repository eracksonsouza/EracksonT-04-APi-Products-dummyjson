const urlApi = 'https://dummyjson.com/products'
const containerProduto = document.querySelector('.container-produto')
let cartItems = [] 

async function colocandoProdutos(){
    const response = await fetch(urlApi)
    const httpDeValidacao = 200

    if (response.status === httpDeValidacao){
        const obj = await response.json()
        
        obj.products.forEach((produtos) =>{
            const precoComDesconto = produtos.price - (produtos.price * (produtos.discountPercentage / 100))
            
            containerProduto.innerHTML += `
                <div class="produto-item">
                    <div class="image-produto">
                        <img src="${produtos.images[0]}" alt="${produtos.title}">
                    </div>
                    <div class="container-descricao-produto">
                        <p class="id-produto">${produtos.category}</p>
                        <h1 class="nome-produto">${produtos.title}</h1>
                        <p class="descricao-produto">${produtos.description}</p>
                        <div class="preco-produto">
                            <h2 class="preco-descontado">$ ${precoComDesconto.toFixed(2)}</h2>
                            <p class="preco-antes">$ ${produtos.price.toFixed(2)}</p>
                        </div>
                        <button class="btn-cart" onclick="addToCart(${produtos.id}, '${produtos.title}', ${precoComDesconto})">
                            <img src="./src/images/icon-cart.svg" alt="icone carrinho">
                            Add to Cart
                        </button>
                    </div>
                </div>            
            `
        })
    }
}

function addToCart(id, title, price) {
    const item = {
        id: id,
        title: title,
        price: price,
        quantity: 1
    }

    const existingItem = cartItems.find(cartItem => cartItem.id === id)
    
    if (existingItem) {
        existingItem.quantity++
    } else {
        cartItems.push(item)
    }

    updateCartDisplay()
    showNotification('Item adicionado ao carrinho!')
}

function toggleCart() {
    const cartModal = document.getElementById('cart-modal')
    cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block'
    updateCartDisplay()
}

function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count')
    const cartItemsContainer = document.getElementById('cart-items')
    const cartTotalPrice = document.getElementById('cart-total-price')
    
    if (cartCount) {
        const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)
        cartCount.textContent = totalItems
    }
    
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = cartItems.map(item => `
            <div class="cart-item">
                <div>
                    <h3>${item.title}</h3>
                    <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                </div>
                <button onclick="removeFromCart(${item.id})">Remover</button>
            </div>
        `).join('')
    }
    
    if (cartTotalPrice) {
        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        cartTotalPrice.textContent = `$${total.toFixed(2)}`
    }
}

function removeFromCart(id) {
    const index = cartItems.findIndex(item => item.id === id)
    if (index > -1) {
        cartItems.splice(index, 1)
        updateCartDisplay()
        showNotification('Item removido do carrinho!')
    }
}

function checkout() {
    if (cartItems.length === 0) {
        showNotification('Seu carrinho está vazio!')
        return
    }
    
    showNotification('Compra finalizada com sucesso!')
    cartItems = []
    updateCartDisplay()
    toggleCart()
}

function showNotification(message) {
    const notification = document.createElement('div')
    notification.className = 'notification'
    notification.textContent = message
    document.body.appendChild(notification)

    setTimeout(() => {
        notification.remove()
    }, 2000)
}

colocandoProdutos()