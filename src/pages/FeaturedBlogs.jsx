import { useContext, useEffect, useState } from "react";
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const columns = [
    {
        accessorKey: "title",
        header: "Title",
        cell: (props) => props.getValue(),
    },
    {
        accessorKey: "blogger_name",
        header: "Blogger Name",
        cell: (props) => props.getValue(),
    },
    {
        accessorKey: "category",
        header: "Category",
        cell: (props) => props.getValue(),
    },
    {
        accessorKey: "length",
        header: "Length",
        cell: (props) => props.getValue(),
    },
];

const FeaturedBlogs = () => {

    const [blogs, setBlogs] = useState([]);
    const [sorting, setSorting] = useState([]);
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URI}/featured-blogs`)
            .then(res => {
                console.log(res.data);
                setBlogs(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    // table
    const table = useReactTable({
        data: blogs,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });
    // Sorting icon for each column based on its sort state
    const renderSortingIndicator = (column) => {
        if (column.getIsSorted()) {
            return column.getIsSorted() === "asc" ? "🔼" : "🔽";
        }
        return "↕️"; // Default icon when no sort
    };

    return (
        <div className="max-w-screen-xl mx-auto px-4 2xl:px-0">
            <Helmet>
                <title>Featured Blogs - TheView</title>
            </Helmet>
            <div className="my-10">
                <div>
                    <h1 className="font-bold text-4xl pl-2 border-l-[5px] py-5">Featured Blogs</h1>
                </div>
                {/* Add overflow-x-auto wrapper */}
                <div className="overflow-x-auto">
                    <table className="table-auto w-full text-left">
                        <thead className="bg-white text-black">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <th
                                            key={header.id}
                                            className="border px-6 py-3 cursor-pointer"
                                            onClick={header.column.getToggleSortingHandler()}
                                        >
                                            <div className="flex items-center justify-between">
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                                <span className="ml-2 text-lg">{renderSortingIndicator(header.column)}</span>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {table.getRowModel().rows.map((row) => (
                                <tr key={row.id} className="border-b">
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className="border px-6 py-4">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FeaturedBlogs;