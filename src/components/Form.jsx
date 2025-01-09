import { useEffect, useState } from "react";
import { postPost, updatePost } from "../api/PostsAPI";

export const Form = ({ data, setData, setupdatedData, updatedData }) => {
    const [addData, setaddData] = useState(
        {
            title: "",
            body: ""
        })
        let isempty=Object.keys(updatedData).length===0;

    useEffect(() => {
        updatedData &&
            setaddData({
                title: updatedData.title || "",
                body: updatedData.body || ""

            })
    }, [updatedData])
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setaddData((prev) => ({ ...prev, [name]: value }))

    }

    const addPostData=async()=>{
        const res = await postPost(addData)
        try {
            if (res.status === 201) {
                const newPost = res.data;
                setData((prev) => [...prev, newPost])
                setaddData({ title: "", body: "" })

            } else {
                console.error("Failed to add post:", res.status);
            }
        } catch (error) {
            console.error("Error adding post:", error);
        }
    }

    const updatePostData=async()=>{
        try {
            
        const res=await updatePost(updatedData.id,addData)
        if(res.status===200){
            setData((prev)=>{
                return prev.map((curdata)=>{
                    return curdata.id === res.data.id? res.data : curdata;
                })
            }
        )
        }

        setaddData({title:"",body:""})
        setupdatedData({})
            
        } catch (error) {
            console.log(error)
        }
    }

    const handleFormSubmit =  (e) => {
        e.preventDefault();
        const action=e.nativeEvent.submitter.value;
        if (action ==="Add") {
            addPostData()
        } else if(action ==="Edit"){
            updatePostData();
        }
        
    }
    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label htmlFor="title"></label>
                    <input
                        type="text"
                        autoComplete="off"
                        id="title"
                        name="title"
                        placeholder="Add Title"
                        value={addData.title}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <label htmlFor="body"></label>
                    <input
                        type="text"
                        autoComplete="off"
                        placeholder="Add Post"
                        id="body"
                        name="body"
                        value={addData.body}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" value={isempty? "Add":"Edit"}>
                {isempty? "Add":"Edit"}
                </button>
            </form>
        </>
    )
}