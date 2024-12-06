export default function HowItWorks() {
  return (
    <main className="min-h-screen relative">
      {/* Background gradient - matching home page */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-gray-900 to-black -z-10" />

      {/* Animated grid pattern - matching home page */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_70%,transparent_100%)] -z-5" />

      <div className="max-w-screen-xl mx-auto px-4">
        <section className="py-24 flex flex-col gap-8 items-start relative">
          {/* Gradient accent */}
          <div className="absolute -left-20 -top-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />

          {/* Header section */}
          <div className="space-y-4 max-w-2xl">
            <h1 className="text-5xl font-black">
              <span className="bg-gradient-to-r from-blue-400 via-white to-blue-300 bg-clip-text text-transparent">
                How It Works
              </span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Four simple steps to transform your job application process with
              AI-powered precision.
            </p>
          </div>

          {/* Steps grid */}
          <div className="flex flex-col gap-12 w-full max-w-4xl mt-8">
            {[
              {
                step: "1",
                title: "Sign Up",
                desc: "Create your account in seconds with just your email",
                accent: "from-blue-400 to-blue-600",
                video: "/videos/signup-demo.mov",
              },
              {
                step: "2",
                title: "Create Your Profile",
                desc: "Input your experience and skills to build your foundation",
                accent: "from-blue-500 to-blue-700",
                video: "/videos/profile-demo.mov",
              },
              {
                step: "3",
                title: "Add Job Description",
                desc: "Simply paste the job posting you're interested in",
                accent: "from-blue-600 to-blue-800",
                video: "/videos/add-job-demo.mov",
              },
              {
                step: "4",
                title: "Generate Resume",
                desc: "Let AI craft your perfectly tailored resume",
                accent: "from-blue-700 to-blue-900",
                video: "/videos/generate-demo.mov",
              },
            ].map((step, index) => (
              <div
                key={step.title}
                className="p-8 lg:p-10 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all group relative"
              >
                {/* Connecting line */}
                {index < 3 && (
                  <div className="absolute left-11 top-[95%] w-0.5 h-12 bg-gradient-to-b from-white/20 to-transparent" />
                )}

                <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
                  <div className="flex-1 space-y-4 md:max-w-md lg:max-w-xl xl:max-w-2xl">
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.accent} flex items-center justify-center font-bold text-lg`}
                    >
                      {step.step}
                    </div>
                    <h3 className="font-semibold text-xl text-white/90">
                      {step.title}
                    </h3>
                    <p className="text-gray-400">{step.desc}</p>
                  </div>

                  {/* Larger video section */}
                  <div className="relative w-full md:w-[500px] lg:w-[600px] aspect-video rounded-lg overflow-hidden bg-gray-900">
                    <video
                      src={step.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
