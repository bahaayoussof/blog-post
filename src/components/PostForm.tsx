import React, { useState } from "react";
import { Post } from "../types";
import { useCreatePost, useUpdatePost } from "../lib/react-queries/mutations";

type PostFormProps = {
	open: boolean;
	onClose: () => void;
	post?: Post;
	action: "create" | "update";
};

const PostForm = ({ post, open, onClose, action }: PostFormProps) => {
	const [title, setTitle] = useState(post?.title || "");
	const [body, setBody] = useState(post?.body || "");

	const { mutateAsync: createPost } = useCreatePost();
	const { mutate: editPost } = useUpdatePost();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		try {
			if (action === "create") {
				createPost({ title, body });
				setTitle("");
				setBody("");
			} else {
				editPost({ id: post?.id, title, body });
			}
		} catch (error) {
			console.error(error);
		}

		onClose();
	};

	return (
		<>
			{open && (
				<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
					<div className="bg-white p-8 rounded-lg shadow-lg w-[40rem]">
						<h2 className="text-lg font-semibold mb-4">Post</h2>
						<form onSubmit={handleSubmit}>
							<div className="mb-4">
								<label htmlFor="title" className="block text-sm font-medium text-gray-700">
									Title
								</label>
								<input
									type="text"
									id="title"
									value={title}
									onChange={e => setTitle(e.target.value)}
									className="mt-1 block w-full border-gray-300 h-8 ring-none px-2 rounded-md shadow-sm sm:text-sm"
								/>
							</div>
							<div className="mb-4">
								<label
									htmlFor="description"
									className="block text-sm font-medium text-gray-700"
								>
									Description
								</label>
								<input
									type="text"
									id="description"
									value={body}
									onChange={e => setBody(e.target.value)}
									className="mt-1 block w-full border-gray-300 h-8 ring-none px-2 rounded-md shadow-sm sm:text-sm"
								/>
							</div>

							<div className="flex justify-end">
								<button
									type="button"
									className="px-4 py-2 mr-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
									onClick={onClose}
								>
									Cancel
								</button>
								<button
									disabled={!title || !body}
									type="submit"
									className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
								>
									Submit
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	);
};

export default PostForm;
