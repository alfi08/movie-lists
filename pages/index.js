import Head from "next/head";
import Card from "../components/Card";
import Drawer from "../components/Drawer";
import { useCallback, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { useAppContext } from "../context/AppContext";

const Home = () => {
  const elRef = useRef(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const { title, movies } = useAppContext();
  const [hiddenEl, setHiddenEl] = useState(false);

  const htmlToImageHandler = useCallback(() => {
    if (elRef.current === null) {
      return;
    }

    setHiddenEl(true);

    toPng(elRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "movie.png";
        link.href = dataUrl;
        link.click();
        setHiddenEl(false);
      })
      .catch((err) => {
        setHiddenEl(false);
        console.log(err);
      });
  }, [elRef]);

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

      <div ref={elRef} className="bg-dark-background min-h-screen pb-12">
        {/* edit content button */}
        <button
          onClick={() => setOpenDrawer(true)}
          className={`absolute right-12 top-12 lg:right-6 lg:top-6 text-5xl lg:text-xl hover:text-gray-400 text-white p-1 transition-all delay-100 ${!!hiddenEl && 'hidden'}`}
        >
          <i className="fas fa-pen"></i>
        </button>

        {/* title */}
        <h1 className="text-white text-center text-6xl pt-16  pb-16 lg:pb-6">
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
      <div
        className="text-center p-4 bg-green-900 cursor-pointer text-gray-100 font-bold text-xl"
        onClick={htmlToImageHandler}
      >
        download as image
      </div>
    </div>
  );
};

export default Home;
