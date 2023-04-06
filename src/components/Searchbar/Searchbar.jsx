import propTypes from 'prop-types';
import { Component } from 'react';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  static propTypes = {
    onSubmit: propTypes.func.isRequired,
  };

  state = {
    value: '',
  };
  handleChange = e => {
    const inputValue = e.target.value;
    this.setState({ value: inputValue });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.value.trim() === '') {
      return alert('Ведіть дані для пошуку');
    }
    this.props.onSubmit(this.state.value.trim());
  };
  render() {
    return (
      <header>
        <form onSubmit={this.handleSubmit} className={css.searchForm}>
          <input
            value={this.state.value}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            className={css.searchInput}
            onChange={this.handleChange}
          />
          <button type="submit" className={css.searchBtn}>
            <span>Search</span>
          </button>
        </form>
      </header>
    );
  }
}
