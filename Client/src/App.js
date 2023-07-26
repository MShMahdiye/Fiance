import './App.css';
import { Route, Routes } from 'react-router-dom';
import Hazine from './pages/Hazine';
import Daramad from './pages/Daramad';
import Home from './pages/Home';
import Dashboard from './components/Dashboard';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Tags from './pages/Tags';
import Profile from './pages/Profile';
import Createtags from './pages/CreateTags';
import AllExpenses from './pages/AllExpenses';
import { ChartComponent } from './components/Chart';
import ProfileInfo from './pages/ProfileInfo';
import NotFound from './pages/NotFound';
import ColorPicker from './components/ColorPicker';
import Summary from './pages/Summary';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/signup'} element={<SignUp />} />
        <Route path={'*'} element={<NotFound />} />

        <Route path={'/dashboard/'} element={<Dashboard />}>
          <Route path={'edit'} element={<Profile />} />
          <Route path={'profileinfo'} element={<ProfileInfo />} />
          <Route path={'hazine'} element={<Hazine />} />
          <Route path={'allexpenses'} element={<AllExpenses />} />
          <Route path={'daramad'} element={<Daramad />} />
          <Route path={'createtag'} element={<Createtags />} />
          <Route path={'tags'} element={<Tags />} />
          <Route path={'chart'} element={<ChartComponent />} />
          <Route path={'colorpicker'} element={<ColorPicker />} />
          <Route path={'summary'} element={<Summary />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
