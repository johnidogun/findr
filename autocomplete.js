const createAutoComplete = ({ 
  root, 
  renderOption, 
  onOptionSelect, 
  inputValue,
  fetchData
 }) => {
   //const root = document.querySelector('.autocomplete');
    root.innerHTML = `
    <label><b>Search</b></label>
    <input class ="input is-half"/>
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
       const items = await fetchData(event.target.value);
      
    
     if(!items.length){
        dropdown.classList.remove('is-active');
        return;
     }
    
       resultsWrapper.innerHTML='';
    
       dropdown.classList.add('is-active');
    
//Always show in Image
      for (let item of items){
    
    
        const option = document. createElement('a');
    
      //  const imgSrc = movie.Poster === 'N/A' ?  '' : movie.Poster;
        option.classList.add('dropdown-item');
        option.innerHTML = renderOption(item);
       
        //drop the dropdown and show the movie
        option.addEventListener('click', ()=>{
           dropdown.classList.remove('is-active');
    
           //displays movie title on the input
           input.value =inputValue(item);
           onOptionSelect(item);
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