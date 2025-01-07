import { useEffect } from "react"
import "../App.css"
import { getPosts, deletePost } from "../api/PostsAPI"
import { useState } from "react"
import { Form } from "./Form"
export const Posts = () => {
    const [data, setData] = useState([])
    const[updatedData,setupdatedData]=useState({})

    const getPostdata = async () => {
        const res = await getPosts();
        console.log(res.data)
        setData(res.data)
    }

    const handleUpdatate=(curdata)=>setupdatedData(curdata);

    const handleDelete = async (id) => {

        try {
            const res = await deletePost(id)
            if (res.status === 200) {
                const newUpdatedposts = data.filter((curPost) => {
                    return curPost.id !== id
                });
                setData(newUpdatedposts);
            }
            else{
                console.log("Failed to delete the post:", res.status);
            }
        } 
        
        catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        getPostdata();
    }, [])
    return (
        <>
        <section className="section-form">
            <Form data={data} setData={setData} updatedData={updatedData} setupdatedData={setupdatedData}/>
        </section>
            <section className="section-post">
                <ol>
                    {
                        data.map((curdata) => {
                            const { id, title, body } = curdata;
                            return (
                                <li key={id}>
                                    <p>Title : {title}</p>
                                    <p>Body : {body}</p>
                                    <button onClick={()=>handleUpdatate(curdata)}>Edit</button>
                                    <button className="btn-delete" onClick={() => handleDelete(id)}>Delete</button>
                                </li>
                            )
                        })
                    }
                </ol>
            </section>
        </>
    )
}