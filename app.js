// las tarjetas
const mainCards = document.getElementById("MainCards");
const selectProducts = document.getElementById("select-products");

//ventana de creacion de producto
const newProductButton = document.getElementById("NewProductButton");
const createCardWindow = document.getElementById("createCardContainer");
const closeButton = document.getElementById("CloseButton");

// cart renderer
const openCartButton = document.getElementById("OpenCartButton");
const MainCartContainer = document.getElementById("MainCartContainer");
const cartContainer = document.getElementById("CartContainer")
const closeCartButton = document.getElementById("CloseCartButton");

// inputs de creacion de producto
const crPrName = document.getElementById("CrPrName");
const crPrPrice = document.getElementById("CrPrPrice");
const crPrImg = document.getElementById("CrPrImg");
const crPrbutton = document.getElementById("CrPrbutton");

// eventos
// evento para listar los productos disponibles en el apartado principal
window.addEventListener('load', listSelect);


// evento de la ventana de creacion de producto
newProductButton.addEventListener('click',RenderCreationWindow);

// evento del boton para abrir el carrito
openCartButton.addEventListener('click',renderCart);





// le pasa la informacion del arreglo a la funcion de creacion de tarjetas.
function renderCards(option) {  
  // la cagada de select
  fruits.map(element => {
    if (element.product == option){
      createMainCards(element,cartContainer);
    }
  });
  
}

// se crea el elemento hijo "option" al contenedor padre "select", haciendo uso de "appendChild"
function listSelect() {

  // cards rendererizadas en el apartado principal
  mainCards.innerHTML="";
  fruits.map(element=> {
    createMainCards(element,mainCards);
  });

}

// creacion de las tarjetas
function createMainCards(fruitts,mainContainer) {
  const {product, image,id,price} = fruitts;

  // se crea la tarjeta padre y se ingresa en el contenedor padre (el contenedor del carrito)
  const card = document.createElement('div');
  card.classList.add('card-product');
  //le pasa el contenedor de las tarjetas al contenedor del carrito
  mainContainer.appendChild(card);

// contenedores en donde irá el contenido (imagen, nombre, precio, etc)

  // boton para eliminar la card
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('btn-delete');
  card.appendChild(deleteButton);
  deleteButton.textContent = "X";

  deleteButton.addEventListener("click", element => {
    deleteButton.parentElement.remove(card);
  });

  const img = document.createElement('img');
  img.classList.add('img-product');
  card.appendChild(img);
  img.setAttribute('src',image);
  img.setAttribute('alt',product);

  const name = document.createElement('div');
  name.classList.add('name-product');
  card.appendChild(name);

  name.textContent =product;

  const prrice = document.createElement('div');
  prrice.classList.add('price-product');
  card.appendChild(prrice);
  prrice.textContent = price;

  const idProduct = document.createElement('p');
  idProduct.classList.add('idProduct');
  card.appendChild(idProduct);
  idProduct.textContent = "id: "+id;

  const buyButton = document.createElement('button');
  buyButton.classList.add('btn-add');
  card.appendChild(buyButton);
  buyButton.setAttribute('alt',product);
  buyButton.textContent = "Add to Cart";

  //variable que le pasa el "alt" del boton
  const buyButtonAlt = buyButton.getAttribute('alt')

  // el evento que agrega los elementos a la vista del carrito
  buyButton.addEventListener('click', element=>{
    renderCards(buyButtonAlt);
  });
  

}

// para importar la imagen
let imageUploaded = " ";
function importImg(event){
  const current_img = event.files[0];
  const objectUrl = URL.createObjectURL(current_img);
  imageUploaded = objectUrl;
}
// creará el nuevo objeto con los datos ingresados y esta agregará el nuevo objeto con el producto al arreglo.
function createNewProduct(){
  // creacion del objeto y la insercion de los datos en el mismo
  const newObject = {};
  newObject.id=fruits.length +1;
  newObject.product = crPrName.value;
  newObject.price = crPrPrice.value;
  importImg(crPrImg);
  newObject.image = imageUploaded;
  newObject.quantity = 1;

  // se ingresa el objeto creado al arreglo 
  fruits.push(newObject);

  // actualiza la lista de productos "select"
  listSelect();

  // cierra la ventana de creacion de producto
  createCardWindow.style.display = "none";

  // impresion del arreglo fruits.
  console.log(fruits);
}


// este visualiza la ventana de creacion de producto.
function RenderCreationWindow(){
  createCardWindow.style.display = "flex";
  closeButton.addEventListener("click",element =>{
    createCardWindow.style.display = "none";
  });
  crPrbutton.addEventListener('click',createNewProduct);
}

// funcion del carrito de compras
function renderCart(){
  MainCartContainer.style.display = "flex";
  // evento para cerrar el carrito
  closeCartButton.addEventListener('click',event=>{
  MainCartContainer.style.display = "none";
  });
}










