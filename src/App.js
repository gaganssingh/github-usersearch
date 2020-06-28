import React, { useState, Fragment } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import User from "./components/users/User";
import "./App.css";

const baseUrl = "https://api.github.com";

const App = () => {
   const [users, setUsers] = useState([]);
   const [user, setUser] = useState({});
   const [repos, setRepos] = useState([]);
   const [loading, setLoading] = useState(false);
   const [alert, setAlert] = useState(null);

   // Search github users
   const searchUsers = async (text) => {
      setLoading(true);

      const res = await axios.get(
         `${baseUrl}/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );

      setUsers(res.data.items);
      setLoading(false);
   };

   // Get a single user
   const getUser = async (username) => {
      setLoading(true);

      const res = await axios.get(
         `${baseUrl}/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );

      setUser(res.data);
      setLoading(false);
   };

   // Get selected users repos
   const getUserRepos = async (username) => {
      setLoading(true);

      const res = await axios.get(
         `${baseUrl}/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );

      setRepos(res.data);
      setLoading(false);
   };

   const clearUsers = () => {
      setUsers([]);
      setLoading(false);
   };

   const showAlert = (msg, type) => {
      setAlert({ msg, type });

      setTimeout(() => setAlert(null), 3000);
   };

   return (
      <Router>
         <div className="App">
            <Navbar />
            <div className="container">
               <Alert alert={alert} />
               <Switch>
                  <Route
                     path="/"
                     exact
                     render={(props) => (
                        <Fragment>
                           <Search
                              searchUsers={searchUsers}
                              clearUsers={clearUsers}
                              showClear={users.length > 0 ? true : false}
                              setAlert={showAlert}
                           />

                           <Users loading={loading} users={users} />
                        </Fragment>
                     )}
                  />
                  <Route path="/about" exact component={About} />
                  <Route
                     path="/user/:login"
                     exact
                     render={(props) => (
                        <User
                           {...props}
                           getUser={getUser}
                           getUserRepos={getUserRepos}
                           repos={repos}
                           user={user}
                           loading={loading}
                        />
                     )}
                  />
               </Switch>
            </div>
         </div>
      </Router>
   );
};

export default App;
