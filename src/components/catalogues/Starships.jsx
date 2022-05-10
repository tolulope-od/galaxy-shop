import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import LoadingCard from '../loaders/LoadingCard.jsx';
import Dropdown from 'react-bootstrap/Dropdown';
import Pagination from 'react-bootstrap/Pagination';
import debounce from 'lodash.debounce';
import StoreItem from '../cards/StoreItem.jsx';
import { Search } from 'react-bootstrap-icons';
import MultiRangeSlider from '../fragments/MultiRangeSlider.jsx';
import between from '../../utils/between.js';
import useFilms from '../../hooks/useFilms.js';

const Starships = ({
  starships,
  starshipsLoading: loading,
  fetchStarShips,
  next,
  previous,
  catalogue = 'starships',
  title = 'Starships',
  type = 'Starship',
}) => {
  const location = useLocation();
  const { filmsLoading, films, fetchFilms } = useFilms();
  const [searchInput, setSearchInput] = React.useState('');
  const [selectedFilms, setSelectedFilms] = React.useState([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState([]);
  const [priceRange, setPriceRange] = React.useState({
    min: null,
    max: null,
  });

  const path = location && location.pathname;

  const fetchDataDebounced = debounce((searchInput, callback) => {
    const query = searchInput.replace(' ', '+');
    fetchStarShips(`${catalogue}/?search=${query}&format=json`, callback);
  }, 3000);

  React.useEffect(() => {
    fetchStarShips(`${catalogue}/?format=json`);
    fetchFilms();
  }, []);

  const handleNext = () => {
    fetchStarShips(next.replace('https://swapi.dev/api/', ''));
  };

  const handlePrevious = () => {
    fetchStarShips(previous.replace('https://swapi.dev/api/', ''));
  };

  React.useEffect(() => {
    if (searchInput.trim().length > 0) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
    fetchDataDebounced(searchInput, (results) => {
      setSearchResults(results);
    });
  }, [searchInput]);

  const applyFilters = () => {
    setIsSearching(true);
    const searchItems = isSearching ? searchResults : starships;
    const all = [];
    selectedFilms.forEach((selectedFilm) => {
      for (let index = 0; index < searchItems.length; index += 1) {
        if (
          searchItems[index].films.length > 0 &&
          searchItems[index].films.includes(selectedFilm)
        ) {
          all.push(searchItems[index]);
        }
      }
    });

    if (priceRange.min && priceRange.max) {
      searchItems.forEach((searchItem) => {
        if (
          !isNaN(searchItem.cost_in_credits) &&
          between(Number(searchItem.cost_in_credits) / 100.0, priceRange.min, priceRange.max)
        ) {
          all.push(searchItem);
        }
      });
    }

    const uniqueFilmsFilter = Array.from(new Set(all.map((a) => a.url))).map((id) => {
      return all.find((a) => a.url === id);
    });
    setSearchResults(uniqueFilmsFilter);
  };

  const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      return (
        <div ref={ref} style={style} className={className} aria-labelledby={labeledBy}>
          {!filmsLoading &&
            films.length > 0 &&
            films.map((film) => (
              <Dropdown.Item as="a" key={film.episode_id}>
                <Form.Check
                  onChange={(event) => {
                    event.preventDefault();
                    // check if already selected
                    const selected = selectedFilms.includes(film.url);
                    if (selected) {
                      setSelectedFilms((previous) => {
                        const newList = previous.filter((prev) => prev !== event.target.value);
                        return newList;
                      });
                    } else {
                      setSelectedFilms((prev) => [...prev, event.target.value]);
                    }
                  }}
                  type="checkbox"
                  value={film.url}
                  checked={selectedFilms.includes(film.url)}
                  id={film.url}
                  label={film.title}
                />
              </Dropdown.Item>
            ))}
        </div>
      );
    }
  );

  return (
    <div className="container px-4 px-lg-5 mt-5">
      {path !== '/' && (
        <Form>
          <InputGroup>
            <InputGroup.Text className="bg-transparent" id="search">
              <Search />
            </InputGroup.Text>
            <Form.Control
              onChange={(event) => {
                setSearchInput(event.target.value);
              }}
              // ref={(ref) => {
              //   searchInputRef = ref;
              // }}
              value={searchInput}
              type="text"
              placeholder="Search for starship by name or model"
              aria-label="search"
              aria-describedby="search"
            />
          </InputGroup>
          <Form.Group>
            <div className="d-grid gap-2 d-md-flex py-4 justify-content-md-start">
              <Dropdown autoClose="outside">
                <Dropdown.Toggle
                  as="a"
                  className="btn btn-outline-dark w-100"
                  id="dropdown-autoclose-outside"
                >
                  Select Film(s)
                </Dropdown.Toggle>

                <Dropdown.Menu as={CustomMenu}>
                  <Dropdown.Item eventKey="1">Red</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown autoClose="outside">
                <Dropdown.Toggle
                  as="a"
                  className="btn btn-outline-dark w-100"
                  id="dropdown-autoclose-outside-2"
                >
                  Select Price Range
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as="div">
                    <MultiRangeSlider
                      min={0}
                      max={10000000000}
                      onChange={({ min, max }) => {
                        setPriceRange(() => ({
                          min,
                          max,
                        }));
                      }}
                    />
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <button
                onClick={() => {
                  applyFilters();
                }}
                className="btn btn-outline-primary"
                type="button"
              >
                Apply Filters
              </button>
              <button
                disabled={!isSearching}
                onClick={() => {
                  setSearchInput('');
                  setIsSearching(false);
                  setSelectedFilms([]);
                  setPriceRange({
                    min: null,
                    max: null,
                  });
                  fetchStarShips(`${catalogue}/?format=json`);
                }}
                className="btn btn-outline-danger"
                type="button"
              >
                Clear All Filters
              </button>
            </div>
          </Form.Group>
        </Form>
      )}

      <div className="py-4">
        <h2>{title}</h2>
      </div>
      <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-start">
        {loading && [0, 1, 2, 3, 4, 5, 6, 7].map((card) => <LoadingCard key={card} />)}

        {!loading &&
          !isSearching &&
          starships.length > 0 &&
          starships.map((starship) => <StoreItem key={starship.url} {...{ type, ...starship }} />)}

        {!loading &&
          isSearching &&
          searchResults.length > 0 &&
          searchResults.map((starship) => (
            <StoreItem key={starship.url} {...{ type, ...starship }} />
          ))}
      </div>
      {path === '/' ? (
        <Link
          className="btn btn-primary"
          type="button"
          to={`/${catalogue}`}
        >
          View more {catalogue}
        </Link>
      ) : (
        <Pagination>
          <Pagination.Prev disabled={previous === null} onClick={handlePrevious}>
            Previous
          </Pagination.Prev>
          <Pagination.Next disabled={next === null} onClick={handleNext}>
            Next
          </Pagination.Next>
        </Pagination>
      )}
    </div>
  );
};

export default Starships;
