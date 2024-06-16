export async function GET(response: Response) {
  const result = await fetch('https://jsonplaceholder.typicode.com/todos/3');
  const data = await result.json();
  return Response.json(data);
}
