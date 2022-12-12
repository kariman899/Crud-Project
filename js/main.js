let productNameInput = document.getElementById("productNameInput"); //input kolo
let productPriceInput = document.getElementById("productPriceInput"); //input kolo
let productCategoryInput = document.getElementById("productCategoryInput"); //input kolo
let productDescriptionInput = document.getElementById(
  "productDescriptionInput"
); //input kolo
let updateBtn = document.getElementById("updateBtn");
let addBtn = document.getElementById("addBtn");
let nameAlart=document.querySelector('.nameAlart')
let allError =document.querySelector('.allError')
let currentIndex = 0;
let productContainer;

if (localStorage.getItem("myProducts") != null) {
  productContainer = JSON.parse(localStorage.getItem("myProducts"));
  displayProduct(productContainer);
} else {
  productContainer = [];
}

function addProduct() {
  if(validateName()==true && productPriceInput.value!=="" &&productCategoryInput!="")
  {
    let product = {
      name: productNameInput.value,
      price: productPriceInput.value,
      category: productCategoryInput.value,
      description: productDescriptionInput.value,
    };
    productContainer.push(product);
    localStorage.setItem("myProducts", JSON.stringify(productContainer));
    displayProduct(productContainer);
    clearForm();
    allError.classList.replace('d-block','d-none')
    productNameInput.classList.remove('is-valid');
  }
  else {
    allError.classList.replace('d-none','d-block')
  }
 
}

function clearForm() {
  (productNameInput.value = ""),
    (productPriceInput.value = ""),
    (productCategoryInput.value = ""),
    (productDescriptionInput.value = "");
}

function displayProduct(productList) {
  let productsBox = ``;
  for (i = 0; i < productList.length; i++) {
    productsBox += ` <tr>
    <td>${i}</td>
    <td>${productList[i].name}</td>
    <td>${productList[i].price}</td>
    <td>${productList[i].category}</td>
    <td>${productList[i].description}</td>
    <td> <button onclick="setFormForUpdate(${i})" class="btn btn-sm btn-warning">Update</button> </td>

    <td> <button onclick="deleteProduct(${i})" class="btn btn-sm btn-danger" >Delete</button> </td>
</tr>`;
  }
  document.getElementById("tableBody").innerHTML = productsBox;
}

function searchProduct(searchTerm) {
  let searchResult = [];
  for (let i = 0; i < productContainer.length; i++) {
    if (
      productContainer[i].name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) == true
    ) {
      searchResult.push(productContainer[i]);
    }
  }
  displayProduct(searchResult);
}

function deleteProduct(deleteIndex) {
  productContainer.splice(deleteIndex, 1);
  localStorage.setItem("myProducts", JSON.stringify(productContainer));
  displayProduct(productContainer);
}

function setFormForUpdate(updateIndex) {
  currentIndex = updateIndex;
  productNameInput.value = productContainer[updateIndex].name;
  productPriceInput.value = productContainer[updateIndex].price;
  productCategoryInput.value = productContainer[updateIndex].category;
  productDescriptionInput.value = productContainer[updateIndex].description;
  updateBtn.classList.replace("d-none", "d-inline-block");
  addBtn.classList.add("d-none");
}

function updateProduct() {
  productContainer[currentIndex].name = productNameInput.value;
  productContainer[currentIndex].price = productPriceInput.value;
  productContainer[currentIndex].category = productCategoryInput.value;
  productContainer[currentIndex].description = productDescriptionInput.value;
  localStorage.setItem("myProducts", JSON.stringify(productContainer));
  displayProduct(productContainer);
  clearForm();
  updateBtn.classList.replace("d-inline-block", "d-none");
  addBtn.classList.remove("d-none");
}

function validateName(){
  var regaxName=/^[a-zA-Z]{2,8}$/;
  if(regaxName.test(productNameInput.value)==true){
    
    productNameInput.classList.replace('is-invalid','is-valid')
    productNameInput.classList.remove('is-invalid');
    nameAlart.classList.replace('d-block','d-none')


    return true
  }
  else if(productNameInput.value==""){
    productNameInput.classList.remove('is-invalid','is-valid');
    // productNameInput.classList.remove('is-valid')
    nameAlart.classList.replace('d-block','d-none')

  }
  else {
    productNameInput.classList.add('is-invalid')
    nameAlart.classList.replace('d-none','d-block')
    return false

  }
}