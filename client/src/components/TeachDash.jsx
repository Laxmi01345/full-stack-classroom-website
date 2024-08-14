
import Sidebar from './Sidebar';


const TeachDash = () => {
  

  return (
    <div className="flex relative">
      <Sidebar />
      <div className="flex-1 ml-64 p-4">
        <header className="bg-blue-400 text-white p-4 flex justify-between items-center">
         
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick="">
            Create Student Account
          </button>
        </header>
        
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4 text-white">Teachers</h2>
            
      </div>
      
    </div>
  );
};

export default TeachDash;
