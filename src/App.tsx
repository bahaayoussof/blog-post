import { useState } from "react";
import PostCard from "./components/PostCard";
import PostForm from "./components/PostForm";
import { useGetPosts } from "./lib/react-queries/queries";
import { Post } from "./types";
import Navbar from "./components/Navbar";

function App() {
	const [openModal, setOpenModal] = useState(false);
	const { data, error, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } =
		useGetPosts();

	if (isLoading) return <div>Loading.....!</div>;
	if (error) return <div>{error.message}</div>;

	return (
		<>
			<Navbar setOpenModal={setOpenModal} />
			<main className="p-4">
				{data?.pages?.map((page: Post[], index: number) => (
					<div key={index}>
						{page?.map((post: Post) => (
							<PostCard key={post.id} post={post} />
						))}
					</div>
				))}

				{hasNextPage && (
					<button
						className=" bg-blue-100 px-4 py-2  mx-auto block rounded-md hover:bg-blue-200"
						disabled={isFetchingNextPage}
						onClick={() => fetchNextPage()}
					>
						Load More
					</button>
				)}
			</main>

			<PostForm action="create" open={openModal} onClose={() => setOpenModal(false)} />
		</>
	);
}

export default App;
