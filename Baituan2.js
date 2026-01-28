async function LoadData() {
    try {
        let res = await fetch("http://localhost:3000/posts");
        let posts = await res.json();
        let body = document.getElementById("body_table");
        if (!body) return;
        body.innerHTML = '';
        
        for (const post of posts) {
            const style = post.isDeleted ? 'style="text-decoration: line-through; color: gray;"' : '';
            const deleteBtn = post.isDeleted ? '' : `<input type="button" value="Delete" onclick="Delete('${post.id}')"/>`;
            // Thêm nút Edit
            const editBtn = `<input type="button" value="Edit" onclick="EditPost('${post.id}')"/> `;

            body.innerHTML += `<tr ${style}>
                <td>${post.id}</td>
                <td>${post.title}</td>
                <td>${post.views}</td>
                <td>${editBtn}${deleteBtn}</td>
            </tr>`;
        }
    } catch (error) {
        console.error(error);
    }
}

async function EditPost(id) {
    try {
        let res = await fetch(`http://localhost:3000/posts/${id}`);
        if (!res.ok) return;
        let post = await res.json();
        
        // Đổ dữ liệu vào các ô Input
        document.getElementById("id_txt").value = post.id;
        document.getElementById("title_txt").value = post.title;
        document.getElementById("view_txt").value = post.views;
        
        console.log("Đã đổ dữ liệu post lên form");
    } catch (error) { console.error("Lỗi khi Edit:", error); }
}

async function Save() {
    let idInput = document.getElementById("id_txt");
    let titleInput = document.getElementById("title_txt");
    let viewInput = document.getElementById("view_txt");

    let id = idInput.value;
    let title = titleInput.value;
    let views = viewInput.value;

    let getItem = id ? await fetch('http://localhost:3000/posts/' + id) : { ok: false };

    if (getItem.ok) {
        let currentPost = await getItem.json();
        await fetch('http://localhost:3000/posts/' + id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: title,
                views: views,
                isDeleted: currentPost.isDeleted || false
            })
        });
    } else {
        let resAll = await fetch("http://localhost:3000/posts");
        let allPosts = await resAll.json();
        let maxId = allPosts.reduce((max, p) => Math.max(max, parseInt(p.id) || 0), 0);
        let newId = (maxId + 1).toString();

        await fetch('http://localhost:3000/posts', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: newId,
                title: title,
                views: views,
                isDeleted: false 
            })
        });
    }

    idInput.value = "";
    titleInput.value = "";
    viewInput.value = "";
    await LoadData();
}

async function Delete(id) {
    await fetch("http://localhost:3000/posts/" + id, {
        method: 'PATCH', 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isDeleted: true })
    });
    await LoadData();
}

async function LoadComments() {
    try {
        let res = await fetch("http://localhost:3000/comments");
        let comments = await res.json();
        let body = document.getElementById("body_comments");
        if(!body) return;
        body.innerHTML = '';
        for (const comment of comments) {
            const editBtn = `<input type="button" value="Edit" onclick="EditComment('${comment.id}')"/> `;
            body.innerHTML += `<tr>
                <td>${comment.id}</td>
                <td>${comment.text}</td>
                <td>${comment.postId}</td>
                <td>${editBtn}<input type="button" value="Delete" onclick="DeleteComment('${comment.id}')"/></td>
            </tr>`;
        }
    } catch (error) {
        console.error(error);
    }
}

// Hàm đổ dữ liệu Comment lên form để sửa
async function EditComment(id) {
    try {
        let res = await fetch(`http://localhost:3000/comments/${id}`);
        let comment = await res.json();
        
        document.getElementById("comment_id_txt").value = comment.id;
        document.getElementById("comment_txt").value = comment.text;
        document.getElementById("postId_txt").value = comment.postId;
    } catch (error) { console.error(error); }
}

async function SaveComment() {
    let idInput = document.getElementById("comment_id_txt");
    let textInput = document.getElementById("comment_txt");
    let postIdInput = document.getElementById("postId_txt");

    let id = idInput.value;
    let text = textInput.value;
    let postId = postIdInput.value;

    let getItem = id ? await fetch('http://localhost:3000/comments/' + id) : { ok: false };

    if (getItem.ok) {
        await fetch('http://localhost:3000/comments/' + id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text, postId })
        });
    } else {
        let resAll = await fetch("http://localhost:3000/comments");
        let allComm = await resAll.json();
        let maxId = allComm.reduce((max, c) => Math.max(max, parseInt(c.id) || 0), 0);
        
        await fetch('http://localhost:3000/comments', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: (maxId + 1).toString(),
                text: text,
                postId: postId
            })
        });
    }
    idInput.value = "";
    textInput.value = "";
    postIdInput.value = "";
    await LoadComments();
}

async function DeleteComment(id) {
    await fetch("http://localhost:3000/comments/" + id, { method: 'DELETE' });
    await LoadComments();
}

window.onload = function() {
    LoadData();
    LoadComments();
};