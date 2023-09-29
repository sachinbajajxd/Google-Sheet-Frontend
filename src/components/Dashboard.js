import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';


const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); 
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
        'https://googlesheetsapi.onrender.com/fetch-data'
      );
      toast.success("Fetched successfully");
      setData(response.data);
      setLoading(false);
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
        {loading ? <div><h1 className='font-bold'>Loading...</h1></div> : (
        <>
        <nav className="bg-blue-500 p-4 flex justify-between items-center">
            <div className="text-white font-bold text-lg">Home</div>
            <div>
            <button className="bg-white text-blue-500 font-bold py-2 px-4 rounded mr-4 hover:bg-blue-500 hover:text-white" onClick={fetchData}>
                Sync Data
            </button>
            <button className="bg-white text-blue-500 font-bold py-2 px-4 rounded hover:bg-blue-500 hover:text-white">
              <Link to = '/add'>
              Add Row
              </Link>
            </button>
            </div>
        </nav>
       <div className='pt-4 bg-indigo-100'>
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
       </>
      )}
    </div>
  );
}

export default Dashboard;
