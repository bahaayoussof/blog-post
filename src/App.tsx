import PostCard from "./components/PostCard";
import { useGetPosts } from "./lib/react-queries/queries";
import { Post } from "./types";

function App() {
	const { data, error, isLoading, fetchNextPage, isFetchingNextPage } = useGetPosts();

	if (isLoading) return <div>Loading.....!</div>;
	if (error) return <div>{error.message}</div>;

	return (
		<main className="p-8">
			<ul>
				{data?.pages?.map((page: Post[], index: number) => (
					<div key={index}>
						{page?.map((post: Post) => (
							<PostCard key={post.id} post={post} />
						))}
					</div>
				))}
			</ul>

			<button
				className=" bg-blue-100 px-4 py-2  mx-auto block rounded-md hover:bg-blue-200"
				disabled={isFetchingNextPage}
				onClick={() => fetchNextPage()}
			>
				Load More
			</button>
		</main>
	);
}

export default App;
