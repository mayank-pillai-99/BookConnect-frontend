import axios from 'axios';
import { BASE_URL } from './constants';

// Add book to favorites
export const addFavoriteBook = async (title, author) => {
  const response = await axios.post(
    BASE_URL + '/profile/books/add', 
    { title, author },
    { withCredentials: true }
  );
  return response.data;
};

// Remove book from favorites
export const removeFavoriteBook = async (bookId) => {
  const response = await axios.delete(
    BASE_URL + '/profile/books/remove',
    {
      data: { bookId },
      withCredentials: true
    }
  );
  return response.data;
};

// Update favorite genres
export const updateFavoriteGenres = async (genres) => {
  const response = await axios.patch(
    BASE_URL + '/profile/genres',
    { genres },
    { withCredentials: true }
  );
  return response.data;
};

// Get feed with filters
export const getFeed = async (page = 1, limit = 10, filters = {}) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  // Add filters if they exist
  if (filters.search) params.append('search', filters.search);
  if (filters.genre) params.append('genre', filters.genre);
  if (filters.book) params.append('book', filters.book);
  if (filters.sort) params.append('sort', filters.sort);

  const response = await axios.get(
    BASE_URL + `/feed?${params.toString()}`,
    { withCredentials: true }
  );
  return response.data;
};

// Valid genres constant
export const VALID_GENRES = [
  "Fiction",
  "Non-Fiction",
  "Mystery",
  "Romance",
  "Science Fiction",
  "Fantasy",
  "Biography",
  "History",
  "Self-Help",
  "Poetry",
  "Thriller",
  "Horror",
  "Adventure",
  "Other"
];
