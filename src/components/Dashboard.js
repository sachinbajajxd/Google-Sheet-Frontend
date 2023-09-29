import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';


const Dashboard = () => {
  const [data, setData] = useState([]);
  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'ID',
      },
      {
        Header: 'Avatar Name',
        accessor: 'Avatar Name',
      },
      {
        Header: 'Performance Score',
        accessor: 'Performance Score',
      },
    ],
    []
  );

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/fetch-data'
      );
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <div className="">
        <nav className="bg-blue-500 p-4 flex justify-between items-center">
            <div className="text-white font-bold text-lg">Home</div>
            <div>
            <button className="bg-white text-blue-500 font-bold py-2 px-4 rounded mr-4 hover:bg-blue-500 hover:text-white" onClick={fetchData}>
                Sync Data
            </button>
            <button className="bg-white text-blue-500 font-bold py-2 px-4 rounded hover:bg-blue-500 hover:text-white">
                Add Data
            </button>
            </div>
        </nav>
       <div className='pt-4 bg-indigo-100'>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 sm:mb-2 md:mb-4 lg:mb-2 xl:mb-4" onClick={fetchData}>
                Sync Data
            </button>
            <div className="overflow-x-auto flex items-center justify-center">
                <table {...getTableProps()} className="table-auto w-auto border-collapse border">
                    <thead className="bg-gray-800 text-white">
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th
                            {...column.getHeaderProps()}
                            className="p-2 sm:p-4 md:p-6 lg:p-8 xl:p-10 font-semibold text-left border-b"
                            >
                            {column.render('Header')}
                            </th>
                        ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                    {rows.map((row, rowIndex) => {
                        prepareRow(row);
                        return (
                        <tr
                            {...row.getRowProps()}
                            className={rowIndex % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                        >
                            {row.cells.map((cell) => {
                            return (
                                <td
                                {...cell.getCellProps()}
                                className="p-2 sm:p-4 md:p-6 lg:p-8 xl:p-10 border"
                                >
                                {cell.render('Cell')}
                                </td>
                            );
                            })}
                        </tr>
                        );
                    })}
                    </tbody>
                </table>
                </div>

       </div> 
      
    </div>
  );
}

export default Dashboard;
