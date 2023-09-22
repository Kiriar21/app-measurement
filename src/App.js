import './App.css'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Headers/Header/Header'
import Footer from './components/Footers/Footer/Footer'
import Main from './components/Main/Main/Main'
import MainLayout from './components/Layouts/MainLayout'
import Container from './components/Container/Container'
import MainNavigation from './components/Navigations/MainNavigation/MainNavigation'
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
import SettingsScore from './pages/Measurements/ActuallyMeasurements/AmSettingsScore/AmSettingScore'
import Statistic from './pages/Measurements/ActuallyMeasurements/AmStatistic/AmStatistic'

function App() {
  const header = (
    <Container> 
        <Header/>
        <MainNavigation/>
    </Container>  
  )
  const main = (
    <Main>
        <Routes>
          <Route path='/:id/statistic' element={<Statistic />} />
          <Route path='/:id/edit' element={<Edit />} />
          <Route path='/:id/list-competitors' element={<ListCompetitors />} />
          <Route path='/:id/settings-event' element={<SettingsEvent />} />
          <Route path='/:id/settings-score' element={<SettingsScore />} />
          <Route path='/:id/scores' element={<Scores />} />
          <Route path='/:id/export-scores' element={<ExportScores />} />
          <Route path='/new-measurement' element={<NewMeasurement />} />
          <Route path='/politics' element={<Politics />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Homepage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
    </Main>
  )

  const footer = (<Footer/>)
  
  return (         
      <Router> 
        <MainLayout
          header={header}
          main={main}
          footer={footer}
        />
      </Router>
  );
}

export default App;
