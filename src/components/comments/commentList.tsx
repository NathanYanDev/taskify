"use client";

import { deleteComment } from "@src/app/api/utils/deleteComment";
import type { CommentWithID } from "@src/app/api/utils/getComments";
import { TrashIcon } from "lucide-react";
import type { Session } from "next-auth";

import { motion } from "motion/react";

type CommentListProps = {
	comments: CommentWithID[] | undefined | null;
	session: Session | null;
};

export const CommentList = ({ comments, session }: CommentListProps) => {
	return (
		<>
			{comments ? (
				comments.map((comment, index) => (
					<motion.div
						key={comment.id}
						initial={{ opacity: 0, x: -100 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{
							delay: index * 0.3,
							duration: 0.5,
							ease: "easeOut",
						}}
					>
						<article
							key={comment.id}
							className="border border-gray-400 p-4 rounded mb-4 w-full"
						>
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<span className="bg-gray-200 py-1 px-2 mr-2 rounded">
										{comment.createdBy.name}
									</span>
									<span>
										{comment.createdAt.toLocaleDateString(
											"pt-BR",
										)}
									</span>
								</div>
								{session &&
								session.user?.email ===
									comment.createdBy.email ? (
									<button
										type="button"
										onClick={() =>
											deleteComment(
												comment.id,
												comment.taskID,
											)
										}
									>
										<TrashIcon color={"#f00"} />
									</button>
								) : (
									<></>
								)}
							</div>
							<p className="mt-6 whitespace-pre-wrap">
								{comment.comment}
							</p>
						</article>
					</motion.div>
				))
			) : (
				<span>Essa tarefa não possui comentários</span>
			)}
		</>
	);
};
