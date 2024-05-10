package com.CURD_peliculas2.CRUD_peliculas2.controllers;


import com.CURD_peliculas2.CRUD_peliculas2.models.movieModel;
import com.CURD_peliculas2.CRUD_peliculas2.services.movieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("movies")
public class movieController {

    @Autowired
    movieService movieServices;

    @GetMapping("/GetAllMovies")
    public ArrayList<movieModel> getAllMovies(){return movieServices.getAllMovies();}

    @GetMapping("/Get/{id}")
    public Optional<movieModel> getMovieById(@PathVariable Long id){return movieServices.findById(id);}

    @PostMapping("/Save")
    public ResponseEntity<Object> saveMovie(@RequestBody movieModel movie){
        if (movieServices.checkFields(movie)){
            if (movieServices.movieExist(movie)){
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("message", "La película ya existe");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
            }else{
                movieModel saveMovie = movieServices.saveMovie(movie);
                return ResponseEntity.ok(saveMovie);
            }
        }else{
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "error en los campos, verifique la información y vuelve a intentarlo");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    @PutMapping("/Update/{id}")
    public ResponseEntity<Object> updateMovieById (@RequestBody movieModel movie,@PathVariable Long id){
        if (!movieServices.checkFields(movie) || id == null){
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "error al intentar actualizar, verifica los datos e intentalo nuevamente");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }else{
            movieModel updateMovie = movieServices.updateMovieById(movie, id);
            return ResponseEntity.ok(updateMovie);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> deleteMovieById (@PathVariable Long id){
        if (id == null || !movieServices.validateID(id)){
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("La pelicula no se encuentra en la base de datos");
        }else{
            boolean ok = this.movieServices.deleteMovieById(id);
            if (ok) {
                return ResponseEntity.ok("La pelicula con el id " + id + " ha sido eliminada.");
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error al intentar eliminar la pelicula.");
            }
        }
    }
}
