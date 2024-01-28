import { Injectable, Param } from '@nestjs/common';

export interface Movie {
  id: string;
  title: string;
  genre: string;
  isPopular: boolean;
}

@Injectable()
export class AppService {
  private movies: Movie[] = [
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

  // Provider Home API
  getApi(): string {
    return 'Welcomme to Youflix REST-API';
  }

  // Provider Movies
  getAllMovie(): string {
    const data = this.movies;

    if (data.length === 0) {
      return 'Data not found';
    }

    const response = {
      message: 'Success to get all movies',
      data: data,
    };

    return JSON.stringify(response);
  }

  getMovieById(@Param('id') id: string): string {
    const data = this.movies.find((movie) => movie.id === id);

    if (!data) {
      return 'Data not found';
    }
    const response = {
      message: 'Success to get movie by ID',
      data: data,
    };

    return JSON.stringify(response);
  }

  getPopularMovies(movieStatus: boolean) {
    const data = this.movies.filter((movie) => movie.isPopular === movieStatus);

    if (data.length === 0) {
      return 'Data not found';
    }

    const response = {
      message: 'Success to get movie by popularity',
      data: data,
    };

    return JSON.stringify(response);
  }

  getRecomendedMovies(): string {
    const popularMovies = this.movies.filter(
      (movie) => movie.isPopular === false
    );
    if (popularMovies.length === 0) {
      return 'No popular movies found';
    }
    const shuffledMovies = popularMovies.sort(() => 0.5 - Math.random());
    const data = shuffledMovies.slice(0, 8);

    const response = {
      message: 'Recommended movies',
      data: data,
    };

    return JSON.stringify(response);
  }
}
