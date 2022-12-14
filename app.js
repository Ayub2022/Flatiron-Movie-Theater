const filmsList = document.querySelector('.movies-list');
const movieCover = document.querySelector('.cover');
const movieTitle = document.querySelector('#title');
const movieDescription = document.querySelector('#description')
const theatreCapacity  =document.querySelector('.capacity')
const ticketsAvailable = document.querySelector('.remainder')
const movieShowtime = document.querySelector('.showtime')
const movieRunTime = document.querySelector('.runtime')
const buyMovieTicket  =document.querySelector('.buy-ticket')


//get the clicked movie id to use later 

let currentMovieId =null;
let allMovies = [];

const fetchMovies = async()=>await fetch('http://localhost:3000/films')
.then((res)=>res.json())
.then((data)=>{
    if( typeof data === Object){
        showSingleMovie(data)
    }
   console.log(data)
   displayMovies(data)
})


const fetchFirstMovie = async()=>await fetch('http://localhost:3000/films/1')
.then((res)=>res.json())
.then((data)=>{
   showSingleMovie(data)
   console.log('the length is : ' + typeof data)
})




const displayMovies =(data)=>{
    data.map((movie, index)=>{

        //populate movies array
        allMovies.push(movie)

        const listItem = document.createElement('li')
        listItem.innerHTML = movie.title;
        listItem.addEventListener('click',()=>{
           showSingleMovie(movie);
           currentMovieId = index
        })
        filmsList.appendChild(listItem)

    })
}



const showSingleMovie = (movie)=>{
    movieCover.src = movie.poster;
    movieTitle.innerHTML = movie.title;
    movieDescription.innerHTML = movie.description;
    theatreCapacity.innerHTML = movie.capacity;
    ticketsAvailable.innerHTML = parseInt(movie.capacity) - parseInt(movie.tickets_sold);
    movieShowtime.innerHTML = ' : ' + movie.showtime;
    movieRunTime.innerHTML =' : ' +  movie.runtime + ' mins'
} 

//buy the movie ticket 

buyMovieTicket.addEventListener('click',()=>{
    purchaseTicket(allMovies[currentMovieId])
})


const purchaseTicket = (movie)=>{
    if(!(movie.tickets_sold > movie.capacity ) && (movie.capacity - movie.tickets_sold)>=1){

        movie.tickets_sold +=1;
        
        ticketsAvailable.innerHTML = movie.capacity - movie.tickets_sold;

    } else {
         ticketsAvailable.innerHTML = ' : Sorry, theatre is full'
    }
}


fetchMovies()
fetchFirstMovie()

