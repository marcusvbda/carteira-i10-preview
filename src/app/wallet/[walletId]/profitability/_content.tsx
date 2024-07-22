'use client';
import { ReactNode, useContext } from 'react';
import 'react-select2-wrapper/css/select2.css';
import { ThemeContext } from '@/context/themeContext';
import CompareChart from './_compareChart';
import Summary from './_summary';
import TableList from './_tableList';
export default function PageContent({
	tableData,
	summaryData,
}: any): ReactNode {
	const { theme } = useContext(ThemeContext);

	return (
		<div id="profitabily" className="page-container">
			<div className="flex-row">
				<Summary data={summaryData} />
				<CompareChart theme={theme} />
			</div>
			<TableList tableData={tableData} theme={theme} />
		</div>
	);
}
