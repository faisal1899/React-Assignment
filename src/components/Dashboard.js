import React, { Component } from 'react';
import api from '../api';
import DashboardSearch from './DashboardSearch';
import Movie from './Movie';
import DashboardSort from './DashboardSort';

class Dashboard extends Component {
  state = {
    page: 1,
    searchText: '',
    type: '',
    filterChanged: false,
    movies: [],
    disableSearch: false,
    totalResults: 0,
    year: '',
    sortBy: '',
    sortOrder: 'asc',
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  // TODO: Move the api call logic to action file.
  fetchData = () => {
    this.setState({ disableSearch: true });
    const { page, searchText, year, type } = this.state;
    const params = { page, s: searchText };
    if (!searchText) {
      this.setState({ movies: [] });
      return;
    }
    if (type) {
      params['type'] = type;
    }
    if (year) {
      params['y'] = year;
    }
    api.get('', { params })
      .then(res => {
        if (
          !res ||
          !res.data ||
          !res.data.Search
        ) {
          this.setState({ movies: [], totalResults: 0 });
          return;
        }
        const { filterChanged } = this.state;
        if (filterChanged) {
          this.setState({
            movies: res.data.Search,
            filterChanged: false,
            totalResults: res.data.totalResults,
          });
        } else {
          this.setState(({ movies }) => ({ movies: [...movies, ...res.data.Search]}));
        }
        setTimeout(this.sortMovies);
      })
      .finally(() => {
        this.setState({ disableSearch: false });
      });
  }

  onSearch = (searchInputs) => {
    this.setState({...searchInputs});
    setTimeout(this.fetchData);
  }

  onFilterChange = (filterChanged) => {
    this.setState({ filterChanged, page: 1 });
    if (filterChanged) {
      if (this.state.sortBy) {
        this.setState({ sortBy: '', sortOrder: 'asc' });
      }
    }
  }

  sortMovies = () => {
    const { sortBy, sortOrder, movies } = this.state;
    if (sortBy === 'Title') {
      movies.sort(function (a, b) {
        if (sortOrder === 'asc') {
          return a[sortBy].localeCompare(b[sortBy]);
        }
        return b[sortBy].localeCompare(a[sortBy]);
      });
    } else {
      movies.sort(function (a, b) {
        if (sortOrder === 'asc') {
          return a[sortBy] - b[sortBy];
        }
        return b[sortBy] - a[sortBy];
      });
    }
    this.setState({ movies });
  }

  onSort = ({ sortBy, sortOrder }) => {
    this.setState({ sortBy, sortOrder });
    if (!this.state.movies.length) {
      return;
    }
    setTimeout(this.sortMovies);
  }

  handleScroll = () =>  {
    if (
      this.state.disableSearch ||
      !this.state.movies.length
    ) {
      return;
    }
    if (this.state.totalResults <= this.state.movies.length) {
      return;
    }
    const wrappedElement = document.getElementById('dashboard');
    if (wrappedElement.getBoundingClientRect().bottom <= window.innerHeight + 10) {
      this.setState(({ page }) => ({ page: page + 1}));
      setTimeout(this.fetchData);
    }
  }

  renderMovieList() {
    return this.state.movies.map(movie => {
      return (
        <Movie key={movie.imdbID} movie={movie}/>
      )
    });
  }
  renderMovies() {
    if (!this.state.movies.length) {
      return (
        <div>No records found</div>
      );
    }
    return(
      <ul className="movieList clearfix">
        {this.renderMovieList()}
      </ul>
    )
  }

  render() {
    return (
      <div id="dashboard" className="container">
        <h1>Dashboard</h1>
        <div className="clearfix">
          <DashboardSearch
            searchText={this.state.searchText}
            type={this.state.type}
            year={this.state.year}
            onFilterChange={this.onFilterChange}
            onSearch={this.onSearch}
          />
          <DashboardSort
            sortBy={this.state.sortBy}
            sortOrder={this.state.sortOrder}
            onSort={this.onSort}
          />
        </div>
        <div>
          {this.renderMovies()}
        </div>
      </div>
    );
  }
}

export default Dashboard;