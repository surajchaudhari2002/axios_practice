import { useEffect, useState } from "react";
import { postPost } from "../api/PostsAPI";

export const Form = ({ data, setData, setupdatedData, updatedData }) => {
    const [addData, setaddData] = useState(
        {
            title: "",
            body: ""
        })

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

    const handleFormSubmit = async (e) => {
        e.preventDefault();
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
                <button type="submit" >
                    Add
                </button>
            </form>
        </>
    )
}