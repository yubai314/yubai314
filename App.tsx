import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import ArticleEditor from "./pages/ArticleEditor";
import Videos from "./pages/Videos";
import Projects from "./pages/Projects";
import Layout from "./components/Layout";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Layout>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/about"} component={About} />
        <Route path={"/articles"} component={Articles} />
        <Route path={"/articles/new"} component={ArticleEditor} />
        <Route path={"/articles/:id/edit"} component={ArticleEditor} />
        <Route path={"/articles/:id"} component={ArticleDetail} />
        <Route path={"/videos"} component={Videos} />
        <Route path={"/projects"} component={Projects} />
        <Route path={"/404"} component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
