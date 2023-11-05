import ExternalContact from './components/externalcontact'
import InternalContact from './components/internalcontact'
import staticjsondata from "./data/index.json"
function App() {
  return (
    <div>
      <div className='container'  >
      <InternalContact data={staticjsondata} />
      <ExternalContact data={staticjsondata}  />
      </div>
    </div>
  )
}

export default App