//1 Register the Api
// const fetchData = async searchTerm =>{
//     const response = await axios.get('http://www.omdbapi.com/',{
//        params:{
//         apikey: '1ee2c638',
//         s:searchTerm,
        
//        } 
//     });

// if (response.data.Error){
//     return [];
// }

//     return response.data.Search;
//     //console.log(response.data);
// };
const autocompleteConfig ={
  renderOption(movie){
    const imgSrc =movie.Poster=== 'N/A' ? '' : movie.Poster;
    return `
    <img src=" ${imgSrc}" />
    ${movie.Title} (${movie.Year})
    `;
  },
  onOptionSelect(movie){
    onMovieSelect(movie);
  },
  //Returns the movie title when a user clicks on it
  inputValue(movie){
    return movie.Title;

  },
  //Another way to verify the api
  async fetchData(searchTerm){
    const response = await axios.get('http://www.omdbapi.com/',{
       params:{
        apikey: '1ee2c638',
        s:searchTerm,
        
       } 
    });

if (response.data.Error){
    return [];
}

    return response.data.Search;
    //console.log(response.data);
}

};
createAutoComplete({
  ...autocompleteConfig,
  root: document.querySelector('#left-autocomplete'),
  //display the movie or shows how it is rend ered renders an image element with the movie title and year it was produced
 
});
// createAutoComplete({
//   ...autocompleteConfig,
//   root: document.querySelector('#right-autocomplete'),
  //display the movie or shows how it is rendered renders an image element with the movie title and year it was produced
 
//});

//2 create the input ,body and dropdown using JS functions and also validate the variable

// createAutoComplete({
//   root: document.querySelector('.autocomplete'),
//   renderOption(movie){
//     const imgSrc = movie.Poster ==='N/A'?'': movie.Poster;

//     return`
//     <img src="${imgSrc}"/>
//     ${movie.Title}
//     `;


//   }

// }

// );

// const root = document.querySelector('.autocomplete');
// root.innerHTML = `
// <label><b>Search for a Movie</b></label>
// <input class ="input"/>
// <div class= "dropdown is-active">
//  <div class="dropdown-menu">
//   <div class="dropdown-content results">
//   </div>
//  </div></div>
// `;

// const input = document.querySelector('input');
// const dropdown = document.querySelector('.dropdown');
// const resultsWrapper = document.querySelector('.results');


// //this targets the value
// const onInput = async event => {   
//    const movies = await fetchData(event.target.value);
  

//  if(!movies.length){
//     dropdown.classList.remove('is-active');
//     return;
//  }

//    resultsWrapper.innerHTML='';

//    dropdown.classList.add('is-active');


//   for (let movie of movies){


//     const option = document. createElement('a');

//     const imgSrc = movie.Poster === 'N/A' ?  '' : movie.Poster;
//     option.classList.add('dropdown-item');
//     option.innerHTML = `
//     <img src=" ${imgSrc}" />
//     ${movie.Title} 
//     `;
   
//     //drop the dropdown and show the movie
//     option.addEventListener('click', ()=>{
//        dropdown.classList.remove('is-active');

//        //displays movie title on the input
//        input.value =movie.Title;
//        onMovieSelect(movie);
//     });


//     resultsWrapper.appendChild(option );
//     //console.log(movies);

//   }

 
// };


// input.addEventListener('input', debounce(onInput,500));
 
// //tells us what was clicked 
// document.addEventListener('click', event =>{
//     //if(!root.contains(event.target)){
//         dropdown.classList.remove("is-active");
//     }
//     //console.log(event.target);
    
// );
// //(event) =>{
//     //fetchData(event.target.value);const fetchData = async searchTerm => {

// //displays data of the movie
 const onMovieSelect = async movie =>{
    const response = await axios.get(
        'http://www.omdbapi.com/',{
       params:{
        apikey: '1ee2c638',
        i: movie.imdbID
       }
       });
 
       //this displays the html
       document.querySelector('#summary').innerHTML = movieTemplate(response.data);
 };

 const movieTemplate =(movieDetail) =>{
    return `
    <article class="media"> 
      <figure class="media-left">
       <p class="image">
       <img src="${movieDetail.Poster}"/>
       </p>      
      </figure>
      <div class="media-content">

        <div class="content">
          <h1>${movieDetail.Title}</h1>
          <h4>${movieDetail.Genre}</h4>
          <p>${movieDetail.Plot}</p>
        </div>
      
      </div>
        
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.Awards}</p>
      <p class="subtitle">Awards</p>
    </article>
    <article class="notification is-primary">
    <p class="title">${movieDetail.BoxOffice}</p>
    <p class="subtitle">Boxoffice</p>
  </article>
  <article class="notification is-primary">
  <p class="title">${movieDetail.MetaScore}</p>
  <p class="subtitle">Metascore</p>
</article>
<article class="notification is-primary">
<p class="title">${movieDetail.imdbRating}</p>
<p class="subtitle">IMDB RATINGD</p>
<article class="notification is-primary">
<p class="title">${movieDetail.imdvote}</p>
<p class="subtitle">IMDB VOTES</p>
</article>
</article>
    `

 }
 