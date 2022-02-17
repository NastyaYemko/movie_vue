import axios from "axios";

export const movieModule = {
    state: () => ({
        movies: [],
        genres: [],
        isLoading: false,
        selectedSort: '',
        sortOptions: [
            {value: 'title', name: 'By title'},
            {value: 'release_date', name: 'By date'},
        ],
        searchQuery: '',
        page: 1,
        totalPages: 0,
        api_key: 'c6ec616f288a182ed86f78577f09a1df'
    }),
    getters: {
        sortedMovies(state) {
            return [...state.movies].sort((movie1, movie2) => {
                return movie1[state.selectedSort]?.localeCompare(movie2[state.selectedSort])
            })
        },
        sortedAndSearchedMovies(state, getter) {
            return getter.sortedMovies.filter(movie => movie.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
        }
    },
    mutations: {
        setMovies(state, movies) {
            state.movies = movies
        },
        setGenres(state, genres) {
            state.genres = genres
        },
        setLoading(state, isLoading) {
            state.isLoading = isLoading
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort
        },
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery
        },
        setPage(state, page) {
            state.page = page
        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages
        },

    },
    actions: {
        async fetchMovies ({state, commit}) {
            try {
                commit('setLoading', true)
                const responce = await axios.get('https://api.themoviedb.org/3/movie/popular', {
                    params: {
                        api_key: state.api_key,
                        page: state.page
                    }
                })
                const genres = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
                    params: {
                        api_key: state.api_key
                    }
                })
                commit('setTotalPages', responce.data.total_pages)
                commit('setMovies', responce.data.results)
                commit('setGenres', genres.data.genres)
            } catch (e) {
                console.log(e)
            } finally {
                commit('setLoading', false)
            }
        },
    },
    namespaced: true
}
