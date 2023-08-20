//사용자와 상호작용 없이 데이터를 보여주기만 한다 => server component 적합

interface Props {
	params: {
		id: number;
	};
}
export default async function Read(props: Props) {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/topics/${props.params.id}`,
		{
			cache: "no-store",
		}
	);
	const topic = await res.json();
	return (
		<>
			<h2>{topic.title}</h2>
			{topic.body}
		</>
	);
}
