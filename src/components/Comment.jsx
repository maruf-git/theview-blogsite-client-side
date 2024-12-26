/* eslint-disable react/prop-types */

import { useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider";

const Comment = ({ comment }) => {
    const {themeMode}=useContext(ThemeContext);
    const { commenter, commenter_image, comment_time } = comment;
    return (
        <div className="border shadow-sm space-y-3 p-5 rounded-md">
            <div className="flex gap-3 items-center">
                <div className="avatar">
                    <div className="w-14 rounded-full">
                        <img referrerPolicy="no-referrer" src={commenter_image} />
                    </div>
                </div>
                <div>
                    <p className={`text-[#6B6B6B] font-[500] text-base] ${themeMode === "light" ? "" : "text-[rgb(166,173,187)]"}`}>{commenter}</p>
                    
                    <p className={`text-[#6B6B6B] text-[14px] dark:text-[rgb(166,173,187)] ${themeMode === "light" ? "" : "text-[rgb(166,173,187)]"}`}>Commented on {comment_time}</p>
                </div>
            </div>
            <p className="">{comment.comment}</p>

        </div>
    );
};

export default Comment;