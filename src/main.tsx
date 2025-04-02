import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route,  Routes,  } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import DashboardPage from './pages/dashboard/page.tsx'
import SignupPaqge from './pages/signup/page.tsx'
import JobSearching from './pages/JobSearching/page.tsx'
import JobPosting from './pages/JobPosting/page.tsx'
import LoginPage from './pages/Login/page.tsx'
import JobDetails from './pages/JobDetails/page.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'




createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}/>
      <Route path='/dashboard' element={<DashboardPage/>}/>
      <Route path='/signup' element={<SignupPaqge/>}/>
      <Route path='/search-for-jobs' element={<JobSearching/>}/>
      <Route path='/start-hiring' element={<JobPosting/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path={`/job-detail/:jobid`} element={<JobDetails/>} />
    </Routes>
   
    </BrowserRouter>
    </Provider>
  </StrictMode>,
)
