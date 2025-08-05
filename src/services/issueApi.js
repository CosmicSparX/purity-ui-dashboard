import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api/issues",
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// General group
export const getProjects = () => apiClient.get("/project");
export const getProjectById = (id) => apiClient.get(`/project/${id}`);
export const getIssues = () => apiClient.get("/issue");
export const getIssueById = (id) => apiClient.get(`/issue/${id}`);

// Manager group
export const createProject = (data) => apiClient.post("/project", data);
export const updateProject = (id, data) =>
  apiClient.patch(`/project/${id}`, data);
export const deleteProject = (id) => apiClient.delete(`/project/${id}`);
export const assignIssue = (id, assigneeId) =>
  apiClient.patch(`/issue/${id}/assign`, { assigneeId });

// Tester group
export const createIssue = (data) => apiClient.post("/issue", data);
export const updateIssue = (id, data) => apiClient.patch(`/issue/${id}`, data);

// Developer group
export const updateIssueStatus = (id, status) =>
  apiClient.patch(`/issue/${id}/status`, { status });
export const updateIssuePlan = (id, plan) =>
  apiClient.patch(`/issue/${id}/plan`, { plan });
