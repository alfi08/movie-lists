import Head from "next/head";
import Card from "../components/Card";
import Drawer from "../components/Drawer";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";

const Home = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { title, movies } = useAppContext();

  return (
    <div className="font-Poppins box-border">
      <Head>
        <meta name="viewport" content="viewport-fit=cover" />

        <title>Movie list</title>

        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css"
          rel="stylesheet"
        />
      </Head>

      <Drawer isOpen={openDrawer} setIsOpen={setOpenDrawer} />

      <div className="bg-dark-background min-h-screen pb-12">
        {/* edit content button */}
        <button
          onClick={() => setOpenDrawer(true)}
          className="absolute right-12 top-12 lg:right-6 lg:top-6 text-5xl lg:text-xl hover:text-gray-400 text-white p-1 transition-all delay-100"
        >
          <i className="fas fa-pen"></i>
        </button>

        {/* title */}
        <h1 className="text-white text-center text-6xl lg:text-3xl pt-16  pb-16 lg:pb-6">
          {title}
        </h1>

        {/* main content */}
        <div className="container lg:px-48 py-6 flex justify-center flex-wrap gap-12">
          {movies.map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
          {!movies.length && (
            <div className="text-3xl text-gray-500">
              Silahkan Isi filmnya terlebih dahulu
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
