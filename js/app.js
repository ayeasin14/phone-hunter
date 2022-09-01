const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.innerText = '';
    // display first 20 phones only.
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }


    // display no phone found.
    const noPhone = document.getElementById('no-found-message');
    if (phones.length === 0) {
        noPhone.classList.remove('d-none');
    }
    else {
        noPhone.classList.add('d-none');
    }

    // display all phones.
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
                    <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>                    
                 </div>
            </div>
        `;
        phonesContainer.appendChild(phoneDiv);

    });
    // Stop loader
    toggleSpinner(false);
}


const processSearch = (dataLimit) => {
    // start loader
    toggleSpinner(true);
    const searchField = document.getElementById('input-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
}



// handle search button clicked
document.getElementById('btn-search').addEventListener('click', function () {
    // start loader
    processSearch(10);

})


// search field enter button clicked.

document.getElementById('input-field').addEventListener('keypress', function (e) {
    console.log(e.key)
    if (e.key === 'Enter') {
        processSearch(10);
    }

})

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
}


// not the best way for show all element

document.getElementById('btn-show-all').addEventListener('click', function () {

    processSearch();

})



const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);

}


const displayPhoneDetails = phone => {
    console.log(phone);
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = phone.name;

    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
    <p> Release Date: ${phone.releaseDate ? phone.releaseDate : 'No release Date found'}</p>
    <p> Others/Bluetooth: ${phone.others ? phone.others.Bluetooth : 'No others Date found'}</p>
    <p> DisplaySize: ${phone.mainFeatures ? phone.mainFeatures.displaySize : 'No displaySize Date found'}</p>
    <p> Memory: ${phone.mainFeatures ? phone.mainFeatures.memory : 'No memory Date found'}</p>
    <p> ChipSet: ${phone.mainFeatures ? phone.mainFeatures.chipSet : 'No chipSet Date found'}</p>
    `
}

loadPhones('apple');