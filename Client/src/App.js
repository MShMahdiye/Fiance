import './App.css';
import { Route, Routes } from 'react-router-dom';
import Hazine from './pages/Hazine';
import Daramad from './pages/Daramad';
import Home from './pages/Home';
import Dashboard from './components/Dashboard';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Tags from './components/Tags';
import Profile from './components/Profile';
import Createtags from './components/CreateTags';
import AllExpenses from './components/AllExpenses';
import { ChartComponent } from './components/Chart';
import ProfileInfo from './components/ProfileInfo';
import NotFound from './components/NotFound';
import ColorPicker from './components/ColorPicker';

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
        </Route>
      </Routes>
    </div>
  );
}

export default App;
