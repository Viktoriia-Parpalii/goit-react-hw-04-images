import { Component } from 'react';
import { BsSearch } from 'react-icons/bs';
import { toast } from 'react-toastify';

export class Searchbar extends Component {
  handleSearchSubmit = e => {
    e.preventDefault();
    const searchedImagesName =
      e.currentTarget.elements.searchedImagesName.value;
    if (searchedImagesName.trim() === '') {
      return toast.warning(`Cannot be empty`, { theme: 'colored' });
    }
    this.props.saveSearchedImagesNameInState(searchedImagesName);
    e.currentTarget.reset();
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSearchSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label "></span> <BsSearch />
          </button>

          <input
            className="SearchForm-input"
            type="text"
            name="searchedImagesName"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
