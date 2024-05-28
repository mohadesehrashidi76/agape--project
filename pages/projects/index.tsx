import React, { useState, useEffect, useMemo, useCallback } from "react";
import { ProjectData } from "@/services/project";
import Tabs from "@/components/tab";
import CardPattern from "@/components/card";
import { Project } from "../../types/project";
import { GetServerSideProps } from "next";
import LoadingSpinner from "@/components/loading";

type CharityProjectsProps = {
  initialProjects: Project[];
};

const CharityProjects: React.FC<CharityProjectsProps> = ({
  initialProjects,
}) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (initialProjects.length > 0) {
      setProjects(initialProjects);
    }
  }, [initialProjects]);

  const handleSearch = useCallback(async () => {
    try {
      setLoading(true);
      const response = await ProjectData.GetProjectData(
        `filter[organization.name]=${searchTerm}`
      );
      setProjects(response.data.data);
    } catch (error) {
      console.error("Error fetching charity projects:", error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  const handleFilter = useCallback(async (filterQuery: string) => {
    try {
      setLoading(true);
      const response = await ProjectData.GetProjectData(filterQuery);
      setProjects(response.data.data);
    } catch (error) {
      console.error("Error fetching charity projects:", error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const tabs = useMemo(
    () => [
      { label: "آخرین پروژه ها", onClick: () => handleFilter("") },
      {
        label: "فعال",
        onClick: () => handleFilter("filter[status]=in_progress"),
      },
      { label: "موفق", onClick: () => handleFilter("filter[is_successful]=1") },
      {
        label: "حمایت",
        onClick: () => handleFilter("filter[is_successful]=1&sort=-balance"),
      },
    ],
    [handleFilter]
  );

  return (
    <div className="w-full flex flex-col md:flex-row mt-10  ">
      <div className="md:h-[140px] flex flex-col border border-gray-300 rounded-lg p-4 mr-2">
        <p className="border-b-2 border-gray-300 mb-2 p-2 w-full hidden md:block text-sm">
          جستجو در نام پروژه یا سازمان
        </p>
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="جستجو بر اساس نام سازمان"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
          <svg
            className="absolute right-3 w-5 h-5 text-gray-500 cursor-pointer"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            onClick={handleSearch}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35M16 11a5 5 0 10-10 0 5 5 0 0010 0z"
            ></path>
          </svg>
        </div>
      </div>
      <div className="flex flex-col w-full mr-10 mt-2">
        <div className="hidden md:flex">
          <Tabs tabs={tabs} />
        </div>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="flex flex-wrap mt-2">
            {projects.map((project) => (
              <CardPattern
                key={project.id}
                title={project.name}
                subtitle={project.subtitle}
                img={project.banner[0]?.url}
                status={project.status === "in_progress" ? "فعال" : "موفق"}
                organizationname={project.organization.name}
                logo={project.organization.logo}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await ProjectData.GetProjectData();
    return {
      props: {
        initialProjects: response.data.data,
      },
    };
  } catch (error) {
    console.error("Error fetching all charity projects:", error);
    return {
      props: {
        initialProjects: [],
      },
    };
  }
};

export default CharityProjects;
