"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export function Control() {
	const params = useParams();
	const router = useRouter();
	const id = params.id;
	return (
		<ul>
			<li>
				<Link href="/create">Create</Link>
			</li>
			{id ? (
				<>
					<li>
						<Link href={`/update/${id}`}>Update</Link>
					</li>
					<li>
						<input
							onClick={() => {
								const options = { method: "DELETE" };
								fetch(
									`${process.env.NEXT_PUBLIC_API_URL}/topics/${id}`,
									options
								)
									.then((res) => res.json())
									.then((res) => router.push(`/`));
								router.refresh();
							}}
							type="button"
							value={"delete"}
						/>
					</li>
				</>
			) : null}
		</ul>
	);
}
