import { Welcome } from "./components/Welcome";

document.addEventListener('DOMContentLoaded', () => {
  const welcome = new Welcome();

  welcome.hello();
});
