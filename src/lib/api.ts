import axios from "axios";
import { Post } from "../types";

// Create an Axios instance
const instance = axios.create({
	baseURL: "https://jsonplaceholder.typicode.com",
	headers: {
		"Content-Type": "application/json",
	},
});

export const getPosts = async ({ pageParam }: { pageParam: number }) => {
	return (
		await instance.get("/posts", {
			params: {
				_page: pageParam,
				_limit: 10,
			},
		})
	).data;
};

export const getPostById = async (id: number) => {
	return (await instance.get(`/posts/${id}`)).data;
};

export const createPost = async (post: Post) => {
	return (await instance.post("/posts", post)).data;
};

export const updatePost = async (post: Post) => {
	return (await instance.put(`/posts/${post.id}`, post)).data;
};

export const deletePost = async (id: number) => {
	return (await instance.delete(`/posts/${id}`)).data;
};
