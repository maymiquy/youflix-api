import { Injectable, Param } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';

export interface Movie {
  id: string;
  title: string;
  genre: string;
  isPopular: boolean;
}

@Injectable()
export class MovieService {
  private movies: CreateMovieDto[] = [
    {
      id: '1',
      title: 'The Shawshank Redemption',
      genre: 'Drama',
      isPopular: true,
    },
    {
      id: '2',
      title: 'The Godfather',
      genre: 'Drama',
      isPopular: true,
    },
    {
      id: '3',
      title: 'The Godfather: Part II',
      genre: 'Drama',
      isPopular: true,
    },
    {
      id: '4',
      title: 'The Dark Knight',
      genre: 'Action',
      isPopular: true,
    },
    {
      id: '5',
      title: '12 Angry Men',
      genre: 'Drama',
      isPopular: false,
    },
  ];

  // Provider Movies
  findAll(): CreateMovieDto[] {
    const result = this.movies;

    return result;
  }

  findById(@Param('id') id: string) {
    const result = this.movies.find((movie) => movie.id === id);

    return result;
  }

  findPopular(movieStatus: boolean) {
    const data = this.movies.filter((movie) => movie.isPopular === movieStatus);

    if (data.length === 0) {
      return 'Data not found';
    }

    const result = {
      message: 'Success to get movie by popularity',
      data: data,
    };

    return JSON.stringify(result);
  }

  findRecomended(): string {
    const popularMovies = this.movies.filter(
      (movie) => movie.isPopular === false
    );
    if (popularMovies.length === 0) {
      return 'No popular movies found';
    }
    const shuffledMovies = popularMovies.sort(() => 0.5 - Math.random());
    const data = shuffledMovies.slice(0, 8);

    const result = {
      message: 'Recommended movies',
      data: data,
    };

    return JSON.stringify(result);
  }

  addMovie(movie: CreateMovieDto): CreateMovieDto {
    this.movies.push(movie);

    return movie;
  }
}
