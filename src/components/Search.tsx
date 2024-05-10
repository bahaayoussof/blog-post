import React from "react";

type SearchProps = {
	onSearch: (query: string) => void;
};

const Search = ({ onSearch }: SearchProps) => {
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const query = e.target.value;
		onSearch(query);
	};

	return (
		<div className="mb-4 w-[40rem] mx-auto">
			<input
				type="text"
				placeholder="Search posts..."
				onChange={handleSearchChange}
				className="border border-gray-300 rounded-lg px-4 py-2 w-full"
			/>
		</div>
	);
};

export default Search;
