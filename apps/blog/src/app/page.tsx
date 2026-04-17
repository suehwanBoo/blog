import { BUILD_TARGET, Button } from "@boo/ui";

export default function Home() {
  return (
    <div>
      <Button />
      <p>{BUILD_TARGET}</p>
    </div>
  );
}
