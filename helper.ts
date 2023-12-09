export function getOffset(currentPage = 1, listPerPage:any) {
	return (currentPage - 1) * listPerPage;
}

export function emptyOrRows(rows) {
	if (!rows) {
		return [];
	}
	return rows;
}

