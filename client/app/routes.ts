import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("pages/auth/login.tsx"),
  route("projects/dashboard", "./pages/projects-dashboard.tsx"),
] satisfies RouteConfig;
