import CustomerContact from './components/externalcontact'
import InternalContact from './components/internalcontact'
import staticjsondata from "./data/index.json"
function App() {

  //  Task
  //  create compoentns Internal and External contact 
  //  which would be reusable 

  // Solution
  // used about react compound components
  // created a provider to handle modal 
  // created useArray hook 
  //  

  return (
    <div>
      <div className='container'  >
      <InternalContact data={staticjsondata} />
      <CustomerContact data={staticjsondata}  />
      </div>
    </div>
  )
}

export default App