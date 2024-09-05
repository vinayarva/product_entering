let totalSum = 0; // Variable to store the total sum of all product prices

function handleFormSubmit(event) {
    event.preventDefault();

    const productDetails = {
        "SellingPrice": parseFloat(event.target.sellingPrice.value), // Parse the input as a float for correct summation
        "ProductName": event.target.productName.value
    }

    // Post the product details to the server
    axios.post("https://crudcrud.com/api/b36a0fa06a284beab71e16566ac5605b/products", productDetails)
        .then((res) => {
            console.log(res);
            displayUser(res.data); // Display the newly added product
            sum(res.data); // Update the total sum with the new product's price
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
                sum(product); // Add each product's price to the total sum
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

    // Add delete event listener
    deleteBtn.addEventListener("click", function () {
        axios.delete(`https://crudcrud.com/api/b36a0fa06a284beab71e16566ac5605b/products/${product._id}`)
            .then(() => {
                ul.removeChild(li); // Remove the entire list item (li) from the ul
                console.log(`Deleted product with ID: ${product._id}`);
                totalSum -= product.SellingPrice; // Subtract the deleted product price from total sum
                updateSum(); // Update the sum display
            })
            .catch((err) => console.log(err));
    });

    ul.appendChild(li);
}

// Function to sum up all product prices
function sum(product) {
    totalSum += product.SellingPrice; // Add the current product's price to the total sum
    updateSum(); // Update the sum display
}

// Function to update the total sum display
function updateSum() {
    const para = document.getElementById("para");
    para.innerText = `Total Price: ${totalSum.toFixed(2)} $`; // Display the total sum with 2 decimal places
}
