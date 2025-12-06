import { createClient } from '@supabase/supabase-js';


const Url = "https://znokniggkthlutncmjzf.supabase.co"
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpub2tuaWdna3RobHV0bmNtanpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5MzU4MDIsImV4cCI6MjA4MDUxMTgwMn0.xYB7mBxzL4O-QfZ2Yg0xpg0KkCg51bCJdWQqwkN0sps"

const supabase = createClient(Url, key);

export default function uploadFile(file) {

    return new Promise((resolve, reject) => {
        const timeStamp = Date.now();
        const fileName = timeStamp + '_' + file.name;
        supabase.storage.from('images').upload(fileName, file, {
            cacheControl: '3600',
            upsert: false,
            }).then(
                () => {
                    const publicUrl = supabase.storage.from('images').getPublicUrl(fileName).data.publicUrl;
                    resolve(publicUrl);
                }
            ).catch((error)=>{
                reject(error);
            })
            
    });
}