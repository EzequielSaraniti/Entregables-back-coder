const formProducts = document.getElementById("form-products");
const inputTitle = document.getElementById("form-title");
const inputPrice = document.getElementById("form-price");
const inputThumbnail = document.getElementById("form-thumbnail");


// Sending new product to server
formProducts.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!inputTitle.value == "" && !inputPrice.value == "" && !inputThumbnail.value == "") {
        const newProduct = {
            title: inputTitle.value,
            price: +(inputPrice.value),
            thumbnails: inputThumbnail.value
        };
        socket.emit("newProduct", newProduct);
        inputTitle.value = "";
        inputPrice.value = "";
        inputThumbnail.value = "";
    } else {
        alert("Completa los datos del formulario, por favor")
    }
});
// Listening for new product
socket.on("newProduct", (product) => {
    console.log(product)
    const newProduct = `
    <div class="card" style="width: 18rem;">
        <img src=${product.thumbnails} class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">${product.price}</p>
          <a href="#" class="btn btn-primary">Add to cart</a>
        </div>
      </div>
    `;
    document.getElementById("products").innerHTML += newProduct;
});
