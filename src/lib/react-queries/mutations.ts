/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Post } from "../../types";
import { createPost, deletePost, updatePost } from "../api";
import { QUERY_KEYS } from "./queryKeys";

export const useCreatePost = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (post: Post) => createPost(post),
		onSuccess: data => {
			queryClient.setQueryData<Post[]>([QUERY_KEYS.GET_POSTS, data.id], data);
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_POSTS],
			});
		},
	});
};

export const useUpdatePost = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (post: Post) => updatePost(post),
		onSuccess: data => {
			queryClient.setQueryData<Post[]>([QUERY_KEYS.GET_POST, data.id], data);
		},
	});
};

export const useDeletePost = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: number) => deletePost(id),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_POSTS],
			});
		},
	});
};
