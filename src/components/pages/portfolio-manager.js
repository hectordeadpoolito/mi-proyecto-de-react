import React, { Component } from 'react';
import axios from 'axios';

import PortfolioSidebarList from '../portfolio/portfolio-sidebar-list';
import PortfolioForm from '../portfolio/portfolio-form';

export default class PortfolioManager extends Component {
    constructor() {
        super()

        this.state = {
            PortfolioItems: []
        }

        this.handleSuccessfulFormSubmission = this.handleSuccessfulFormSubmission.bind(this);
        this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this)
    }

    handleDeleteClick(PortfolioItem) {
        axios.delete(
            `https://api.devcamp.space/portfolio/portfolio_items/${PortfolioItem.id}`,
            {withCredentials: true}
        ).then(response => {
            this.setState({
                PortfolioItems: this.state.PortfolioItems.filter(item => {
                    return item.id !== PortfolioItem.id
                })
            })
            
            return response.data
        }).catch(error => {
            console.log("handleDeleteClick erorr", error);
        })
    }

    handleSuccessfulFormSubmission(PortfolioItem) {
        this.setState({
            PortfolioItems: [PortfolioItem].concat(this.state.PortfolioItems)
        })
    }

    handleFormSubmissionError(error) {
        console.log("handleFormSubmissionError error", error)
    }

    gertPortfolioItems() {
        axios.get('https://carlosleany.devcamp.space/portfolio/portfolio_items?order_by=created_at&direction=desc', {
            withCredentials : true
        }).then(response => {
            this.setState({
                PortfolioItems: [...response.data.portfolio_items]
            })
        }).catch(error => {
            console.log("error in getPortfolioItems", error)
        })
    }

    componentDidMount() {
        this.gertPortfolioItems();
    }

    render() {
        return (
            <div className="portfolio-manager-wrapper">
                <div className="left-column">
                    <PortfolioForm
                        handleSuccessfulFormSubmission = {this.handleSuccessfulFormSubmission}
                        handleFormSubmissionError = {this.handleFormSubmissionError}
                    />
                </div>

                <div className="right-column">
                    <PortfolioSidebarList 
                        handleDeleteClick={this.handleDeleteClick}
                        data={this.state.PortfolioItems} />
                </div>
            </div>
        )
    }
}