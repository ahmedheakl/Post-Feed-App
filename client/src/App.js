import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";
import { AuthProvider } from "./context/authContext";
import CustomRoute from "./utils/CustomRoute";

import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Header from "./components/Header";
import PostPage from "./routes/PostPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <Header />
          <Route exact path="/" component={Home} />
          <CustomRoute exact path="/login" component={Login} />
          <CustomRoute exact path="/register" component={Register} />
          <Route exact path="/posts/:id" component={PostPage} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
