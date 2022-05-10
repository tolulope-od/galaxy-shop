export const checkIfExistsInFavorites = (product) => {
  const favoritesObj = localStorage.getItem('userSWVehicles&StarshipsFavs');

  
  if (favoritesObj) {
    const favorites = JSON.parse(favoritesObj).favorites;
    const foundFave = favorites.find((fave) => fave?.url === product?.url);
    if (foundFave) {
      return true;
    }
    return false;
  }

  return false;
};

export const addOrRemoveFavorite = (product, cb) => {
  const favoritesObj = localStorage.getItem('userSWVehicles&StarshipsFavs');

  if (!favoritesObj) {
    const favoritesCache = {
      favorites: [product],
    };
    localStorage.setItem('userSWVehicles&StarshipsFavs', JSON.stringify(favoritesCache));
    cb(true);
    return;
  }

  // find it if it exists
  const exists = checkIfExistsInFavorites(product);
  const faves = JSON.parse(favoritesObj).favorites;
  // remove it if it exists
  const newFaves = exists ? faves.filter((favorite) => favorite.url !== product?.url) : [...faves, product];
    const newFavoritesCache = {
      favorites: newFaves,
    };
    localStorage.setItem('userSWVehicles&StarshipsFavs', JSON.stringify(newFavoritesCache));
    if (exists) {
      cb(false);
    } else {
      cb(true);
    }
    return
};

