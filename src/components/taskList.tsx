"use client";

import { Share2Icon, TrashIcon } from "lucide-react";
import type { TaskWithId } from "@src/app/api/utils/getTasks";

import { useState } from "react";

type TaskListProps = {
	tasks: TaskWithId[];
};

export const TaskList = ({ tasks }: TaskListProps) => {
	return (
		<>
			{tasks.map((task) => (
				<article
					className="mb-[14px] flex flex-col items-start border border-gray-400 rounded p-[14px]"
					key={task.id}
				>
					<div className="flex items-center justify-center gap-3 mb-2">
						<span className="text-gray-400">
							{task.createdAt.toLocaleDateString("pt-BR")}
						</span>
						{task.isPublic && (
							<>
								<span className="bg-secondary text-primary py-[2px] px-[6px] rounded text-xs">
									PUBLICO
								</span>
								<button type="button">
									<Share2Icon size={20} color="#3183ff" />
								</button>
							</>
						)}
					</div>
					<div className="flex items-center justify-between w-full">
						<p className="whitespace-pre-wrap">{task.task}</p>
						<button type="button" className="mx-2">
							<TrashIcon size={24} color="#ff0000" />
						</button>
					</div>
				</article>
			))}
		</>
	);
};
