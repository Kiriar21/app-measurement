import { useReducer } from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Main from './components/Main/Main/Main'
import MainLayout from './components/Layouts/MainLayout'
import MeasurementLayout from './components/Layouts/MeasurementLayout'
import NotFound from './pages/404/404'
import Login from './pages/Login/Login'
import Homepage from './pages/Homepage/Homepage'
import Politics from './pages/Politics/Politics'
import NewMeasurement from './pages/Measurements/NewMeasurements/NewMeasurement/NewMeasurement'
import Edit from './pages/Measurements/ActuallyMeasurements/AmEdit/AmEdit'
import ExportScores from './pages/Measurements/ActuallyMeasurements/AmExportScores/AmExportScores'
import ListCompetitors from './pages/Measurements/ActuallyMeasurements/AmListCompetitors/AmListCompetitors'
import Scores from './pages/Measurements/ActuallyMeasurements/AmScores/AmScores'
import SettingsEvent from './pages/Measurements/ActuallyMeasurements/AmSettingsEvent/AmSettingsEvent'
import Statistic from './pages/Measurements/ActuallyMeasurements/AmStatistic/AmStatistic'
import { Reducer, initialState } from './Reducer'
import AuthContext from './context/AuthContext'

function App() {
  const [state, dispatch] = useReducer(Reducer, initialState)
  const main = (
    <Main>
        <Routes>
          <Route path='/new-measurement' element={<NewMeasurement />} />
          <Route path='/politics' element={<Politics />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Homepage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
    </Main>
  )  
  const main2 = (
    <Main>
        <Routes>
          <Route path='/:id/statistic' element={<Statistic />} />
          <Route path='/:id/edit' element={<Edit />} />
          <Route path='/:id/list-competitors' element={<ListCompetitors />} />
          <Route path='/:id/settings-event' element={<SettingsEvent />} />
          <Route path='/:id/scores' element={<Scores />} />
          <Route path='/:id/export-scores' element={<ExportScores />} />
        </Routes>
    </Main>
  ) 
  return (         
    <Router> 
      <AuthContext.Provider value={{
          user: state.user,
          login: (user) => dispatch({ type: 'set-login', user}),
          logout: () => dispatch({ type: 'set-logout' })
      }}>
      <Routes>
        <Route path="/*" element={<MeasurementLayout main={main2} />} >
          <Route path=':id/statistic' element={<Statistic />} />
          <Route path=':id/edit' element={<Edit />} />
          <Route path=':id/list-competitors' element={<ListCompetitors />} />
          <Route path=':id/settings-event' element={<SettingsEvent />} />
          <Route path=':id/scores' element={<Scores />} />
          <Route path=':id/export-scores' element={<ExportScores />} />
        </Route>
        <Route path="/*" element={<MainLayout main={main} />}>
          <Route path='new-measurement' element={<NewMeasurement />} />
          <Route path='politics' element={<Politics />} />
          <Route path='login' element={<Login />} />
          <Route path='' element={<Homepage />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
      </AuthContext.Provider>
    </Router>
);
}


export default App;
