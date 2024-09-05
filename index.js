let totalSum = 0; 

function handleFormSubmit(event) {
    event.preventDefault();

    const productDetails = {
        "SellingPrice": parseFloat(event.target.sellingPrice.value),
        "ProductName": event.target.productName.value
    }


    axios.post("https://crudcrud.com/api/b36a0fa06a284beab71e16566ac5605b/products", productDetails)
        .then((res) => {
            console.log(res);
            displayUser(res.data); 
            sum(res.data); 
        })
        .catch((err) => console.log(err));

    // Clear the input fields
    document.getElementById("productName").value = '';
    document.getElementById("sellingPrice").value = '';
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/b36a0fa06a284beab71e16566ac5605b/products")
        .then((res) => {
            const data = res.data;
            data.forEach((product) => {
                displayUser(product);
                sum(product); 
            });
        })
        .catch((err) => console.log(err));
});

function displayUser(product) {
    const ul = document.getElementById("list");
    const li = document.createElement("li");
    
    li.innerText = `${product.SellingPrice} - ${product.ProductName}`;

    // Create and append delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Delete";
    li.appendChild(deleteBtn);


    deleteBtn.addEventListener("click", function () {
        axios.delete(`https://crudcrud.com/api/b36a0fa06a284beab71e16566ac5605b/products/${product._id}`)
            .then(() => {
                ul.removeChild(li); 
                console.log(`Deleted product with ID: ${product._id}`);
                totalSum -= product.SellingPrice; 
                updateSum(); 
            })
            .catch((err) => console.log(err));
    });

    ul.appendChild(li);
}

function sum(product) {
    totalSum += product.SellingPrice; // Add the current product's price to the total sum
    updateSum(); // Update the sum display
}

function updateSum() {
    const para = document.getElementById("para");
    para.innerText = `Total Price: ${totalSum.toFixed(2)} $`; // Display the total sum with 2 decimal places
}
