import  { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

const MainPage = () => {
  const [selectedFilter, setSelectedFilter] = useState({
    filter1: "All", // Genre
    filter2: "All", // Language
    filter3: "All", // Year
    filter4: "All", // Industry
    filter5: "All", // Actors
  });

  const [searchQuery, setSearchQuery] = useState(""); // State to hold search query
  const [movies, setMovies] = useState([]);
  const [modalContent, setModalContent] = useState(null); // For modal content
  const [showModal, setShowModal] = useState(false); // For controlling modal visibility

  const fetchMovies = async () => {
    try {
      const response = await axios.get("http://localhost/php-backend/getMovies.php", {
        params: {
          genre: selectedFilter.filter1,
          year: selectedFilter.filter3,
          industry: selectedFilter.filter4,
          actor: selectedFilter.filter5,
          language: selectedFilter.filter2,
        },
      });
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [selectedFilter]);

  const handleSelect = (filterKey, value) => {
    setSelectedFilter((prevState) => ({
      ...prevState,
      [filterKey]: value,
    }));
  };

  const handleResetFilters = () => {
    setSelectedFilter({
      filter1: "All",
      filter2: "All",
      filter3: "All",
      filter4: "All",
      filter5: "All",
    });
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase()); // Convert to lowercase for case-insensitive search
  };

  // Check if any filter is selected (not "All")
  const isAnyFilterSelected = Object.values(selectedFilter).some((filter) => filter !== "All");

  // Filter movies based on the selected filters and search query
  const filteredMovies = movies.filter((movie) => {
    const isGenreMatch = selectedFilter.filter1 === "All" || movie.genre.toLowerCase().includes(selectedFilter.filter1.toLowerCase());
    const isYearMatch = selectedFilter.filter3 === "All" || movie.year.toLowerCase().includes(selectedFilter.filter3.toLowerCase());
    const isIndustryMatch = selectedFilter.filter4 === "All" || movie.industry.toLowerCase().includes(selectedFilter.filter4.toLowerCase());
    const isActorMatch = selectedFilter.filter5 === "All" || movie.actor.toLowerCase().includes(selectedFilter.filter5.toLowerCase());
    const isLanguageMatch = selectedFilter.filter2 === "All" || movie.language.toLowerCase().includes(selectedFilter.filter2.toLowerCase());

    // Check if the search query matches any of the dropdown filter values or the movie's title
    const isSearchMatch =
      movie.title.toLowerCase().includes(searchQuery) ||
      movie.genre.toLowerCase().includes(searchQuery) ||
      movie.year.toLowerCase().includes(searchQuery) ||
      movie.industry.toLowerCase().includes(searchQuery) ||
      movie.actor.toLowerCase().includes(searchQuery) ||
      movie.language.toLowerCase().includes(searchQuery);

    return isGenreMatch && isYearMatch && isIndustryMatch && isActorMatch && isLanguageMatch && isSearchMatch;
  });

  const handleNavClick = (navItem) => {
    switch (navItem) {
      case "About":
        setModalContent("This is the About section. Here you can find details about the website, its mission, and vision.");
        break;
      case "Services":
        setModalContent("These are the services we offer. We provide a variety of movie-related services, including reviews, recommendations, and streaming information.");
        break;
      case "Contact":
        setModalContent("This is the Contact section. You can reach us at contact@imovies.com for any inquiries or support.");
        break;
      default:
        setModalContent(null);
        break;
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {/* Navbar */}
    

<nav className="navbar navbar-expand-lg" style={{ backgroundColor: "red" }}>
  <div className="container-fluid d-flex justify-content-center">
    <a className="navbar-brand" href="#" style={{ color: "yellow" }}>
      iMovies
    </a>
    <button
      className="navbar-toggler ms-auto"  // Ensures hamburger stays on the right
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#" style={{ color: "yellow" }}>
            Home
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            href="#"
            style={{ color: "yellow" }}
            onClick={() => handleNavClick("About")}
          >
            About
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            href="#"
            style={{ color: "yellow" }}
            onClick={() => handleNavClick("Services")}
          >
            Services
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            href="#"
            style={{ color: "yellow" }}
            onClick={() => handleNavClick("Contact")}
          >
            Contact
          </a>
        </li>
      </ul>
    </div>

    {/* Link to the login page ("/") when the logout button is clicked */}
    <Link to="/" className="btn btn-danger ms-auto d-none d-lg-block">
      Logout
    </Link>
  </div>

  {/* Mobile Logout button in the collapsible menu */}
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link to="/" className="btn btn-danger w-100 d-block d-lg-none">
          Logout
        </Link>
      </li>
    </ul>
  </div>
</nav>




      {/* Search Bar */}
      <div className="container-fluid py-3">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search for movies"
                aria-label="Search"
                value={searchQuery} // bind to the state
                onChange={handleSearchChange} // handle input change
              />
              <button className="btn btn-primary" type="button">
                <i className="bi bi-search"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="container-fluid">
        <div className="row vh-100">
          {/* Left Section */}
          <div
            className="col-12 col-sm-3 col-md-2 col-lg-2 d-flex flex-column justify-content-start align-items-center border-end py-3"
            style={{ backgroundColor: "#f8f9fa" }}
          >
            <h5>Top Filters</h5>
            <div className="d-flex flex-wrap flex-lg-column justify-content-center align-items-center gap-3">
              {[{
                label: "Genre",
                key: "filter1",
                items: ["All", "Action", "Comedy", "Drama", "Horror"],
              }, {
                label: "Year",
                key: "filter3",
                items: ["All", "2023", "2022", "2021", "2020"],
              }, {
                label: "Industry",
                key: "filter4",
                items: ["All", "Kollywood", "Tollywood", "Mollywood", "Hollywood"],
              }, {
                label: "Actors",
                key: "filter5",
                items: ["All", "Vijay", "AjithKumar", "Silambarasan", "Vishal"],
              }, {
                label: "Language",
                key: "filter2",
                items: ["All", "English", "Tamil", "Hindi", "Telugu"],
              }].map((dropdown, index) => (
                <div key={index} className="btn-group dropend">
                  <button className="btn btn-secondary btn-sm" type="button">
                    {dropdown.label}: {selectedFilter[dropdown.key]}
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-secondary dropdown-toggle dropdown-toggle-split"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span className="visually-hidden">Toggle Dropdown</span>
                  </button>
                  <ul className="dropdown-menu">
                    {dropdown.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() => handleSelect(dropdown.key, item)}
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Reset Button - Shown only if any filter is selected */}
            {isAnyFilterSelected && (
              <button
                className="btn btn-danger mt-3"
                onClick={handleResetFilters}
                style={{ width: "100%" }}
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* Right Section */}
          <div className="col-12 col-md-10 d-flex flex-column justify-content-center align-items-center">
            <div className={`row g-4 ${filteredMovies.length === 0 ? "text-center" : ""}`}>
              {/* Cards */}
              {filteredMovies.map((movie) => (
                <div key={movie.id} className="col d-flex justify-content-center">
                  <div className="card" style={{ width: "18rem", marginTop: "10px" }}>
                    <img
                      src={movie.image_url || "https://via.placeholder.com/150"}
                      className="card-img-top"
                      alt="Card image"
                      style={{
                        height: "150px",
                        objectFit: "cover",
                      }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{movie.title}</h5>
                      <p>Actor: {movie.actor}</p>
                      <p>Genre: {movie.genre}</p>
                      <p>Released on: {movie.year}</p>
                      <p>Industry: {movie.industry}</p>
                    </div>
                  </div>
                </div>
              ))}
              {filteredMovies.length === 0 && <p>No movies found.</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal fade show" style={{ display: "block" }} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Information</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                {modalContent}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCloseModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MainPage;
