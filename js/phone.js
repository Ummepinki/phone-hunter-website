document.getElementById('error-message').style.display = 'none';
const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    document.getElementById('spinner').style.display = 'none';
    const searchText = searchField.value;

    // clear data
    searchField.value = '';
    document.getElementById('error-message').style.display = 'none';


    //load data
    const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    // console.log(url);

    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.data))
        .catch(error => displayError(error));
    //spinner
    if (data.data == null) {
        document.getElementById('spinner').style.display = 'block';
    } else {
        displaySearchResult(data.data);
        document.getElementById('spinner').style.display = 'none';
    }


}

const displayError = error => {
    document.getElementById('error-message').style.display = 'block';
}
const displaySearchResult = data => {
    // console.log(data);
    data = data.slice(0, 20);
    const searchResult = document.getElementById('search-result');
    data.forEach(data => {
        //console.log(data);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
               <div class="card h-100">
                   <img class="w-50" src="${data.image}" class="card-img-top" alt="...">
                   <div class="card-body">
                      <h5 class="card-title">${data.phone_name}</h5>
                      <p class="card-text">${data.brand}</p>
                      <button onclick="details('${data.slug}')" class="btn btn-outline-success">Details</button>
                      
                 </div>
           </div>
          
       `;
        searchResult.appendChild(div);

    })

}
// load details data
const details = (id) => {
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetail(data.data));
}
const displayPhoneDetail = data => {
    console.log(data);
    const phoneDetails = document.getElementById('phone-detail');
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
                <img src="${data.image}" class="card-img-top" alt="...">
               <div class="card-body">
                <h5 class="card-title">${data.name}</h5>
                <h6 class="card-title">${data.releaseDate}</h6> 
               <h6 class="card-text">${data.brand}</h6>

               <h5 class="card-title">Main Features</h5>
               <p class="card-text"><b>Storage:</b> ${data.mainFeatures.storage}</p>
               <p class="card-text"><b> Displaysize:</b> ${data.mainFeatures.displaySize}</p>
               <p class="card-text"><b>Chipset:</b> ${data.mainFeatures.chipSet}</p>
               <p class="card-text"><b>Memory:</b> ${data.mainFeatures.memory}</p>
               <p class="card-text"><b>Sensor:</b> ${data.mainFeatures.sensors}</p>

               <h5 class="card-title">Others Information</h5>
               <p class="card-text"><b>Bluetooth:</b> ${data.others.Bluetooth}</p>
               <p class="card-text"><b>GPS:</b> ${data.others.GPS}</p>
               <p class="card-text"><b>NFC:</b> ${data.others.NFC}</p>
               <p class="card-text"><b>Radio:</b> ${data.others.Radio}</p>
               <p class="card-text"><b>USB:</b> ${data.others.USB}</p>
               <p class="card-text"><b>WLAN:</b> ${data.others.WLAN}</p>
               

        `;
    phoneDetails.appendChild(div);


}
