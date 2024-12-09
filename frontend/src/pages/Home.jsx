
import { useState, useEffect } from "react";
import api from "../api";
import Task from "../components/Task"
import "../styles/Home.css"

function Home() {
    const [tasks, settasks] = useState([]);
    const [categories, setCategories] = useState([])
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [flag, setFlag] = useState("")
    const [category, setCategory] = useState("")

    useEffect(() => {
        gettasks();
        getcategories();
    }, []);

    const gettasks = () => {
        api
            .get("/api/tasks/")
            .then((res) => res.data)
            .then((data) => {
                settasks(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };
    const getcategories = () => {
        api
            .get("/api/category/")
            .then((res) => res.data)
            .then((data) => {
                setCategories(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };
    const deletetask = (id) => {
        api
            .delete(`/api/tasks/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Task deleted!");
                else alert("Failed to delete task.");
                gettasks();
            })
            .catch((error) => alert(error));
    };

    const createtask = (e) => {
        e.preventDefault();
        api
            .post("/api/tasks/", { content, title, flag, category })
            .then((res) => {
                if (res.status === 201) alert("Task created!");
                else alert("Failed to make task.");
                gettasks();
            })
            .catch((err) => alert(err));
    };

    return (
        <div>
            <div>
                <h2>Tasks</h2>
                {tasks.map((task) => (
                    <Task task={task} onDelete={deletetask} key={task.id} />
                ))}
            </div>
            <h2>Create a task</h2>
            <form onSubmit={createtask}>
                <label htmlFor="title">Название:</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <label htmlFor="content">Описание:</label>
                <br />
                <textarea
                    id="content"
                    name="content"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <br />
                <label htmlFor="flag">Flag:</label>
                <br />
                <input
                    type="text"
                    id="flag"
                    name="flag"
                    required
                    onChange={(e) => setFlag(e.target.value)}
                    value={flag}
                />
                <br />
                <label htmlFor="category">Категория:</label>
                <br />
                <select
                    id="category"
                    name="category"
                    required
                    default="Easy"
                    onChange={(e) => setCategory(e.target.value)}
                    // value={category}
                >
                    {categories.map((cat) => (
                    <option value={cat.id} key={cat.id}>{cat.title}</option>
                ))}
                </select>/
                <br />
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    );
}

export default Home;
