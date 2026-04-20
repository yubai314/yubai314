import { Router, Route, Switch } from "wouter";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Articles from "@/pages/Articles";
import ArticleDetail from "@/pages/ArticleDetail";
import Videos from "@/pages/Videos";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import NotFound from "@/pages/NotFound";

// 与 Vite base 一致，保证在 gtr4321.github.io/Infinite-Loop/ 下路由与链接正确
const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "") || "";

function Routes() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/articles" component={Articles} />
        <Route path="/articles/:id" component={ArticleDetail} />
        <Route path="/videos" component={Videos} />
        <Route path="/projects" component={Projects} />
        <Route path="/projects/:id" component={ProjectDetail} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

export default function App() {
  return (
    <Router base={base}>
      <Routes />
    </Router>
  );
}
