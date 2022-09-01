const loadPhones = async (searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data);
}

const displayPhones = phones => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.innerText = '';
    // display first 20 phones only.
    phones = phones.slice(0, 20);
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
            <div class="card">
               <img src="${phone.image}" class="card-img-top p-4" alt="...">
                 <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <h6 class="card-title">BRAND: ${phone.brand}</h6>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.This content is a little bit longer.</p>
                 </div>
            </div>
        `;
        phonesContainer.appendChild(phoneDiv);

    })
}


document.getElementById('btn-search').addEventListener('click', function () {
    const searchField = document.getElementById('input-field');
    const searchText = searchField.value;
    loadPhones(searchText);

})

loadPhones();