import React from "react";

const YoutubeInput = ({
  activeData,
  youtubeLink,
  setYoutubeLink,
  handleSubmit,
  isEditing,
  setIsEditing,
}: any) => {
  return (
    <>
      {!activeData ? (
        <div className="flex h-full w-full flex-col items-center justify-center rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark">
          {/* YouTube Link Form */}
          <div className="max-w flex w-full flex-col items-center space-y-4">
            <label
              htmlFor="youtubeLink"
              className="block text-lg font-medium text-gray-700 dark:text-white"
            >
              Paste Youtube Link Here For Comments Sentiment Analysis
            </label>
            {/* Input for YouTube Link */}
            <div className="w-1/2 space-x-2">
              <input
                type="url"
                id="youtubeLink"
                value={youtubeLink}
                onChange={(e) => {
                  setYoutubeLink(e.target.value);
                }}
                placeholder="https://www.youtube.com/watch?v=example"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Start Button */}
            <button
              onClick={handleSubmit}
              className="w-1/4 items-center rounded-md bg-gray-2 py-2 text-dark-4 hover:bg-gray-3 hover:text-dark disabled:pointer-events-none dark:bg-gray-7 dark:text-gray-5 dark:hover:bg-white/10 dark:hover:text-white"
            >
              Start
            </button>
            {activeData?.error && (
              <p className="mt-2 text-sm text-red-500">{"Failed to fetch"}</p>
            )}
          </div>
        </div>
      ) : (
        <div className="flex h-full w-full flex-col items-start space-y-4 rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark">
          {isEditing ? (
            <>
              <div className="flex w-1/2 flex-row space-x-4">
                <label
                  htmlFor="youtubeLink"
                  className="mt-1 block text-lg font-medium text-gray-700 dark:text-white"
                >
                  New link:
                </label>
                <div className="w-1/2 space-x-2">
                  <input
                    type="url"
                    id="youtubeLink"
                    value={youtubeLink}
                    onChange={(e) => {
                      setYoutubeLink(e.target.value);
                    }}
                    placeholder="https://www.youtube.com/watch?v=example"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className=" flex w-full flex-row justify-end space-x-4">
                <button
                  onClick={() => setIsEditing(false)}
                  className="w-1/5 rounded-md bg-gray-2 py-2 text-dark-4 hover:bg-gray-3 hover:text-dark dark:bg-gray-7 dark:text-gray-5 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    handleSubmit();
                  }}
                  className="w-1/5 rounded-md bg-gray-2 py-2 text-dark-4 hover:bg-gray-3 hover:text-dark disabled:pointer-events-none dark:bg-gray-7 dark:text-gray-5 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  Accept
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-row space-x-2 py-2">
                <label
                  htmlFor="youtubeLink"
                  className="block text-lg font-medium text-gray-700 dark:text-white"
                >
                  Video:
                </label>
                <p className="block font-satoshi text-lg font-medium text-gray-700 dark:text-white">
                  <a href={youtubeLink} target="_blank">
                    {activeData?.info?.title}
                  </a>
                </p>
              </div>
              <div className=" flex w-full flex-row justify-end space-x-4">
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-1/5 rounded-md bg-gray-2 py-2 text-dark-4 hover:bg-gray-3 hover:text-dark dark:bg-gray-7 dark:text-gray-5 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  Edit
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
export default YoutubeInput;
