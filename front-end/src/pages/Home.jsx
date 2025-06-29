import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="py-4 px-4 mx-auto flex flex-col-reverse md:flex-row items-center gap-6">
        <div className="text-center md:text-left md:w-1/2 space-y-4">
          <p className="text-sm uppercase text-gray-600">
            QUALITY EDUCATION | AFFORDABLE PRICE | JOB READY COURSES
          </p>
          <h1 className="text-3xl md:text-4xl font-bold">
            Nepal's Largest & Most Affordable Learning Platform
          </h1>
          <p className="text-gray-700">
            We’re not just another learning platform — we are a solution to the
            problem of overpriced institutions that are out of reach for many
            Nepalese students.
          </p>
          <div className="flex justify-center md:justify-start gap-4 mt-4">
            <button className="px-4 py-2 bg-slate-200 rounded-md">
              Explore Courses
            </button>
            <button className="px-4 py-2 bg-green-700 text-white rounded-md">
              Enroll now
            </button>
          </div>
        </div>

        <div className="md:w-1/2">
          <img
            src="https://www.digitalpathshalanepal.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcollage-m.474a60f3.webp&w=1080&q=75"
            alt="Pathshala"
            className="w-full h-auto"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
