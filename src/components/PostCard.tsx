import { useState } from "react";
import { Post } from "../types";

const PostCard = ({ post }: { post: Post }) => {
	const [showFullBody, setShowFullBody] = useState(false);

	const showFullBodyHandler = () => {
		setShowFullBody(!showFullBody);
	};

	return (
		<div className="bg-white shadow-md rounded-xl p-4 mb-4 w-[40rem] mx-auto">
			<h2 className="text-2xl font-bod mb-2">{post.id}</h2>
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
	);
};

export default PostCard;
