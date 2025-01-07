"use client";

import { useState } from "react";
import type { ChangeEvent } from "react";
import { Textarea } from "./textarea";

export const Form = () => {
	const [input, setInput] = useState("");
	const [publicTask, setPublicTask] = useState(false);

	return (
		<form>
			<Textarea
				placeholder="Digite qual sua tarefa..."
				value={input}
				onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
					setInput(e.target.value)
				}
			/>
			<div className="flex items-center my-3">
				<input
					type="checkbox"
					id="public-task"
					className="w-[18px] h-[18px]"
					onChange={() => setPublicTask(!publicTask)}
					checked={publicTask}
				/>
				<label htmlFor="public-task" className="text-white ml-2">
					Deixar sua tarefa pública?
				</label>
			</div>

			<button
				type="button"
				className="w-full rounded text-white bg-secondary py-3 text-lg hover:text-secondary hover:bg-white checked:bg-white"
			>
				Registrar
			</button>
		</form>
	);
};
