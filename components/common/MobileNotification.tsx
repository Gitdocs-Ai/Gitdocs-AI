const MobileNotification = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#F1F0FB] text-center">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-gitdocs-blue/5 animate-pulse-subtle"></div>
        <div className="absolute bottom-1/3 right-1/5 w-48 h-48 rounded-full bg-gitdocs-purple/5 animate-pulse-subtle"></div>
        <div className="absolute top-2/3 right-1/4 w-32 h-32 rounded-full border border-gitdocs-orange/10"></div>

        {/* Code bracket decorations */}
        <div className="absolute top-10 right-10 text-6xl opacity-10 text-gitdocs-blue font-mono">
          {"{"}
        </div>
        <div className="absolute bottom-10 left-10 text-6xl opacity-10 text-gitdocs-purple font-mono">
          {"}"}
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-lg bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white">
        <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-gradient-to-r from-gitdocs-blue to-gitdocs-purple text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
            <path d="M12 18h.01" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold mb-4 bg-gradient-to-r from-gitdocs-blue via-gitdocs-purple to-gitdocs-orange bg-clip-text text-transparent">
          Desktop Experience Recommended
        </h1>

        <p className="text-gray-600 mb-6">
          Our documentation platform is optimized for larger screens. For the
          best experience, please visit us on a desktop or laptop computer.
        </p>

        <div className="space-y-4">
          <div className="p-4 bg-gitdocs-blue/5 rounded-lg">
            <h3 className="font-medium text-gitdocs-blue mb-2">Why desktop?</h3>
            <p className="text-sm text-gray-600">
              Our interactive documentation tools work best with a larger screen
              where you can see both your code and documentation side by side.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNotification;
