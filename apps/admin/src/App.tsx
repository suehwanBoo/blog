import { BUILD_TARGET } from "@boo/ui";
import { Button } from "@boo/ui";

function App() {
  return (
    <>
      <div>Start</div>
      <Button />
      <p>{BUILD_TARGET}</p>
    </>
  );
}

export default App;
