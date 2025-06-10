import 'src/style.css'
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

// API Configuration
const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;
const API_URL = "https://pixabay.com/api/";

// DOM Elements
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchHistory = document.getElementById('search-history');
const gallery = document.getElementById('gallery');
const loader = document.getElementById('loader');
const loadMoreContainer = document.getElementById('load-more-container');
const loadMoreButton = document.getElementById('load-more-button');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const filtersContainer = document.getElementById('filters-container');
const imageTypeSelect = document.getElementById('image-type');
const orientationSelect = document.getElementById('orientation');
const sortBySelect = document.getElementById('sort-by');
const clearFiltersBtn = document.getElementById('clear-filters');
const categoryBtns = document.querySelectorAll('.category-btn');
const favoritesSection = document.getElementById('favorites-section');
const favoritesGallery = document.getElementById('favorites-gallery');

// State
let currentPage = 1;
let currentQuery = '';
let lightbox = null;
let isLoading = false;
let hasMoreImages = true;
let searchHistoryList = [];
let favorites = [];

// Theme Management
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Search History Management
function loadSearchHistory() {
  const saved = localStorage.getItem('searchHistory');
  searchHistoryList = saved ? JSON.parse(saved) : [];
}

function saveSearchHistory() {
  localStorage.setItem('searchHistory', JSON.stringify(searchHistoryList));
}

function addToSearchHistory(query) {
  if (!searchHistoryList.includes(query)) {
    searchHistoryList.unshift(query);
    if (searchHistoryList.length > 10) {
      searchHistoryList.pop();
    }
    saveSearchHistory();
  }
}

function showSearchHistory() {
  if (searchHistoryList.length === 0) return;
  
  searchHistory.innerHTML = searchHistoryList
    .map(query => `<div class="history-item" data-query="${query}">${query}</div>`)
    .join('');
  searchHistory.style.display = 'block';
}

function hideSearchHistory() {
  searchHistory.style.display = 'none';
}

// Favorites Management
function loadFavorites() {
  const saved = localStorage.getItem('favorites');
  favorites = saved ? JSON.parse(saved) : [];
  renderFavorites();
}

function saveFavorites() {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

function toggleFavorite(imageId, imageData) {
  const index = favorites.findIndex(fav => fav.id === imageId);
  
  if (index === -1) {
    favorites.push({ id: imageId, ...imageData });
    iziToast.success({
      title: 'Added to Favorites',
      message: 'Image added to your favorites!',
      position: 'topRight',
    });
  } else {
    favorites.splice(index, 1);
    iziToast.info({
      title: 'Removed from Favorites',
      message: 'Image removed from favorites',
      position: 'topRight',
    });
  }
  
  saveFavorites();
  renderFavorites();
  updateFavoriteButtons();
}

function renderFavorites() {
  if (favorites.length === 0) {
    favoritesSection.style.display = 'none';
    return;
  }
  
  favoritesSection.style.display = 'block';
  favoritesGallery.innerHTML = favorites
    .map(fav => createFavoriteCard(fav))
    .join('');
  
  // Initialize lightbox for favorites
  if (lightbox) {
    lightbox.destroy();
  }
  lightbox = new SimpleLightbox('.favorites-gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
}

function createFavoriteCard(fav) {
  return `
    <li class="gallery-item">
      <a href="${fav.largeImageURL}">
        <img 
          src="${fav.webformatURL}" 
          alt="${fav.tags}" 
          class="gallery-image"
        />
      </a>
      <button class="favorite-btn favorited" onclick="removeFromFavorites(${fav.id})">❤️</button>
      <div class="image-info">
        <div class="info-item">
          <span class="info-label">Likes</span>
          <span class="info-value">${fav.likes}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Views</span>
          <span class="info-value">${fav.views}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Comments</span>
          <span class="info-value">${fav.comments}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Downloads</span>
          <span class="info-value">${fav.downloads}</span>
        </div>
      </div>
    </li>
  `;
}

function updateFavoriteButtons() {
  const favoriteBtns = document.querySelectorAll('.favorite-btn');
  favoriteBtns.forEach(btn => {
    const imageId = parseInt(btn.dataset.imageId);
    const isFavorited = favorites.some(fav => fav.id === imageId);
    btn.classList.toggle('favorited', isFavorited);
    btn.innerHTML = isFavorited ? '❤️' : '🤍';
  });
}

// Initialize SimpleLightbox
function initLightbox() {
  if (lightbox) {
    lightbox.destroy();
  }
  lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
}

// Show/Hide Loader
function showLoader() {
  loader.style.display = 'flex';
  isLoading = true;
}

function hideLoader() {
  loader.style.display = 'none';
  isLoading = false;
}

// Show/Hide Load More Button
function showLoadMoreButton() {
  loadMoreContainer.style.display = 'block';
}

function hideLoadMoreButton() {
  loadMoreContainer.style.display = 'none';
}

// Clear Gallery
function clearGallery() {
  gallery.innerHTML = '';
  currentPage = 1;
  hasMoreImages = true;
  hideLoadMoreButton();
}

// Create Image Card
function createImageCard(image) {
  const isFavorited = favorites.some(fav => fav.id === image.id);
  
  return `
    <li class="gallery-item" data-image-id="${image.id}">
      <a href="${image.largeImageURL}">
        <img 
          src="${image.webformatURL}" 
          alt="${image.tags}" 
          class="gallery-image"
          loading="lazy"
        />
      </a>
      <button class="favorite-btn ${isFavorited ? 'favorited' : ''}" 
              data-image-id="${image.id}" 
              onclick="toggleFavorite(${image.id}, ${JSON.stringify(image).replace(/"/g, '&quot;')})">
        ${isFavorited ? '❤️' : '🤍'}
      </button>
      <div class="image-info">
        <div class="info-item">
          <span class="info-label">Likes</span>
          <span class="info-value">${image.likes}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Views</span>
          <span class="info-value">${image.views}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Comments</span>
          <span class="info-value">${image.comments}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Downloads</span>
          <span class="info-value">${image.downloads}</span>
        </div>
      </div>
    </li>
  `;
}

// Render Gallery
function renderGallery(images, isLoadMore = false) {
  if (!isLoadMore) {
    clearGallery();
  }
  
  const markup = images.map(createImageCard).join('');
  
  if (isLoadMore) {
    gallery.insertAdjacentHTML('beforeend', markup);
  } else {
    gallery.innerHTML = markup;
  }
  
  initLightbox();
  updateFavoriteButtons();
  
  if (images.length === 20) {
    showLoadMoreButton();
  } else {
    hasMoreImages = false;
    hideLoadMoreButton();
  }
}

// Get Filter Values
function getFilterValues() {
  return {
    image_type: imageTypeSelect.value === 'all' ? 'photo' : imageTypeSelect.value,
    orientation: orientationSelect.value === 'all' ? 'horizontal' : orientationSelect.value,
    order: sortBySelect.value
  };
}

// Fetch Images from API
async function fetchImages(query, page = 1) {
  const filters = getFilterValues();
  
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: filters.image_type,
    orientation: filters.orientation,
    order: filters.order,
    safesearch: 'true',
    page: page,
    per_page: 20,
  });

  const url = `${API_URL}?${params}`;
  
  console.log('Fetching from URL:', url);

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('API Response:', data);
    return data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}

// Handle Search
async function handleSearch(query, page = 1) {
  if (isLoading) return;
  
  try {
    showLoader();
    
    const data = await fetchImages(query, page);
    
    if (data.hits.length === 0) {
      iziToast.error({
        title: 'No Results',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      if (page === 1) {
        clearGallery();
      }
      return;
    }
    
    renderGallery(data.hits, page > 1);
    
    if (page === 1) {
      addToSearchHistory(query);
      iziToast.success({
        title: 'Success',
        message: `Found ${data.totalHits} images`,
        position: 'topRight',
      });
    }
    
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'An error occurred while fetching images. Please try again.',
      position: 'topRight',
    });
    console.error('Search error:', error);
  } finally {
    hideLoader();
  }
}

// Infinite Scroll
function setupInfiniteScroll() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && hasMoreImages && !isLoading && currentQuery) {
        currentPage++;
        handleSearch(currentQuery, currentPage);
      }
    });
  }, { threshold: 0.1 });

  // Observe the load more button
  if (loadMoreButton) {
    observer.observe(loadMoreButton);
  }
}

// Event Listeners
searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const query = searchInput.value.trim();
  
  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query',
      position: 'topRight',
    });
    return;
  }
  
  currentQuery = query;
  currentPage = 1;
  await handleSearch(query, 1);
});

// Search input events
searchInput.addEventListener('focus', showSearchHistory);
searchInput.addEventListener('input', () => {
  if (searchInput.value.trim()) {
    hideSearchHistory();
  } else {
    showSearchHistory();
  }
});

// Search history click
searchHistory.addEventListener('click', (e) => {
  if (e.target.classList.contains('history-item')) {
    const query = e.target.dataset.query;
    searchInput.value = query;
    hideSearchHistory();
    currentQuery = query;
    currentPage = 1;
    handleSearch(query, 1);
  }
});

// Hide search history when clicking outside
document.addEventListener('click', (e) => {
  if (!searchInput.contains(e.target) && !searchHistory.contains(e.target)) {
    hideSearchHistory();
  }
});

// Load more button
loadMoreButton.addEventListener('click', () => {
  if (!isLoading && hasMoreImages) {
    currentPage++;
    handleSearch(currentQuery, currentPage);
  }
});

// Theme toggle
themeToggle.addEventListener('click', toggleTheme);

// Category buttons
categoryBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    categoryBtns.forEach(b => b.classList.remove('active'));
    // Add active class to clicked button
    btn.classList.add('active');
    
    const category = btn.dataset.category;
    searchInput.value = category;
    currentQuery = category;
    currentPage = 1;
    handleSearch(category, 1);
  });
});

// Filter changes
[imageTypeSelect, orientationSelect, sortBySelect].forEach(select => {
  select.addEventListener('change', () => {
    if (currentQuery) {
      currentPage = 1;
      handleSearch(currentQuery, 1);
    }
  });
});

// Clear filters
clearFiltersBtn.addEventListener('click', () => {
  imageTypeSelect.value = 'all';
  orientationSelect.value = 'all';
  sortBySelect.value = 'relevance';
  
  categoryBtns.forEach(btn => btn.classList.remove('active'));
  
  if (currentQuery) {
    currentPage = 1;
    handleSearch(currentQuery, 1);
  }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + K to focus search
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    searchInput.focus();
  }
  
  // Escape to hide search history
  if (e.key === 'Escape') {
    hideSearchHistory();
    searchInput.blur();
  }
});

// Initialize everything
function init() {
  initTheme();
  loadSearchHistory();
  loadFavorites();
  setupInfiniteScroll();
  
  // Show search history on page load if input is empty
  if (!searchInput.value.trim()) {
    showSearchHistory();
  }
}

// Start the app
init();

// Make functions globally available for onclick handlers
window.toggleFavorite = toggleFavorite;
window.removeFromFavorites = (imageId) => {
  const index = favorites.findIndex(fav => fav.id === imageId);
  if (index !== -1) {
    favorites.splice(index, 1);
    saveFavorites();
    renderFavorites();
    updateFavoriteButtons();
    iziToast.info({
      title: 'Removed from Favorites',
      message: 'Image removed from favorites',
      position: 'topRight',
    });
  }
};
