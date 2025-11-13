import React from "react";
import { Link } from "react-router";

const Start = () => {
	return (
		<div>
			<div className=" home-page-bg-img h-screen w-full bg-red-400 flex justify-between flex-col">
				<div className="logo">Taxi</div>
				<div className="bg-white pb-7 py-5 px-8">
					<h2 className="text-2xl font-bold">Get Start With Taxi</h2>
					<Link
						to="/user-login"
						className=" flex justify-center w-full bg-black text-white py-3 rounded-2xl mt-2"
					>
						Continue →
					</Link>
				</div>
			</div>
		</div>
	);
};
export default Start;
