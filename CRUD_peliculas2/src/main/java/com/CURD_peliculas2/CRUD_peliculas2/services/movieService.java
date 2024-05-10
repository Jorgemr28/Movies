
package com.CURD_peliculas2.CRUD_peliculas2.services;

import com.CURD_peliculas2.CRUD_peliculas2.models.movieModel;
import com.CURD_peliculas2.CRUD_peliculas2.repository.IMovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class movieService {

    @Autowired
    IMovieRepository movieRepository;

    public ArrayList<movieModel> getAllMovies(){
        return (ArrayList<movieModel>) movieRepository.findAll();
    }

    public Optional<movieModel> findById(Long id){return movieRepository.findById(id);}

    public movieModel saveMovie(movieModel movie){
        return movieRepository.save(movie);
    }

    public movieModel updateMovieById(movieModel request, Long id){
        movieModel movie = movieRepository.findById(id).get();

        movie.setName(request.getName());
        movie.setGender(request.getGender());
        movie.setAuthor(request.getAuthor());
        movie.setAmount(request.getAmount());

        movieRepository.save(movie);
        return movie;
    }

    public Boolean deleteMovieById(Long id){
        try{
            movieRepository.deleteById(id);
            return true;
        }catch (Exception e){
            return false;
        }
    }

    //verifica si la pelicula existe
    public boolean movieExist (movieModel movie){
        return findByName(movie.getName()).isPresent();
    }

    //encuentra la pelicual por el nombre
    public Optional<movieModel> findByName(String name){
        return movieRepository.findByName(name);
    }


    //verificar que los campos no esten vacíos
    public boolean checkFields(movieModel movie) {
        if (movie.getName() == null || movie.getName().isEmpty() ||
                movie.getAmount() == null || movie.getAmount() <= 0 ||
                movie.getAuthor() == null || movie.getAuthor().isEmpty() ||
                movie.getGender() == null || movie.getGender().isEmpty()) {
            return false;
        }
        return true;
    }

    public Boolean validateID (Long id){
        ArrayList<movieModel> movies = getAllMovies();

        for (movieModel movie : movies){
            Long  movieId= movie.getId();
            if ( movieId.equals(id)){
                return true;}
        }
        return false;
    }
}



