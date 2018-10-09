import React from "react";
import { handleResponse } from "../../helpers";
import { API_URL } from "../../config";
import Loading from "../loding";
import Table from "./Table";
import Pagination from "./Pagination";

class List extends React.Component {
  constructor() {
    super();

    this.state = {
      loding: false,
      currencies: [],
      error: null,
      totalPages: 0,
      page: 1
    };
    this.handlePaginationClick = this.handlePaginationClick.bind(this);
  }

  componentDidMount() {
    this.fetchCurriencies();
  }

  fetchCurriencies() {
    this.setState({ loding: true });
    const { page } = this.state;
    fetch(`${API_URL}/cryptocurrencies?page=${page}&perPage=10`)
      .then(handleResponse)
      .then(data => {
        const { currencies, totalPages } = data;
        this.setState({
          currencies: currencies,
          totalPages: totalPages,
          loding: false
        });
      })
      .catch(error => {
        this.setState({ error: error.errorMessage, loding: false });
      });
  }

  handlePaginationClick(direction) {
    let nextPage = this.state.page;

    nextPage = direction === "next" ? nextPage + 1 : nextPage - 1;
    this.setState({ page: nextPage }, () => {
      //call fetchCurriencies function inside setState's callback
      //because we have to make sure first page state is updated
      this.fetchCurriencies();
    });
  }

  render() {
    const { loading, error, currencies, page, totalPages } = this.state;
    if (this.state.loding)
      return (
        <div className="loading-container">
          <Loading />
        </div>
      );
    if (this.state.error) {
      return <div className="error">{error}</div>;
    }
    return (
      <div>
        <Table currencies={currencies} />

        <Pagination
          page={page}
          totalPages={totalPages}
          handlePaginationClick={this.handlePaginationClick}
        />
      </div>
    );
  }
}
export default List;
