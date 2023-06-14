const createAutoComplete = ({ root, renderOption }) => {
   //const root = document.querySelector('.autocomplete');
    root.innerHTML = `
    <label><b>Search for a Movie</b></label>
    <input class ="input"/>
    <div class= "dropdown is-active">
     <div class="dropdown-menu">
      <div class="dropdown-content results">
      </div>
     </div>
     </div>
    `;
    
    const input = root.querySelector('input');
    const dropdown = root.querySelector('.dropdown');
    const resultsWrapper = root.querySelector('.results');
    
    
    //this targets the value
    const onInput = async event => {   
       const movies = await fetchData(event.target.value);
      
    
     if(!movies.length){
        dropdown.classList.remove('is-active');
        return;
     }
    
       resultsWrapper.innerHTML='';
    
       dropdown.classList.add('is-active');
    
//Always show in Image
      for (let movie of movies){
    
    
        const option = document. createElement('a');
    
      //  const imgSrc = movie.Poster === 'N/A' ?  '' : movie.Poster;
        option.classList.add('dropdown-item');
        option.innerHTML = renderOption(movie);
       
        //drop the dropdown and show the movie
        option.addEventListener('click', ()=>{
           dropdown.classList.remove('is-active');
    
           //displays movie title on the input
           input.value =movie.Title;
           onMovieSelect(movie);
        });
    
    
        resultsWrapper.appendChild(option );
        //console.log(movies);
    
      }
    
     
    };
    
    
    input.addEventListener('input', debounce(onInput,100));
     
    //tells us what was clicked 
    document.addEventListener('click', event =>{
        //if(!root.contains(event.target)){
            dropdown.classList.remove("is-active");
        }
        //console.log(event.target);
        
    );


};