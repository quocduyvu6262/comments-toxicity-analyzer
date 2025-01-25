import React from "react";
import ButtonDefault from "@/components/Buttons/ButtonDefault";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Main Content */}
      <main className="flex flex-grow flex-col items-center justify-center px-4 py-16 text-center">
        <h1 className="mb-8 font-satoshi text-5xl font-bold text-gray-900 dark:text-white">
          YouTube Comment Toxicity Analyzer
        </h1>
        <p className="mb-12 max-w-2xl font-satoshi text-xl text-gray-600 dark:text-gray-400">
          Gain insights into the sentiment and toxicity of YouTube video
          comments.
        </p>
        <ButtonDefault
          label="Go to Dashboard"
          link="/sections/1"
          customClasses="bg-primary text-white rounded-full px-10 py-3.5 lg:px-8 xl:px-10"
        />
      </main>
      {/* Footer */}
      <footer className="py-6">
        <div className="container mx-auto flex items-center justify-center space-x-4">
          <span className="text-gray-700 dark:text-gray-400">Made by Tony</span>
          <div className="flex space-x-4">
            <a
              href="https://github.com/quocduyvu6262"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900"
            >
              github
            </a>
            <a
              href="https://www.linkedin.com/in/duyquocvu/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600"
            >
              linkedin
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
