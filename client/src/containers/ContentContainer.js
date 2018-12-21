import React, { Component } from "react";
import axios from "axios";

function MainContent(
    WrappedComponent,
    initialQueryForContent,
    category,
    updateQueryCb,
    generateEndpoint
) {
    return class ContentContainer extends Component {
        constructor(props) {
            super(props);

            this.state = {
                loading: false,
                content: []
            };

            this.toggleLoading = this.toggleLoading.bind(this);
            this.updateContent = this.updateContent.bind(this);
        }

        componentDidMount() {
            // this.props.match.params.query
            //     ? this.searchContent(this.props.match.params.query, category)
            //     : this.fetchContent(initialQueryForContent);
            // // this.props.getAllFavorites();
            // document.addEventListener("scroll", this.handleScroll);
        }

        updateContent(contentArr = []) {
            this.setState({ content: contentArr });
        }

        toggleLoading(isLoading) {
            this.setState({ loading: isLoading });
        }

        fetchContent(query) {
            this.setState({ loading: true });

            var endpoint = generateEndpoint("update", query);

            axios
                .get(endpoint)
                .then(res => {
                    this.setState(() => {
                        return {
                            query: query,
                            content: [
                                this.state.content,
                                ...res.data.data.results
                            ]
                        };
                    });

                    this.setState({ loading: true });
                })
                .catch(err => {
                    this.setState({ loading: true });
                });
        }

        handleScroll() {
            if (
                window.innerHeight + window.scrollY >=
                    document.body.offsetHeight &&
                this.state.query &&
                !this.state.loading
            ) {
                this.fetchContent(this.updateQuery());
            }
        }

        updateQuery() {
            var updatedQuery = updateQueryCb(this.state.query);
            this.setState(updatedQuery);
            return updatedQuery;
        }

        searchContent(endpoint, query) {
            this.setState({ content: [], loading: true });
            this.props.history.push(`/comics/search/${query}`);

            axios
                .get(endpoint)
                .then(res => {
                    document.removeEventListener("scroll", this.handleScroll);
                    this.setState({
                        content: res.data.data.results,
                        loading: false
                    });
                })
                .catch(err => {
                    this.setState({ loading: false });
                });
        }

        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    loading={this.state.loading}
                    toggleLoading={this.toggleLoading}
                    content={this.state.content}
                    updateContent={this.updateContent}
                />
            );
        }
    };
}

export default MainContent;
