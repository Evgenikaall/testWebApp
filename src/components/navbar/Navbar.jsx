const Navbar = () => {

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <div className="text-white mr-4">Logo</div>
                </div>
                <div className="lg:flex lg:items-center">
                    <ul className="lg:flex items-center">
                        <li className="text-white mr-6 cursor-pointer">Home</li>
                        <li className="text-white mr-6 cursor-pointer">About</li>
                        <li className="text-white mr-6 cursor-pointer">Services</li>
                        <li className="text-white mr-6 cursor-pointer">Contact</li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;