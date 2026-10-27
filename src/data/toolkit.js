/* The tools on each lifecycle planet. Logos come from simple-icons
   (CC0), imported by name so only these ship in the bundle.

   To change a phase's line-up: swap names here. Keys match the phase
   names in components/story/Story.jsx. */
import {
  siNotion, siJira, siMiro,
  siGoogleanalytics, siJupyter, siPandas, siPostgresql,
  siFigma, siCanva,
  siNextdotjs, siReact, siFastapi, siPython, siNeo4j,
  siPytorch, siTensorflow, siHuggingface, siLangchain, siScikitlearn,
  siPytest, siJest, siPostman,
  siDocker, siGithubactions, siVercel, siNginx,
  siGithub, siGrafana, siSentry, siPrometheus,
} from "simple-icons";

const tool = (icon, name = icon.title) => ({ name, hex: `#${icon.hex}`, path: icon.path });

export const toolkit = {
  Plan: [tool(siNotion), tool(siJira), tool(siMiro)],
  Analysis: [tool(siGoogleanalytics, "Analytics"), tool(siJupyter), tool(siPandas), tool(siPostgresql)],
  Design: [tool(siFigma), tool(siCanva)],
  Development: [tool(siNextdotjs), tool(siReact), tool(siFastapi), tool(siPython), tool(siNeo4j)],
  "AI/ML": [tool(siPytorch), tool(siTensorflow), tool(siHuggingface), tool(siLangchain), tool(siScikitlearn)],
  Testing: [tool(siPytest), tool(siJest), tool(siPostman)],
  Deployment: [tool(siDocker), tool(siGithubactions), tool(siVercel), tool(siNginx)],
  Maintenance: [tool(siGithub), tool(siGrafana), tool(siSentry), tool(siPrometheus)],
};
