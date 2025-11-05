export const profile = {
  name: "CH V N S JASWANTH",
  title: "Software Engineer",
  location: "Vijayawada, AP 521165",
  email: "jashuamrita360@gmail.com",
  phone: "+91 9993813331",
  
  experience: [
    {
      company: "TIGER ANALYTICS",
      location: "Chennai, IN",
      role: "MLE Full Stack Engineer - Sedin Technologies Vendor",
      period: "2024-Present",
      achievements: [
        "Delivered end-to-end solutions for a highly dynamic and data-driven application, including API development, UI implementation, and testing.",
        "Developed RESTful APIs for a Pharma application using Python, ensuring robust backend architecture and seamless data integration."
      ]
    },
    {
      company: "SEDIN TECHNOLOGIES",
      location: "Chennai, IN",
      role: "Software Engineer",
      period: "2023-Present",
      achievements: [
        "Development of RESTful APIs using Django Framework, Spring Boot, and Node.js, reducing response time and enabling seamless integration with front-end applications.",
        "Skilled in payment gateway integration (Stripe) and chat functionality using third-party APIs (Sendbird Chat). Proven expertise in seamlessly implementing these features for enhanced application functionality.",
        "WebRTC with Dynamic Adaptive Bitrate was integrated to maintain smooth video calls and reduce call drop-offs, even in low-bandwidth conditions."
      ]
    },
    {
      company: "SEDIN TECHNOLOGIES",
      location: "Chennai, IN",
      role: "Junior Software Engineer",
      period: "2022-2023",
      achievements: [
        "Engineered web application leveraging the Django Framework's Model-View-Template (MVT) architecture, facilitating streamlined development and scalability improvements.",
        "Produced high-quality code and collaborated effectively with cross-functional teams to achieve successful project outcomes."
      ]
    }
  ],
  
  education: {
    degree: "Bachelor of Technology – Major in Mechanical Engineering",
    school: "AMRITA SCHOOL OF ENGINEERING",
    location: "Bangalore, IN",
    period: "2018-2022"
  },
  
  skills: {
    languages: ["Python", "Java", "JavaScript", "TypeScript"],
    frameworks: ["Django Rest Framework", "React", "Spring Boot", "FastAPI", "Node.js", "Streamlit"],
    databases: ["PostgreSQL", "MySQL"],
    tools: ["Postman", "Git", "Stripe", "Tesla Fleet API", "Docker", "AWS", "Azure DevOps"]
  },
  
  projects: [
    {
      name: "MEDISCAN - King's College Hospital London, Dubai",
      company: "Sedin Technologies",
      location: "Bangalore, IN",
      year: "2025",
      role: "Android & Integration Engineer (Full Stack)",
      tools: "Kotlin (Jetpack Compose), Dagger-Hilt, Retrofit, AppAuth (OAuth2 via IDCS), Oracle Fusion Cloud (PO/TO/GRN/Attachments), FastAPI, PostgreSQL",
      contribution: [
        "Delivered end-to-end PO & TO flows (scan → receive → GRN) integrated with Oracle Fusion.",
        "Built inventory management tools for warehouse staff (locators, lots/expiry, quantity checks, error surfacing).",
        "Implemented SSO OAuth (IDCS/AppAuth) for secure Oracle integration across the app.",
        "Shipped invoice scanning + autofill with PO-line matching, cutting manual entry for warehouse teams.",
        "Hardened flows with validations, retries, and clear UX to reduce failures and speed up receiving at warehouse."
      ]
    },
    {
      name: "ONBOARDIQ",
      company: "Sedin Technologies",
      location: "Bangalore, IN",
      year: "2025",
      role: "Full Stack Developer",
      tools: "Next.js, Python FastAPI",
      contribution: [
        "Designed and built both frontend and backend from scratch; defined the complete exam lifecycle from candidate start to completion.",
        "Implemented HR summary reports by date range and quiz, enabling quick evaluation of cohorts.",
        "Created reusable exam templates to conduct assessments repeatedly; adding questions using AI.",
        "Onboarded 3 developers and led Phase 1 delivery; worked with 1 junior tester to validate the release."
      ]
    },
    {
      name: "SALES TOOL – VERTEX PHARMACEUTICALS, BOSTON",
      company: "Tiger Analytics",
      location: "Bangalore, IN",
      year: "2024-2025",
      role: "Full Stack Developer",
      tools: "Streamlit, SQL Alchemy, AWS DevOps, Snowflake",
      contribution: [
        "End to end ownership of the application, from requirements gathering to execution and delivery.",
        "Played a key role in enhancing the front-end user experience using streamlit by research and multiple iterations and completed multipage application using streamlit.",
        "Contributed to backend development, optimizing and extending features using Python and Streamlit.",
        "Ensured seamless integration between frontend and backend components in streamlit, improving the overall performance and usability of the sales tool for suggest best doctor to sell the drug to.",
        "Managed pipeline and deployment processes through Bitbucket and AWS DevOps, ensuring streamlined CI/CD workflows."
      ]
    },
    {
      name: "EFLEET.AI (CHARGFY)",
      company: "Sedin Technologies",
      location: "Chennai, IN",
      year: "2024",
      role: "Full Stack Developer",
      tools: "Java, Spring Boot, JWT, Node.js, Tesla Fleet API, Grafana, Prometheus, Google Maps API, PostgreSQL",
      contribution: [
        "The Spring MVC architecture was set up to handle Vehicle, Tenant, and Work Order functionalities, using appropriate data models.",
        "Role-based JWT authentication was incorporated to ensure secure access, which was customized as per user roles and groups.",
        "Integrated Tesla Fleet API, Tesla Telemetry, and Open Charge Map for vehicle and charging station data, with batch job functionality for periodic updates.",
        "Created a user-friendly UI with Node.js for vehicle onboarding and utilized Grafana for real-time tracking and visualization of vehicle movements and telemetry data.",
        "Generated work orders and associated vehicles for real-time tracking of vehicle movements, with Grafana integration for visualizing time series data, improving monitoring and analysis capabilities."
      ]
    },
    {
      name: "SEDSTART",
      company: "Sedin Technologies",
      location: "Bangalore, IN",
      year: "2024",
      role: "Full Stack Developer",
      tools: "React.js, Go, Microsoft OAuth (OIDC)",
      contribution: [
        "Developed both frontend and backend from scratch and designed the complete workflow for a QA testing platform.",
        "Implemented Microsoft authentication flow (OAuth2/OIDC) for secure SSO across the app.",
        "Delivered the core spike: allow record user screen sessions and automatically convert actions into step by step test scripts."
      ]
    },
    {
      name: "SYNERGY MARINE",
      company: "Sedin Technologies",
      location: "Chennai, IN",
      year: "2023-2024",
      role: "Full Stack Developer",
      tools: "WebRTC, Dynamic Adaptive Bitrate, Python, Node.js, React Native",
      contribution: [
        "Backend server functionality for WebRTC socket connection using Python and Node.js.",
        "Constructed a React Native front-end for WebRTC peer-to-peer connections, with a user-friendly UI for streamlined call management, allowing easy call acceptance and rejection.",
        "Dynamic Adaptive Bitrate Concept to maintain video quality in low bandwidth scenarios."
      ]
    },
    {
      name: "ZIVIAN HEALTH",
      company: "Sedin Technologies",
      location: "Chennai, IN",
      year: "2023",
      role: "Backend Developer",
      tools: "Python, Django Rest Framework, PostgreSQL, Stripe, Sendbird, Twilio, Verifiable API, Celery, Redis",
      contribution: [
        "RESTful APIs utilizing Django Rest Framework to facilitate seamless communication with the front-end application.",
        "Verifiable API integrations for seamless synchronization with added providers, including Stripe APIs for secure payment gateway functionality.",
        "Stripe API integration to enable secure payment gateway functionality. (Invoice generation, Subscription, Onboarding users to stripe, payment webhooks)",
        "Twilio integration for two factor authentication."
      ]
    },
    {
      name: "SATTVA",
      company: "Sedin Technologies",
      location: "Chennai, IN",
      year: "2022-2023",
      role: "Full Stack Developer",
      tools: "Django, Python, HTML/CSS, JavaScript, Celery, Redis, PostgreSQL",
      contribution: [
        "Utilized Django framework for backend APIs, models, views, and templates, coupled with front-end UI development incorporating HTML, CSS, JavaScript, and Bootstrap.",
        "Showcased project progress and functionality in a comprehensive demo to the CEO of Sedin Technologies."
      ]
    }
  ]
}

