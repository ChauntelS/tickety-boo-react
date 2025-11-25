import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Home.jsx'
import HauntCard from './ui/HauntCard.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HauntCard />
  </StrictMode>,
)
