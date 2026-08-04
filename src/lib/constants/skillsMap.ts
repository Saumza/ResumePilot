export type SkillType = "Language" | "Framework" | "Tool" | "Platform" | "Domain";

export interface SkillCategory {
    type: SkillType;
    names: string[];
}

export const skillsMap: SkillCategory[] = [
    {
        type: "Language",
        names: [
            "Python", "JavaScript", "TypeScript", "Java", "C", "C++", "C#", "Go",
            "Rust", "Kotlin", "Swift", "Ruby", "PHP", "Scala", "R", "MATLAB",
            "Dart", "Elixir", "Haskell", "Lua", "Perl", "Shell", "Bash",
            "PowerShell", "Groovy", "Julia", "Assembly", "COBOL", "Fortran",
            "Solidity", "Move", "Zig", "Nim", "OCaml", "F#", "Clojure",
            "Erlang", "Crystal", "D", "Ada", "VHDL", "Verilog",
        ],
    },
    {
        type: "Framework",
        names: [
            "React", "Next.js", "Vue.js", "Nuxt.js", "Angular", "Svelte",
            "SvelteKit", "Express.js", "Fastify", "NestJS", "Hono", "Django",
            "Flask", "FastAPI", "Spring Boot", "Spring MVC", "Hibernate",
            "Micronaut", "Quarkus", "Ruby on Rails", "Laravel", "Symfony",
            "CodeIgniter", "ASP.NET", ".NET Core", "Gin", "Echo", "Fiber",
            "Actix", "Rocket", "Phoenix", "Meteor", "React Native", "Flutter",
            "Expo", "Ionic", "Xamarin", "Electron", "TensorFlow", "PyTorch",
            "Keras", "Scikit-learn", "Pandas", "NumPy", "OpenCV", "Hugging Face",
            "LangChain", "LlamaIndex", "GraphQL", "Apollo", "tRPC", "Prisma",
            "TypeORM", "SQLAlchemy", "Tailwind CSS", "Bootstrap", "Material UI",
            "Chakra UI", "Shadcn/ui", "Three.js", "D3.js", "Chart.js",
            "Socket.io", "Redux", "Zustand",
        ],
    },
    {
        type: "Tool",
        names: [
            "Git", "GitHub", "GitLab", "Bitbucket", "Docker", "Kubernetes",
            "Podman", "Postman", "Insomnia", "Swagger", "Jenkins",
            "GitHub Actions", "GitLab CI", "CircleCI", "Travis CI", "ArgoCD",
            "Terraform", "Ansible", "Puppet", "Chef", "Figma", "Adobe XD",
            "Sketch", "Zeplin", "InVision", "Framer", "VS Code", "IntelliJ IDEA",
            "PyCharm", "WebStorm", "Eclipse", "Vim", "Neovim", "Webpack", "Vite",
            "Rollup", "Babel", "ESLint", "Prettier", "Jira", "Linear", "Notion",
            "Confluence", "Trello", "Asana", "Grafana", "Prometheus", "Datadog",
            "Splunk", "New Relic", "Sentry", "Nginx", "Apache", "Caddy",
            "RabbitMQ", "Apache Kafka", "Redis", "Maven", "Gradle", "npm",
            "Yarn", "pnpm", "Cargo", "pip",
        ],
    },
    {
        type: "Platform",
        names: [
            "AWS", "Azure", "Google Cloud Platform", "Vercel", "Netlify",
            "Railway", "Heroku", "DigitalOcean", "Linode", "Cloudflare",
            "Firebase", "Supabase", "PlanetScale", "Neon", "Render", "Fly.io",
            "AWS Lambda", "AWS EC2", "AWS S3", "AWS RDS", "AWS ECS", "AWS EKS",
            "Azure Functions", "Azure DevOps", "Azure Blob Storage",
            "Google Cloud Run", "Google BigQuery", "Google Kubernetes Engine",
            "Cloudflare Workers", "Cloudflare R2", "Cloudflare Pages", "Stripe",
            "Twilio", "SendGrid", "Resend", "Pusher", "Shopify", "WordPress",
            "Webflow", "Sanity", "Contentful",
        ],
    },
    {
        type: "Domain",
        names: [
            "Machine Learning", "Deep Learning", "Natural Language Processing",
            "Computer Vision", "Generative AI", "Prompt Engineering", "MLOps",
            "DevOps", "Site Reliability Engineering", "Platform Engineering",
            "Cybersecurity", "Penetration Testing", "Ethical Hacking",
            "Network Security", "Application Security", "Cloud Security",
            "Data Engineering", "Data Science", "Data Analytics",
            "Business Intelligence", "Blockchain", "Smart Contracts", "Web3",
            "DeFi", "NFT Development", "Embedded Systems", "IoT", "Robotics",
            "RTOS", "System Design", "Distributed Systems", "Microservices",
            "Event Driven Architecture", "Database Administration",
            "Query Optimization", "UI/UX Design", "Product Design",
            "Interaction Design", "Agile", "Scrum", "Kanban",
            "Technical Writing", "Open Source",
        ],
    },
];