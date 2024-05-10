import { Plus } from "lucide-react";

type NavbarProps = {
	setOpenModal: (value: boolean) => void;
};

const Navbar = ({ setOpenModal }: NavbarProps) => {
	return (
		<nav className="flex w-full justify-between items-center p-4 shadow-sm">
			<h1 className="text-2xl font-semibold">Blog Post</h1>
			<button
				onClick={() => setOpenModal(true)}
				className="flex p-2 text-blue-600 bg-blue-200 cursor-pointer shadow-lg rounded-md hover:bg-blue-300 hover:text-blue-800"
			>
				<div className="flex items-center">
					<Plus className="w-5 h-5" />
					<span className="ml-2">Add Post</span>
				</div>
			</button>
		</nav>
	);
};

export default Navbar;
