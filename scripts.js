const API_KEY = "8ead5daa4adb0e86995a87b98cfe8422";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

    document.addEventListener('DOMContentLoaded', function() {
        const API_URL = 'https://api.themoviedb.org/3/movie/popular?api_key=SUA_CHAVE_API&language=pt-BR';
        const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
        const carousel = document.querySelector('.carousel-inner');
        const movieList = document.getElementById('movie-list');
        let currentIndex = 0;

        // Função para obter os filmes da API
        async function getMovies() {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                return data.results;
            } catch (error) {
                console.error('Erro ao buscar filmes:', error);
                return [];
            }
        }

        // Função para criar o carrossel
        function createCarousel(movies) {
            const carouselMovies = movies.slice(0, 5); // Pegamos os 5 primeiros filmes para o carrossel
            carouselMovies.forEach(movie => {
                const carouselItem = document.createElement('div');
                carouselItem.classList.add('carousel-item');
                carouselItem.innerHTML = `
                    <img src="${IMG_PATH + movie.backdrop_path}" alt="${movie.title}">
                `;
                carousel.appendChild(carouselItem);
            });

            setupCarousel();
        }

        // Função para configurar o carrossel
        function setupCarousel() {
            const items = carousel.querySelectorAll('.carousel-item');
            const prevBtn = document.querySelector('.carousel-control.prev');
            const nextBtn = document.querySelector('.carousel-control.next');

            function showSlide(index) {
                if (index < 0) {
                    currentIndex = items.length - 1;
                } else if (index >= items.length) {
                    currentIndex = 0;
                } else {
                    currentIndex = index;
                }
                carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
            }

            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                showSlide(currentIndex - 1);
            });

            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                showSlide(currentIndex + 1);
            });

            // Auto-play
            setInterval(() => {
                showSlide(currentIndex + 1);
            }, 5000);
        }

        // Função para exibir os filmes na lista
        function showMovies(movies) {
            movieList.innerHTML = '';
            movies.forEach(movie => {
                const { title, poster_path, vote_average } = movie;
                const movieEl = document.createElement('div');
                movieEl.classList.add('movie');
                movieEl.innerHTML = `
                    <img src="${IMG_PATH + poster_path}" alt="${title}">
                    <div class="movie-info">
                        <h3>${title}</h3>
                        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
                    </div>
                `;
                movieList.appendChild(movieEl);
            });
        }

        function getClassByRate(vote) {
            if (vote >= 8) {
                return 'green';
            } else if (vote >= 5) {
                return 'orange';
            } else {
                return 'red';
            }
        }

        // Inicialização
        async function init() {
            const movies = await getMovies();
            createCarousel(movies);
            showMovies(movies);
        }

        init();
    });

    document.addEventListener("DOMContentLoaded", function () {
        const carousel = document.querySelector(".carousel-inner");
        const items = carousel.querySelectorAll(".carousel-item");
        const prevBtn = document.querySelector(".carousel-control.prev");
        const nextBtn = document.querySelector(".carousel-control.next");
        let currentIndex = 0;

    function showSlide(index) {
        if (index < 0) {
        currentIndex = items.length - 1;
        } else if (index >= items.length) {
        currentIndex = 0;
        } else {
        currentIndex = index;
        }
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    prevBtn.addEventListener("click", (e) => {
        e.preventDefault();
        showSlide(currentIndex - 1);
    });

    nextBtn.addEventListener("click", (e) => {
        e.preventDefault();
        showSlide(currentIndex + 1);
    });

    setInterval(() => {
        showSlide(currentIndex + 1);
    }, 5000);
    });
function getMovies() {
fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR`)
    .then((response) => response.json())
    .then((data) => {
    displayMovies(data.results);
    })
    .catch((error) => console.error("Erro ao buscar os filmes:", error));
}

function displayMovies(movies) {
const movieList = document.getElementById("movie-list");
movieList.innerHTML = "";

movies.forEach((movie) => {
    const movieItem = document.createElement("div");
    movieItem.classList.add("movie");

    movieItem.innerHTML = `
            <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}">
            <h4>${movie.title}</h4>
            <p>${movie.release_date}</p>
        `;

    movieList.appendChild(movieItem);
});
}

getMovies();
