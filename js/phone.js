const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    // clear data
    searchField.value = '';




    //load data
    const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    // console.log(url);

    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.data));


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
                      <button onclick="details('${data.slug}')" class="btn btn-outline-secondary">Detail</button>
                      
                 </div>
           </div>
          
       `;
        searchResult.appendChild(div);

    })

}

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
               <p class="card-text">${data.brand}</p>
               

        `;
    phoneDetails.appendChild(div);


}
