import "./App.css";
import { Footer } from "./components/layouts/footer/footer";
import { Honst } from "./components/features/honst/honst";
import { Header } from "./components/layouts/header/header";
import styles from "./App.module.css";

const App = () => {
  return (
    <>
      <header>
        <Header />
      </header>

      <main>
        <Honst />
      </main>

      <footer className={styles.footer}>
        <Footer />
      </footer>
    </>
  );
}

export default App;
