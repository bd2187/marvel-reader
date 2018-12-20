import React, { Component } from "react";

function MainContent(WrappedComponent, initialQueryForContent) {
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
            //     ? this.searchContent(this.props.match.params.query)
            //     : this.fetchContent(initialQueryForContent);
            // this.props.getAllFavorites();
            // document.addEventListener('scroll', this.handleScroll);
        }

        updateContent(contentArr = []) {
            this.setState({ content: contentArr });
        }

        toggleLoading(isLoading) {
            this.setState({ loading: isLoading });
        }

        fetchContent(query, endpoint) {
            this.setState({ loading: true });

            // axios
            // .get(endpoint)
            // .then(res => {
            //     this.setState(prevstate => {
            //         return {
            //             query,
            //             content: [this.state.content, ...res.data.data.results]
            //         };
            //     });

            //     this.setState({ loading: true });
            // })
            // .catch(err => {
            //     this.setState({ loading: true });
            // });
        }

        searchContent(endpoint, query) {
            this.setState({ content: [], loading: true });
            // this.props.history.push(`/comics/search/${query}`);

            // axios
            // .get(endpoint)
            // .then(res => {
            //     document.removeEventListener("scroll", this.handleScroll);
            //     this.setState({ content: res.data.data.results, loading: false });
            // })
            // .catch(err => {
            //     this.setState({loading: false});
            // });
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
