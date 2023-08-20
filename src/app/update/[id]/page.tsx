"use client";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function Update() {
	const router = useRouter();
	const params = useParams();
	const { id } = params;

	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");

	useEffect(() => {
		fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics/${id}`)
			.then((res) => res.json())
			.then((result) => {
				setTitle(result.title), setBody(result.body);
			});
	}, [id]);

	return (
		<form
			onSubmit={(e: FormEvent<HTMLFormElement>) => {
				e.preventDefault();
				const formData = new FormData(e.currentTarget);
				const title = formData.get("title") as string;
				const body = formData.get("body") as string;

				const options = {
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ title, body }),
				};
				fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics/${id}`, options)
					.then((res) => res.json())
					.then((result) => {
						const lastId = result.id;
						router.refresh();
						router.push(`/read/${lastId}`);
					});
			}}
		>
			<p>
				<input
					type="text"
					name="title"
					placeholder="title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				></input>
			</p>
			<p>
				<textarea
					name="body"
					placeholder="body"
					value={body}
					onChange={(e) => setBody(e.target.value)}
				></textarea>
			</p>
			<p>
				<input type="submit" value="UPDATE"></input>
			</p>
		</form>
	);
}
