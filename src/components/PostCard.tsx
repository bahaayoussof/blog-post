import { useState } from "react";
import { Post } from "../types";
import { Pen, Trash } from "lucide-react";
import PostForm from "./PostForm";
import { useDeletePost } from "../lib/react-queries/mutations";

const PostCard = ({ post }: { post: Post }) => {
	const [showFullBody, setShowFullBody] = useState(false);
	const [openModal, setOpenModal] = useState(false);

	const { mutate: deletePost } = useDeletePost();

	const showFullBodyHandler = () => {
		setShowFullBody(!showFullBody);
	};

	const deletePostHandler = () => {
		deletePost(post.id!);
	};

	return (
		<>
			<div className="bg-white shadow-md rounded-md my-4  w-[40rem] mx-auto">
				<div className="flex items-center justify-between w-full shadow-sm px-2 ">
					<h2 className="text-2xl font-bod m-2">{post.id}</h2>
					<div className="flex gap-4">
						<Pen className="w-5 h-5 cursor-pointer" onClick={() => setOpenModal(true)} />
						<Trash
							className="w-5 h-5 text-red-600 cursor-pointer"
							onClick={deletePostHandler}
						/>
					</div>
				</div>
				<div className="p-4">
					<h3 className="text-xl font-semibold mb-2">{post.title}</h3>
					<p className="text-gray-700">
						{showFullBody ? post.body : `${post.body.slice(0, 100)}...`}
					</p>

					<button
						onClick={showFullBodyHandler}
						className="text-blue-600 mt-2 hover:text-blue-800 focus:outline-none"
					>
						{!showFullBody ? "Show More" : "Show Less"}
					</button>
				</div>
			</div>

			<PostForm
				action="update"
				post={post}
				open={openModal}
				onClose={() => setOpenModal(false)}
			/>
		</>
	);
};

export default PostCard;
