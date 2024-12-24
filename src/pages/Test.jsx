import { useContext, useEffect, useState } from "react";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import axios from "axios";

const columns = [
    {
        accessorKey: "blogger_name",
        header: "Blogger",
        cell: (props) => <p>{props.getValue()}</p>,
    },

    {
        accessorKey: "title",
        header: "Title",
        cell: (props) => <p>{props.getValue()}</p>,
    },
    {
        accessorKey: "length",
        header: "Length",
        cell: (props) => <p>{props.getValue()}</p>,
    },
];

const FeaturedBlogs = () => {
    
    const [data,setData]=useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URI}/featured-blogs`)
            .then(res => {
                console.log(res.data);
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    // table
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    console.log(table.getHeaderGroups())
    console.log(table.getRowModel().rows);

   
    return (
        <div className="max-w-screen-xl mx-auto">
            featured blogs:{data.length}
            <div>
                <div className="table">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <div className="tr grid grid-cols-3 gap-10" key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <div className="th" key={header.id}>
                                    {header.column.columnDef.header}
                                </div>
                            ))}
                        </div>))}
                    {
                        table.getRowModel().rows.map((row) => <div className="tr grid grid-cols-3 gap-10" key={row.id}>
                            {row.getVisibleCells().map(cell => <div className="td" key={cell.id}>
                                {
                                    flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )
                                }
                            </div>)}
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
};

// export default FeaturedBlogs;