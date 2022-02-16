import React, { Component } from "react";

const inputTextTry1 = document.forms[0].input;
inputTextTry1.addEventListener('keyup', function(e){
        const term = e.target.value.toLowerCase();
        console.log(term);
    })

class searchBar extends Component {
    state = {
        searchText: "Write text for search here..." 
    };

    filterSearch = (inputTxt) => {
        inputTxt=''
     
        const regex = '/[A-Z]/g';

        const found = inputTxt.match(regex);
        return found;
       
    }

    render() {
        const { searchText } = this.state;

        if (!searchText || !searchText.length) {
            return <div className="loader">Searching...</div>;
        }

        return (
            <div>
                <div className="searchBar">
                    <input className="searchBar" onKeyup={this.filterSearch(this.value)} />
                 
                </div>
                <div className="searchResultTemp">

                </div>
            </div>
        );
    }
}

export default searchBar;
