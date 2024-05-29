const Modal = (props) => {
	const handleClose = () => {
		props.onClose();
	};

	return (
		<>
			{props.isOpen && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
					<div className="bg-white sm:p-3 p-1 rounded-lg sm:w-8/12 w-11/12">
						<div className="max-h-80 overflow-y-auto">
							<table className="table-auto w-full border sm:text-base text-xs">
								<thead className="sticky top-0">
									<tr className="bg-gray-300">
										<th className="px-4 py-2">Tanggal</th>
										<th className="px-4 py-2">Deskripsi</th>
										<th className="px-4 py-2">Nilai</th>
									</tr>
								</thead>
								<tbody>
									{
										props.viewDetail.data.map((val, idx) => {
											const tr_class = idx % 2 === 0 ? '' : 'bg-gray-100';
											return (
												<tr className={tr_class} key={val.id}>
													<td className="border sm:px-4 px-2 py-2">{val.date_v}</td>
													<td className="border sm:px-4 px-2 py-2">{val.desc}</td>
													<td className="border sm:px-4 px-2 py-2 text-right text-nowrap">{val.value_v}</td>
												</tr>
											)
										})
									}
								</tbody>
								<tfoot className="sticky bottom-0 bg-white">
									<tr>
										<th></th>
										<th className="sm:px-4 px-2 py-2 text-right">Total :</th>
										<th className="sm:px-4 px-2 py-2 text-right text-nowrap">{props.viewDetail.total}</th>
									</tr>
								</tfoot>
							</table>
						</div>
						<div className="mt-3 flex justify-end">
							<button
								className="bg-gray-300 px-3 py-1 rounded"
								onClick={handleClose}
							>
								Close
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Modal;
