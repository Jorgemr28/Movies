package com.CURD_peliculas2.CRUD_peliculas2.repository;

import com.CURD_peliculas2.CRUD_peliculas2.models.movieModel;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IMovieRepository extends CrudRepository<movieModel, Long> {

    public Optional<movieModel> findByName(String name);
}
