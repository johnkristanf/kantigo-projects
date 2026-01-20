import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
  index("pages/auth/login.tsx"),
  route("projects/dashboard", "./pages/projects-dashboard.tsx"),

  layout("./layouts/admin/layout.tsx", [
    ...prefix("admin", [
      route("projects", "./pages/admin/projects.tsx"),
    ]),
  ]),

] satisfies RouteConfig;
