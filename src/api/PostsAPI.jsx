import axios from "axios"

const api=axios.create({
    baseURL:"https://jsonplaceholder.typicode.com",
})

// get method
export const getPosts=()=>{
    return api.get("/posts")
}

// delete method 
export const deletePost=(id)=>{
    return api.delete(`/posts/${id}`)

}
// post method
export const postPost=(post)=>{
    return api.post("/posts",post)
}