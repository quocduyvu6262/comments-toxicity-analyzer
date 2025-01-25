import React, { createContext, useCallback, useContext } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Metric } from "@/types/metric";
import { Simulate } from "react-dom/test-utils";
import error = Simulate.error;

type SectionData = {
  [key: string]: any;
};

type SectionContextType = {
  sectionsData: SectionData;
  setSectionsData: any;
  fetchSectionData: (
    sectionId: string,
    fetchFn: () => Promise<any>,
  ) => Promise<any>;
  clearSectionData: (sectionId: string) => void;
};

const SectionContext = createContext<SectionContextType | undefined>(undefined);

export const SectionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [sectionsData, setSectionsData] = useLocalStorage<SectionData>(
    "sections-data",
    [],
  );

  const fetchSectionData = async (
    sectionId: string,
    fetchFn: () => Promise<any>,
  ) => {
    setSectionsData((prev) => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        loading: true,
      },
    }));
    try {
      const data = await fetchFn();
      setSectionsData((prev) => ({
        ...prev,
        [sectionId]: {
          data,
          loading: false,
        },
      }));
    } catch (e: any) {
      setSectionsData((prev) => ({
        ...prev,
        [sectionId]: {
          error: e.message,
          loading: false,
        },
      }));
    }
  };

  const clearSectionData = useCallback(
    (sectionId: string) => {
      setSectionsData((prev) => {
        const newData = { ...prev };
        delete newData[sectionId];
        return newData;
      });
    },
    [setSectionsData],
  );

  return (
    <SectionContext.Provider
      value={{
        sectionsData,
        setSectionsData,
        fetchSectionData,
        clearSectionData,
      }}
    >
      {children}
    </SectionContext.Provider>
  );
};

export const useSection = () => {
  const context = useContext(SectionContext);
  if (!context) {
    throw new Error("useSectionData must be used within a SectionProvider");
  }
  return context;
};
