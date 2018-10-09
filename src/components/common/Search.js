import React from "react";
import "./Search.css";
import { API_URL } from "../../config";
import { handleChange, handleResponse } from "../../helpers";
import Loading from "../loding";
import { withRouter } from "react-router-dom";

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      searchResults: [],
      searchQuery: "",
      loading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  handleChange(event) {
    const searchQuery = event.target.value;

    this.setState({ searchQuery: searchQuery });

    if (!searchQuery) {
      return "";
    }

    this.setState({ loading: true });
    fetch(`${API_URL}/autocomplete?searchQuery=${searchQuery}`)
      .then(handleResponse)
      .then(result => {
        this.setState({ loading: false, searchResults: result });
      });
  }

  handleRedirect(CurrencyId) {
    this.setState({
      searchQuery: "",
      searchResults: []
    });

    this.props.history.push(`/currency/${CurrencyId}`);
  }

  renderSearchResult() {
    const { searchResults, searchQuery, loading } = this.state;

    if (!searchQuery) {
      return "";
    }

    if (searchResults.length > 0) {
      return (
        <div className="Search-result-container">
          {searchResults.map(result => (
            <div
              key={result.id}
              className="Search-result"
              onClick={() => this.handleRedirect(result.id)}
            >
              {result.name}({result.symbol})
            </div>
          ))}
        </div>
      );
    }

    if (!loading) {
      return (
        <div className="Search-result-container">
          <div className="Serach-no-result">No results found.</div>
        </div>
      );
    }
  }

  render() {
    const { loading, searchQuery } = this.state;

    return (
      <div className="Search">
        <span className="Search-icon" />
        <input
          className="Search-input"
          type="text"
          placeholder="Currency Name"
          onChange={this.handleChange}
          value={searchQuery}
        />
        {loading && (
          <div className="Search-loading">
            <Loading width="12px" height="12px" />
          </div>
        )}
        {this.renderSearchResult()}
      </div>
    );
  }
}
export default withRouter(Search);
