function handleFormSubmit(event) {
    event.preventDefault();

    const productDetails = {
        "SellingPrice": event.target.sellingPrice.value,
        "ProductName" : event.target.productName.value
    }
    axios.post("https://crudcrud.com/api/08bae0ecc2a3433eaf0bd44abca4ac68/products",productDetails)
        .then((res)=>console.log(res))
        .catch((err)=>console.log(err))

    // Clearing the input fields
    document.getElementById("productName").value = null;
    document.getElementById("sellingPrice").value =null;
}

window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/08bae0ecc2a3433eaf0bd44abca4ac68/products)
    .then((res)=>{
        let data = res.data
        for(let i = 0 ; i < data.length ; i++){
            displayUser(data[i])
        }
    })
    .catch((err)=>console.log(err))
})

function displayUser(product){
    
    const ul = document.createElement("ul");
    const li = document.createElement("ul");
    userItem.append
    
}