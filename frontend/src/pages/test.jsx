import { useState } from "react";
import  uploadFile  from '../utils/mediaUpload.js';

const TestPage = () => {

    const [file, setFile] = useState(null);

    async function handleUpload() {
      const url = await uploadFile(file);
      console.log(url);
    }

    return (
      <div className="w-full h-full flex flex-col justify-center items-center"> 
          <input 
            type="file" 
            onChange={(e) => {
              setFile(e.target.files[0]);
            }} 
          />
          <button onClick={handleUpload} className="bg-red-900 p-2 text-white rounded-xl">
            Upload
          </button>
      </div>
    )
}
export default TestPage