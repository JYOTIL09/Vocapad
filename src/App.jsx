import "./App.css";
import TextEditor from "./components/editor/TextEditor";
import RegistrationForm from "./components/RegistrationForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      
      <div className="p-2 bg-blue-100 text-white">
        <TextEditor />
      </div>

      <div className="p-4">
        <RegistrationForm />
      </div>
    </>
  );
}

export default App;