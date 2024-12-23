/* eslint-disable react/prop-types */

const Comment = ({ comment }) => {

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
                    <p className="text-[#6B6B6B] font-[500] text-base">{commenter}</p>
                    <p className="text-[#6B6B6B] text-[14px]">Commented on {comment_time}</p>
                </div>
            </div>
            <p className="">{comment.comment}</p>

        </div>
    );
};

export default Comment;