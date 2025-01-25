"use client";

import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useSection } from "@/hooks/useSection";
import Histogram from "@/components/Charts/Histogram";
import Radar from "@/components/Charts/Radar";
import YoutubeInput from "@/components/Forms/YoutubeInput";

const SectionPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [sectionName, setSectionName] = useState(`Section ${id}`);
  const [youtubeLink, setYoutubeLink] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const { sectionsData, fetchSectionData } = useSection();
  const activeData = sectionsData[id.toString()]?.data || null;
  const isLoading = sectionsData[id.toString()]?.loading;

  const handleSubmit = async () => {
    const fetchFn = async () => {
      const response = await fetch(
        "http://127.0.0.1:8000/api/youtube/comments/analyze-sentiment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ youtube_link: youtubeLink }),
        },
      );
      return response.json();
    };

    fetchSectionData(id.toString(), fetchFn);
  };

  return (
    <DefaultLayout headerTitle={sectionName}>
      {!isLoading && (
        <YoutubeInput
          activeData={activeData}
          youtubeLink={youtubeLink}
          setYoutubeLink={setYoutubeLink}
          handleSubmit={handleSubmit}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      )}

      {!isLoading && activeData?.average && activeData?.histogram && (
        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
          <Radar averageScoreData={activeData?.average} />
          <Histogram histogramData={activeData?.histogram} />
        </div>
      )}

      {isLoading && (
        <div className="flex h-[140px] w-full flex-col items-center justify-center rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark">
          <p className="block font-satoshi text-lg font-medium text-gray-700 dark:text-white">
            Analyzing ...
          </p>
        </div>
      )}
    </DefaultLayout>
  );
};

export default SectionPage;
