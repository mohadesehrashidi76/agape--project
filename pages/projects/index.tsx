import React, { useState, useEffect, useMemo, useCallback } from "react";
import { ProjectData } from "@/services/project";
import Tabs from "@/components/tab";
import CardPattern from "@/components/card";
import { Project } from "../../types/project";
import { GetServerSideProps } from "next";
import LoadingSpinner from "@/components/loading";
import Dropdown from "@/components/dropDown";
import Pagination from "@/components/pagination";

type CharityProjectsProps = {
  initialProjects: Project[];
};

const ProjectsList: React.FC<CharityProjectsProps> = ({ initialProjects }) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>("آخرین پروژه ها");

  useEffect(() => {
    const pages = Math.ceil(projects.length / 10);
    setTotalPages(pages);
  }, [projects]);

  const fetchProjects = useCallback(async (filterQuery: string = "") => {
    try {
      setLoading(true);
      const response = await ProjectData.GetProjectData(filterQuery);
      setProjects(response.data.data);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = useCallback(async () => {
    await fetchProjects(`filter[organization.name]=${searchTerm}`);
    setActiveTab("آخرین پروژه ها");
    setSearchTerm("");
  }, [fetchProjects, searchTerm]);

  const handleFilter = useCallback(
    async (filterQuery: string, tabName: string) => {
      await fetchProjects(filterQuery);
      setActiveTab(tabName);
    },
    [fetchProjects]
  );

  const tabs = useMemo(
    () => [
      {
        label: "آخرین پروژه ها",
        onClick: () => handleFilter("", "آخرین پروژه ها"),
      },
      {
        label: "فعال",
        onClick: () => handleFilter("filter[status]=in_progress", "فعال"),
      },
      {
        label: "موفق",
        onClick: () => handleFilter("filter[is_successful]=1", "موفق"),
      },
      {
        label: "حمایت",
        onClick: () =>
          handleFilter("filter[is_successful]=1&sort=-balance", "حمایت"),
      },
    ],
    [handleFilter]
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const currentProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * 10;
    return projects.slice(startIndex, startIndex + 10);
  }, [currentPage, projects]);

  return (
    <>
      <div className="md:hidden bg-temcolor mt-5 w-full">
        <Dropdown options={tabs} />
      </div>
      <div className="w-full flex flex-col items-center justify-center md:items-start md:justify-start md:flex-row md:mt-10 mt-3">
        <div className="md:h-[140px] flex flex-col md:border border-gray-300 rounded-lg p-4 mr-2 md:mt-2">
          <p className="border-b-0 md:border-b-2 md:border-gray-300 mb-2 p-2 w-full hidden md:block text-sm">
            جستجو در نام پروژه یا سازمان
          </p>

          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="جستجو بر اساس نام سازمان"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-lg pl-4 pr-10 py-2 focus:outline-none w-[340px] md:w-full"
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
            <Tabs tabs={tabs} activeTab={activeTab} />
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
              <>
                {currentProjects.length === 0 ? (
                  <div className="flex justify-center items-center h-[600px]">
                    <p className="text-red-500 mt-4">
                      متاسفانه دیتایی یافت نشد
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-wrap mt-2">
                    {currentProjects.map((project) => (
                      <CardPattern
                        key={project.id}
                        title={project.name}
                        subtitle={project.subtitle}
                        img={project.banner[0]?.url}
                        status={
                          project.status === "in_progress" ? "فعال" : "موفق"
                        }
                        organizationname={project.organization.name}
                        logo={project.organization.logo}
                      />
                    ))}
                  </div>
                )}
              </>
            </>
          )}
        </div>
      </div>
    </>
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
    console.error("Error fetching projects:", error);
    return {
      props: {
        initialProjects: [],
      },
    };
  }
};

export default ProjectsList;
