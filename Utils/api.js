import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL; 

export const postData = async (url, formData) => {
    try {
        const token = localStorage.getItem("accesstoken");
        console.log("Token being sent:", token);

        console.log("Full Request URL:", `${apiUrl}${url}`);
        const response = await fetch(`${apiUrl}${url}`, { 
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`, 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json(); // Parse JSON response
        console.log("Full API Response:", data);

        if (!response.ok) {
            console.error("Error in postData:", data.message || `HTTP error! Status: ${response.status}`);
            throw new Error(data.message || `HTTP error! Status: ${response.status}`);
        }
        

        return data; // Return successful response

    } catch (error) {
        console.error("Error in postData:", error);
        return { success: false, message: error.message || "Request failed" }; 
    }
};

export const editData = async (url, updatedData) => {
    const token = localStorage.getItem("accessToken");
    console.log("Token being sent:", token);

    const config = {
        method: "PUT",
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: updatedData,  // No JSON stringify because it's FormData
    };
    
    try {
        console.log("Sending Request to:",apiUrl+url);
        console.log("Request Data:", updatedData);
        
        const res = await fetch( apiUrl+url, config);
        const data = await res.json();

        console.log("Response Received:", data);
        return data;
    } catch (error) {
        console.error("Error in editData:", error);
        throw error;
    }
};



export const UpdateData = async (url, updatedData) => {
    const token = localStorage.getItem("accessToken");
    console.log("Token being sent:", token);

    const config = {
        method: "PUT",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData)
    };
    
    try {
        console.log("Sending Request to:",apiUrl+url);
        console.log("Request Data:", updatedData);
        
        const res = await fetch( apiUrl+url, config);
        const data = await res.json();

        console.log("Response Received:", data);
        return data;
    } catch (error) {
        console.error("Error in editData:", error);
        throw error;
    }
};

export const UploadImages = async (url, filesArray) => {
    const token = localStorage.getItem("accessToken");
    const formData = new FormData();

    
    filesArray.forEach((file) => {
      formData.append("images", file); 
    });
    console.log("Files array before appending to FormData:", filesArray);

    console.log("FormData before sending:", formData);
    for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1].name); // Log the field name and the file name
      }
    try {
      const res = await fetch(apiUrl + url, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          // DO NOT SET Content-Type manually for FormData
        },
        body: formData,
      });
  
      const data = await res.json();
      console.log("Upload Response:", data);
      return data;
    } catch (error) {
      console.error("Image upload failed:", error);
      throw error;
    }
  };
  

  export const postDataCategory = async (url, formData) => {
    try {
        const token = localStorage.getItem("accesstoken");
        console.log("Token being sent:", token);

        console.log("Full Request URL:", `${apiUrl}${url}`);

        const form = new FormData(); 

        form.append("name", formData.name); 

        if (formData.images && formData.images[0]) {
       form.append("image", formData.images[0]); 
    }
       const response = await fetch(`${apiUrl}${url}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: formData.name,
                parent_id: null,
                image: formData.images, // this assumes it’s a URL, not a File
              }),
        });

        const data = await response.json(); // Parse JSON response
        console.log("Full API Response:", data);

        if (!response.ok) {
            console.error("Error in postDataCategory:", data.message || `HTTP error! Status: ${response.status}`);
            throw new Error(data.message || `HTTP error! Status: ${response.status}`);
        }

        return data; // Return successful response

    } catch (error) {
        console.error("Error in postDataCategory:", error);
        return { success: false, message: error.message || "Request failed" };
    }
};

  
export const fetchDataFromApi = async (url) => {
    try {
      const token = localStorage.getItem("accessToken");
      const fullUrl = `${apiUrl}${url}`;
      console.log("Fetching from:", fullUrl);
  
      const res = await fetch(fullUrl, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
  
      if (!res.ok) {
        const errText = await res.text(); // log raw response
        console.error("API returned non-OK response:", errText);
        throw new Error(`HTTP Error ${res.status}`);
      }
  
      const data = await res.json();
      return data;
  
    } catch (err) {
      console.error("API Fetch Error:", err);
      return { success: false, message: err.message };
    }
  };
  
 
  export const editDataCat= async (url, updatedData) => {
    const token = localStorage.getItem("accessToken");
    console.log("Token being sent:", token);

    const config = {
        method: "PUT",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'  // IMPORTANT for JSON payload
        },
        body: JSON.stringify(updatedData)  // Convert JS object to JSON
    };
    
    try {
        console.log("Sending Request to:", apiUrl + url);
        console.log("Request Data:", updatedData);
        
        const res = await fetch(apiUrl + url, config);
        const data = await res.json();

        console.log("Response Received:", data);
        return data;
    } catch (error) {
        console.error("Error in editData:", error);
        throw error;
    }
};


export const deleteData=async(url)=>{
  const token = localStorage.getItem("accessToken");
  const config = {
    method: "DELETE",
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'  
    },
    
};
try {
  console.log("Sending Request to:", apiUrl + url);
   await axios.delete(apiUrl + url, config);
  
} catch (error) {
  console.error("Error in deleteData:", error);
  throw error;
}
}