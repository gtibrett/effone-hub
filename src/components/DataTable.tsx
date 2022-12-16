import {DataGrid, DataGridProps} from '@mui/x-data-grid';
import {AxiosResponse} from 'axios';
import {useEffect, useState} from 'react';
import Caxios from '../api/Caxios';

type DataTableProps = Omit<DataGridProps, 'rows'> & {
	dataUrl: string;
	cacheFor?: number;
	mapper?: (response: AxiosResponse) => any[]
}

const defaultMapper = (response: AxiosResponse) => response.data;

const DataTable = ({dataUrl, mapper = defaultMapper, cacheFor, ...props}: DataTableProps) => {
	const [rows, setRows] = useState<any[]>([]);
	
	useEffect(() => {
		if (dataUrl) {
			Caxios.get(dataUrl, undefined, cacheFor)
			      .then(mapper)
			      .then(data => {
				      setRows(data);
			      })
			      .catch(error => {
				      console.error(error);
				      setRows([]);
			      });
		}
		
	}, [dataUrl, setRows]);
	
	return <DataGrid {...props} rows={rows}/>;
};

export default DataTable;