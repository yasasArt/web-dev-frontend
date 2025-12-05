import React from 'react'

const TestPage = () => {

  
    // https://znokniggkthlutncmjzf.supabase.co

    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpub2tuaWdna3RobHV0bmNtanpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5MzU4MDIsImV4cCI6MjA4MDUxMTgwMn0.xYB7mBxzL4O-QfZ2Yg0xpg0KkCg51bCJdWQqwkN0sps

    const [file, setFile] =useState(null);

    function handleUpload(){
      console.log(file);
    }
    
  return (
    <div className="w-full h-full flex flex-col justify-center items-center"> 
        <input type="file" onChange={
          (e)=>{
            FileSystemFileEntry(e.target.file[0]);
          }
          
        } />
  <button className="bg-red-900 p-2 text-white rounded-xl">Upload</button>
    </div>
  )
}

export default TestPage