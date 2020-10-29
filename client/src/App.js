
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
function App() {
  return (
    <Switch>
      <Route path="/" component={Home} exact/>
      <Route path="/login" component={Login}/>
      <Route path="/signup" component={Signup}/>
    </Switch>
  );
}

export default App;
