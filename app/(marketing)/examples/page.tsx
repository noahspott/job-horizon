import Link from "next/link";

const ExamplesPage = () => {
  const examples = [
    {
      id: 1,
      title: "Software Engineer Resume",
      description: "Modern tech-focused resume with emphasis on coding skills",
      previewImage: "/examples/tech-resume.png",
    },
    {
      id: 2,
      title: "Creative Designer CV",
      description: "Clean, minimalist design highlighting visual portfolio",
      previewImage: "/examples/designer-resume.png",
    },
    {
      id: 3,
      title: "Business Professional",
      description: "Traditional format with a contemporary twist",
      previewImage: "/examples/business-resume.png",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black">
      <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">
            Resume Examples
          </h1>
          <p className="text-xl text-gray-400">
            Get inspired by these professionally crafted resumes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {examples.map((example) => (
            <div
              key={example.id}
              className="group relative bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 hover:border-gray-700 transition-all duration-300 overflow-hidden"
            >
              <div className="aspect-w-16 aspect-h-9">
                {/* Replace with actual images */}
                <div className="w-full h-48 bg-gradient-to-br from-blue-950 to-purple-950" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {example.title}
                </h3>
                <p className="text-gray-400 mb-4">{example.description}</p>
                <Link
                  href={`/create?template=${example.id}`}
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/20 hover:border-blue-500/30 transition-colors duration-300"
                >
                  Use this template
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/dashboard/create-resume"
            className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium rounded-md text-white bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 border border-blue-500/20 hover:border-blue-500/30 transition-all duration-300"
          >
            Create Your Own Resume
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExamplesPage;
