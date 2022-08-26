import IPost from "../interfaces/IPost";

interface PostProps {
    post: IPost;
}

export default function Post({ post }: PostProps) {
    return (<div>
        <div>{post.id}</div>
        <div>{post.title}</div>
        <div>{post.content}</div>
        <div>{post.votes}</div>
        <div>{post.user.id}</div>
        <div>{post.user.username}</div>
        <div>{post.createdAt}</div>
        <div>{post.updatedAt}</div>
    </div>)
}