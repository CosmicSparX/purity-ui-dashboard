import React, { useState, useEffect, useMemo } from "react";
import { Button, Flex } from "@chakra-ui/react";
import Projects from "./Projects";
import ProjectDetail from "./components/ProjectDetail";
import ProjectForm from "./components/ProjectForm";
import IssuesPage from "./IssuesPage";
import IssueDetail from "./components/IssueDetail"; // Import IssueDetail here

const ManagerDashboardPage = () => {
  const [projectsData, setProjectsData] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState(null);
  const [selectedIssueForDetailPage, setSelectedIssueForDetailPage] = useState(
    null
  );
  const [showAllIssues, setShowAllIssues] = useState(false);

  useEffect(() => {
    // Dummy data for demonstration
    setProjectsData([
      {
        name: "Purity UI Dashboard",
        description:
          "A modern and responsive admin dashboard template built with Chakra UI.",
        status: "Active",
        dueDate: "2024-08-15",
        id: 1,
        issues: [
          {
            id: 101,
            title: "Login page style breaking on mobile",
            description:
              "The login page components are not rendering correctly on screen widths below 480px.",
            status: "Open",
            priority: "Critical",
            assignedTo: "Alex",
          },
          {
            id: 102,
            title: "Add sorting feature to data tables",
            description:
              "Users need the ability to sort tables by clicking on the column headers.",
            status: "In Progress",
            priority: "High",
            assignedTo: "Sam",
          },
          {
            id: 103,
            title: "Update documentation for API endpoints",
            description:
              "The documentation for the v2 API is outdated and needs to be updated with the latest changes.",
            status: "Open",
            priority: "Medium",
            assignedTo: null,
          },
          {
            id: 104,
            title: "Fix memory leak in chart component",
            description:
              "The main dashboard chart is causing a memory leak over time, leading to performance degradation.",
            status: "Closed",
            priority: "Critical",
            assignedTo: "Riley",
          },
        ],
      },
      {
        name: "E-commerce Platform",
        description:
          "A full-featured e-commerce platform with a customer-facing storefront and an admin panel.",
        status: "Active",
        dueDate: "2024-10-01",
        id: 2,
        issues: [
          {
            id: 201,
            title: "Payment gateway integration failing for new users",
            description:
              "New users are unable to complete payments using the Stripe gateway.",
            status: "Open",
            priority: "Critical",
            assignedTo: "Casey",
          },
          {
            id: 202,
            title: "Product search not returning accurate results",
            description:
              "The search algorithm is not correctly indexing product descriptions, leading to poor search results.",
            status: "Open",
            priority: "High",
            assignedTo: null,
          },
          {
            id: 203,
            title: "Improve loading speed of product images",
            description:
              "Product images are loading slowly on the main category pages, impacting user experience.",
            status: "In Progress",
            priority: "Medium",
            assignedTo: "Jordan",
          },
        ],
      },
      {
        name: "Internal CRM System",
        description:
          "A custom-built CRM system for managing customer interactions and sales pipelines.",
        status: "Active",
        dueDate: "2025-03-31",
        id: 3,
        issues: [
          {
            id: 301,
            title: "CRM dashboard not loading for new users",
            description:
              "New users are experiencing an infinite loading spinner on the main CRM dashboard.",
            status: "Open",
            priority: "Critical",
            assignedTo: null,
          },
          {
            id: 302,
            title: "Add lead scoring functionality",
            description:
              "Implement a system to automatically score leads based on their engagement and demographics.",
            status: "Open",
            priority: "High",
            assignedTo: "Alex",
          },
          {
            id: 303,
            title: "Improve data import performance",
            description:
              "Large data imports are taking too long and sometimes timing out.",
            status: "In Progress",
            priority: "High",
            assignedTo: "Sam",
          },
          {
            id: 304,
            title: "Bug in email template editor",
            description:
              "The rich text editor for email templates is not saving formatting correctly.",
            status: "Open",
            priority: "Medium",
            assignedTo: "Riley",
          },
          {
            id: 305,
            title: "Feature request: SMS integration",
            description:
              "Allow sending and receiving SMS messages directly from the CRM.",
            status: "Closed",
            priority: "Low",
            assignedTo: "Casey",
          },
        ],
      },
    ]);
  }, []);

  const allIssues = useMemo(() => {
    return projectsData.flatMap((project) =>
      project.issues.map((issue) => ({ ...issue, projectName: project.name }))
    );
  }, [projectsData]);

  const handleBackToProjects = () => {
    setSelectedProject(null);
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleAddProject = () => {
    setProjectToEdit(null);
    setIsProjectFormOpen(true);
  };

  const handleEditProject = (project) => {
    setProjectToEdit(project);
    setIsProjectFormOpen(true);
  };

  const handleSaveProject = (project) => {
    if (project.id) {
      // Edit existing project
      setProjectsData(
        projectsData.map((p) => (p.id === project.id ? project : p))
      );
    } else {
      // Add new project
      setProjectsData([
        ...projectsData,
        { ...project, id: projectsData.length + 1 },
      ]);
    }
    setIsProjectFormOpen(false);
  };

  const handleCloseProjectForm = () => {
    setIsProjectFormOpen(false);
  };

  const handleAssignIssue = (issueId, developer) => {
    const updatedProjects = projectsData.map((p) => ({
      ...p,
      issues: p.issues.map((i) =>
        i.id === issueId ? { ...i, assignedTo: developer } : i
      ),
    }));
    setProjectsData(updatedProjects);
    // Update the selected issue in detail view if it's the one being assigned
    setSelectedIssueForDetailPage((prev) =>
      prev && prev.id === issueId ? { ...prev, assignedTo: developer } : prev
    );
  };

  const handleBackFromIssueDetail = () => {
    setSelectedIssueForDetailPage(null);
  };

  const handleIssueClick = (issue) => {
    setSelectedIssueForDetailPage(issue);
  };

  const handleShowAllIssues = () => {
    setShowAllIssues(true);
    setSelectedProject(null);
    setSelectedIssueForDetailPage(null);
  };

  const handleBackFromAllIssues = () => {
    setShowAllIssues(false);
  };

  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      {showAllIssues ? (
        <IssuesPage
          allIssues={allIssues}
          onIssueClick={handleIssueClick}
          onBack={handleBackFromAllIssues}
        />
      ) : selectedIssueForDetailPage ? (
        <IssueDetail
          issue={selectedIssueForDetailPage}
          onAssignIssue={handleAssignIssue}
          onBack={handleBackFromIssueDetail}
        />
      ) : selectedProject ? (
        <>
          <Button
            onClick={handleBackToProjects}
            mb="20px"
            alignSelf="flex-start"
          >
            Back to Projects
          </Button>
          <ProjectDetail
            project={selectedProject}
            issues={selectedProject.issues}
            onIssueClick={handleIssueClick}
          />
        </>
      ) : (
        <>
          <Projects
            title={"Projects"}
            captions={[
              "Name",
              "Description",
              "Status",
              "Due Date",
              "Total Issues",
              "Open Issues",
              "Critical Issues",
              "",
            ]}
            data={projectsData.map((p) => ({
              ...p,
              totalIssues: p.issues.length,
              openIssues: p.issues.filter((i) => i.status === "Open").length,
              criticalIssues: p.issues.filter((i) => i.priority === "Critical")
                .length,
            }))}
            onProjectClick={handleProjectClick}
            onAddProject={handleAddProject}
            onEditProject={handleEditProject}
          />
          <Button
            colorScheme="blue"
            variant="solid"
            size="sm"
            mt="20px"
            onClick={handleShowAllIssues}
          >
            View All Issues
          </Button>
        </>
      )}
      <ProjectForm
        isOpen={isProjectFormOpen}
        onClose={handleCloseProjectForm}
        onSave={handleSaveProject}
        project={projectToEdit}
      />
    </Flex>
  );
};

export default ManagerDashboardPage;
