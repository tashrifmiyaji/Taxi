import { IoLocation } from "react-icons/io5";
import { FaMoneyCheckAlt } from "react-icons/fa";

const LockingForADriver = (props) => {
	try {
		return (
			<div>
				<h5
					className=" w-full pb-3 pt-2 text-center absolute top-0 left-0 text-2xl bg-gray-200 text-gray-500 rounded-2xl"
					onClick={() => {
						props.setLockingForADriverPanel(false);
					}}
				>
					⊻
				</h5>
				<h3 className="text-2xl font-semibold mt-10 mb-5">
					Locking For A Driver...
				</h3>
				<div className="flex flex-col justify-between items-center gap-3">
					<img className="h-20" src="/pngwing.com.png" alt="" />
					<div className="w-full flex flex-col gap-5 py-5">
						<div className="flex items-center gap-5 pb-2 border-b-2 border-gray-400">
							<IoLocation />
							<div>
								<h3 className="font-bold text-2xl">562/11-A</h3>
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
		);
	} catch (error) {
		console.log(error);
	}
};

export default LockingForADriver;
