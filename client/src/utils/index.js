import axios from "axios";
const API_URL = 'http://localhost:8800/api-v1/' ;

export const API = axios.create({
    baseURL: API_URL,
    responseType: "json",
});

export const apiRequest = async({url, token, data, method}) => {
    try {
        
        const result  =  await API(url, {
            method: method,
            data:data,
            headers: {
                "content-Type": "application/json",
                Authorization : token ?  `Bearer ${token}` : "",

            }
        });
        return result?.data;
    } catch (error) {
        const err = error.response.data;
        console.log(err);
        return {
            status : err.success, message : err.message 
        };

    }
};

export const handleFileUpload = async(uploadFile)=>{
    const formData1 = new FormData;
    formData1.append("file", uploadFile); 
    formData1.append("upload_preset","hiring-catalyst");
    
    
    try {
        const cloudinary_URl = "https://api.cloudinary.com/v1_1/dx4frj9pt/image/upload"
        const response = await axios.post(cloudinary_URl,formData1);
        return response.data.secure_url;

    }
     catch (error) {
        console.error(error.message);
        console.log(error);
    }
}


export const updateURL = ({
    pageNum,
    query,
    cmpLoc,
    sort,
    navigate,
    location,
    jType,
    exp,
}) => {
    const params =  new URLSearchParams();

    if (pageNum && pageNum >1) {
        params.set("page",pageNum);
    }
    if (query) {
        params.set("search", query);
    }
    if (cmpLoc) {
        params.set("location", cmpLoc);
    }
    if (sort) {
        params.set("sort", sort);
    }
    if(jType){
        params.set("jType",jType);
    }
    if(exp){
        params.set("exp",exp);
    }

    const newURL = `${location.pathname}?${params.toString()}`;
    navigate(newURL,{replace:true});

    return newURL;
}

