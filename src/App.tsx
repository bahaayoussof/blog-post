import { useState } from "react";
import PostCard from "./components/PostCard";
import PostForm from "./components/PostForm";
import { useGetPosts } from "./lib/react-queries/queries";
import { Post } from "./types";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import { Toaster } from "react-hot-toast";

function App() {
	const [openModal, setOpenModal] = useState(false);
	const { data, error, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } =
		useGetPosts();

	const [searchQuery, setSearchQuery] = useState("");

	const filteredPosts = data?.pages.map(page =>
		page.filter(
			(post: Post) =>
				post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				post.body.toLowerCase().includes(searchQuery.toLowerCase())
		)
	);

	const handleSearch = (query: string) => {
		setSearchQuery(query);
	};

	if (isLoading) return <div>Loading.....!</div>;
	if (error) return <div>{error.message}</div>;

	return (
		<>
			<Navbar setOpenModal={setOpenModal} />
			<main className="p-4">
				<Search onSearch={handleSearch} />
				{filteredPosts?.map((page: Post[], index: number) => (
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
			<Toaster />
		</>
	);
}

export default App;
