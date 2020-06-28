import React, { Component } from "react";
import PropTypes from "prop-types";

class Search extends Component {
   state = {
      text: "",
   };

   static propTypes = {
      searchUsers: PropTypes.func.isRequired,
      clearUsers: PropTypes.func.isRequired,
      showClear: PropTypes.bool.isRequired,
      setAlert: PropTypes.func.isRequired,
   };

   onChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
   };

   onSubmit = (e) => {
      e.preventDefault();
      if (!this.state.text) {
         this.props.setAlert("Please enter a searchterm", "light");
      } else {
         this.props.searchUsers(this.state.text);
         this.setState({ text: "" });
      }
   };

   render() {
      const { showClear, clearUsers } = this.props;
      return (
         <div>
            <form action="" className="form" onSubmit={this.onSubmit}>
               <input
                  type="text"
                  name="text"
                  placeholder="Search Users.."
                  value={this.state.text}
                  onChange={this.onChange}
               />
               <input
                  className="btn-dark btn-block"
                  value="Search..."
                  type="submit"
               />
            </form>
            {showClear && (
               <button className="btn btn-light btn-block" onClick={clearUsers}>
                  Clear
               </button>
            )}
         </div>
      );
   }
}

export default Search;