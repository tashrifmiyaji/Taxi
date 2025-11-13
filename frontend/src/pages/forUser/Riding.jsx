import { Link } from "react-router-dom";
import { IoLocation, IoHome } from "react-icons/io5";
import { FaMoneyCheckAlt } from "react-icons/fa";

const Riding = () => {
	return (
		<div className="h-screen">
			<Link
				to={"/home"}
				className="fixed bg-white w-8 h-8 flex items-center justify-center rounded-2xl right-2 top-2"
			>
				<IoHome />
			</Link>
			<div className="h-1/2">
				<img src="https://miro.medium.com/max/1280/0*gwMx05pqII5hbfmX.gif" />
			</div>
			<div className="h-1/2 p-2">
				<div>
					<div className="flex items-center justify-between">
						<img className="h-12" src="/pngwing.com.png" alt="" />
						<div className="text-right">
							<h2 className="text-lg font-medium">Sarthak</h2>
							<h4 className="text-xl font-semibold -mt-1 -mb-1">
								MB04 AB 123
							</h4>
							<p className="text-sm text-gray-600">
								Mercedes-Benz G63 AMG 🚙.
							</p>
						</div>
					</div>

					<div>
						<div className="w-full flex flex-col gap-5 py-2">
							<div className="flex items-center gap-5 pb-2 border-b-2 border-gray-400">
								<IoLocation />
								<div>
									<h3 className="font-bold text-2xl">
										562/11-A
									</h3>
									<p className="text-sm text-gray-600 -mt-1">
										Kankariya Talab, Bhopal
									</p>
								</div>
							</div>
							<div className="flex items-center gap-5 pb-2 border-b-2 border-gray-400">
								<IoLocation />
								<div>
									<h3 className="font-bold text-2xl">
										Third Wave Coffee
									</h3>
									<p className="text-sm text-gray-600 -mt-1">
										17th Cross Rd, PWD Quarters, 1st SEctor,{" "}
										<br /> HSR Layout, Bengaluru, Karnataka
									</p>
								</div>
							</div>
							<div className="flex items-center gap-5 pb-2">
								<FaMoneyCheckAlt />
								<div>
									<h3 className="font-bold text-2xl">400৳</h3>
									<p className="text-sm text-gray-600 -mt-1">
										Cash Cash
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<button className="w-full bg-green-600 text-white font-semibold p-2 rounded-lg active:border-2">
					Make a payment.
				</button>
			</div>
		</div>
	);
};

export default Riding;
