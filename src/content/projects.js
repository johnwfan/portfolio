// All project facts. `description` is the paragraph on /work; `line` is the
// one-liner (recruiter mode, "next project"). `screens` are the screenshots on
// /work and the case study (UPDATE §4), in order.
//
// `caseStudy` drives /work/[slug] (UPDATE §6, built by src/lib/caseStudy.js):
//   lede         optional one-liner under the title (else `description`)
//   role         optional fuller role for the case study (else `role`)
//   facts        optional [{ n, label }], 2–3 big numbers
//   captions     one per screen
//   chapters     optional [{ title, lead, body (string or paragraphs), list?, steps?,
//                pipeline?, screen?, caption?, diagram? }]; without them,
//                chapters are built from the fields below
//   overview     a paragraph on what it is
//   highlights   what was built, one line each
//   howItWorks   pipeline / architecture steps (empty when there aren't any)
//   fullStack    every tool; `stack` above is the short version
//   timeline     when it was built
//   credit       collaborators, for team projects
//   links        github, and live when there is one

export const PROJECTS = [
  {
    slug: "scuttle",
    name: "scuttle.gg",
    year: "2025–26",
    role: "solo",
    stack: "next.js · typescript · mongodb · redis · fastapi",
    description:
      "a league of legends stats site. it started as a simple tracker and turned into an ml project. it looks up players across 11 regions and covers ranked stats, match history and full-team analytics.",
    line: "league of legends stats and match analytics, plus ml experiments",
    screens: [
      "/screenshots/scuttle-dashboard.jpg",
      "/screenshots/scuttle-matches.jpg",
      "/screenshots/scuttle.png",
    ],
    caseStudy: {
      lede: "a league of legends stats site. it started as a simple tracker and turned into an ml project.",
      facts: [
        { n: "11", label: "regions supported" },
        { n: "14.8k", label: "master+ matches in the training set" },
        { n: "2", label: "models compared: logistic regression, catboost" },
      ],
      captions: [
        "the player page: profile, ranked, mastery and a 10-game trend",
        "recent matches: kda, items, cs per minute and kill participation",
      ],
      chapters: [
        {
          title: "overview",
          lead: "scuttle looks up any player across 11 regions and shows ranked stats, champion mastery, match history, performance trends and full-lobby analysis.",
          // From the old site's overview, minus the sentence the lead covers. John to reword.
          body: "under the hood it's a full authenticated app — github sign-in, saved search history, and a caching layer that keeps it fast under riot's rate limits. the standout feature is draft intelligence: a separate machine learning service that scores a 10-champion draft against a model trained on nearly 15,000 ranked matches, and lets you swap a single pick to see how the score shifts.",
        },
        {
          title: "the api layer",
          lead: "riot's api is rate-limited and split by region, so most of the work is in not asking it twice.",
          body: "a typed riot api client handles regional routing, input validation and retry with backoff. responses are cached in upstash redis, with different ttls for each kind of request, which cuts duplicate calls and keeps the app under the rate limit.",
          pipeline: [
            { label: "riot api" },
            { label: "typed client · routing · retry", highlight: true },
            { label: "redis cache · per-route ttl" },
            { label: "next.js app" },
          ],
          screen: "/screenshots/scuttle-matches.jpg",
          caption: "recent matches: kda, items, cs per minute and kill participation",
        },
        {
          title: "the ml part",
          lead: "i wanted to know if a draft could predict who wins. mostly, it can't, and the site says so.",
          body: 'a fastapi pipeline trains on 14.8k master+ matches. i compared logistic regression and catboost using rolling-forward validation across patches, so the model is always tested on games newer than the ones it learned from. the signal was weak, so instead of a win probability the site shows a low-confidence "draft edge".',
          diagram: {
            // train / test / unused, as flex weights, per patch window
            windows: [
              { label: "patch window 1", train: 3, test: 1, rest: 2 },
              { label: "patch window 2", train: 4, test: 1, rest: 1 },
              { label: "patch window 3", train: 5, test: 1, rest: 0 },
            ],
            legend: "train on grey · test on blue",
            caption: "rolling-forward validation: every test set comes after its training data",
          },
        },
        {
          title: "what i learned",
          lead: "building scuttle.gg taught me a lot about turning an idea into an actual product and figuring things out along the way. beyond the technical side, i learned how much thought goes into designing something that's genuinely useful and deciding which features are actually worth building.",
          body: "moving forward, i'd love to keep improving the design, refining the existing features, and eventually getting more people to use it so i can learn from their feedback.",
        },
      ],
      overview:
        "scuttle lets you search any riot id and see ranked progress, champion mastery, and match history across 11 regions. under the hood it's a full authenticated app — github sign-in, saved search history, and a caching layer that keeps it fast under riot's rate limits. the standout feature is draft intelligence: a separate machine learning service that scores a 10-champion draft against a model trained on nearly 15,000 ranked matches, and lets you swap a single pick to see how the score shifts.",
      highlights: [
        "built a typed riot api client with automatic retry/backoff and platform-to-regional routing across all 11 supported regions",
        "added github authentication (nextauth) with persisted per-user search history in mongodb",
        "cut redundant riot api calls with upstash redis caching (7-day match cache, 1-hour mastery cache)",
        "shipped kda and performance trend charts with recharts",
      ],
      howItWorks: [
        "collected and processed 14,826 ranked matches into a training pipeline",
        "trained and evaluated a logistic regression model using rolling forward-patch validation, so it's tested the way it'll actually be used — on metas it hasn't seen yet",
        "served the model through a separate fastapi microservice, called server-side from a next.js api route",
        "built a counterfactual draft explorer that swaps one pick and shows how the model's score changes, without ever claiming a win probability the data can't support",
      ],
      fullStack: [
        "next.js", "react", "typescript", "tailwind css", "framer motion", "recharts",
        "nextauth", "mongodb", "upstash redis", "fastapi", "scikit-learn",
      ],
      timeline: "november 2025 — present",
      links: {
        github: "https://github.com/johnwfan/lol-stats-tracker",
        live: "https://lol-stats-tracker-johnf.vercel.app/",
      },
    },
  },
  {
    slug: "flow",
    name: "flow",
    year: "2026",
    role: "frontend and deployment, team project",
    stack: "next.js · typescript · timescaledb · docker",
    description:
      "a focus coach that uses your webcam to tell when you’re losing focus and steps in. video stays on your computer. built with a team at hackrice 16.",
    line: "a focus coach that uses your webcam to tell when you’re distracted",
    screens: ["/screenshots/flow-tracker.png", "/screenshots/flow-landing.png"],
    // From John's write-up (hackrice 16), condensed into the template.
    caseStudy: {
      lede: "a focus companion that understands more than what's on your screen.",
      role: "product design, ui/ux design, frontend development, full-stack engineering",
      facts: [
        { n: "~36", label: "hours to build, at hackrice 16" },
        { n: "2", label: "developers" },
        { n: "4", label: "stages: sense, understand, respond, learn" },
      ],
      captions: [
        "the live-session dashboard: pulse, breathing, what it saw and the current state",
        "the landing page at tryflow.study",
      ],
      chapters: [
        {
          title: "overview",
          lead: "flow is a real-time focus companion that uses an ordinary webcam to help people understand their attention and physiological responses while they work.",
          body: [
            "unlike productivity apps that measure time spent working, flow tries to recognize what's happening while someone works. it combines camera-based physiological sensing with computer activity to spot patterns of focused work, drifting attention and elevated stress, offers optional interventions, and turns each finished session into personalized insights.",
            "we built it at hackrice 16 to explore how human-sensing technology could make productivity software more responsive, personal and genuinely useful. the central idea was simple: your computer knows what you're doing. but it doesn't know how you're doing.",
          ],
          screen: "/screenshots/flow-landing.png",
          caption: "the landing page at tryflow.study",
        },
        {
          title: "the problem",
          lead: "being at your desk doesn't mean you're focused.",
          body: [
            "most productivity apps measure behavior, not attention: how long you've worked, which apps you opened, how often you switched tabs. you can stare at an assignment for an hour, reread the same paragraph five times, or sit in front of an ide without making progress. your computer sees that you're working. you know your attention went somewhere else.",
            "rather than encouraging people to work longer, we wanted to help them understand when their work was actually effective. that raised three questions:",
          ],
          list: [
            "can we recognize when someone has mentally drifted away from their work, even if they're still looking at the screen?",
            "can software respond to someone's current state without becoming another distraction?",
            "can the information from a session help someone understand their own work habits over time?",
          ],
        },
        {
          title: "product direction",
          lead: "productivity tools can see what people do, but they know very little about what people are experiencing.",
          body: [
            "we started with task overload, digital distractions, time management and cognitive fatigue, including a schedule that adjusts to how you actually work. the presage smartspectra sdk changed the direction: with an ordinary webcam it estimates pulse and breathing, no wearable needed. and a change in breathing means something different when you're writing code, reading a document or taking a break, so we set out to connect physiological signals with work context.",
          ],
          pipeline: [
            { label: "sense" },
            { label: "understand", highlight: true },
            { label: "respond" },
            { label: "learn" },
          ],
          steps: [
            "sense: capture physiological measurements through an ordinary webcam.",
            "understand: combine them with active-window context to spot focus, drifting and elevated stress.",
            "respond: offer contextual, optional interventions when those patterns persist.",
            "learn: turn session data into insights about attention, work habits and recovery.",
          ],
        },
        {
          title: "the experience",
          lead: "i owned the interface design and frontend, and the hardest part was making invisible information understandable.",
          body: [
            "pulse, breathing rate, signal confidence and state classifications are useful technically, but most people don't think about their work in those terms. i wanted flow to feel like a thoughtful productivity app, not a medical monitor or an overwhelming analytics dashboard. three principles shaped it: clarity over complexity, evidence over assumptions, and guidance without interruption.",
          ],
          list: [
            "the live-session dashboard: real-time pulse and breathing, the current focus state, work context, elapsed time and signal confidence. instead of one productivity score, it shows what it measured and why it reached its interpretation, because a change in pulse doesn't automatically mean someone is distracted.",
            "contextual interventions: quiet during focused work, a gentle check-in when attention drifts, and guided breathing with elevenlabs during elevated arousal. they're suggestions, not commands, and easy to dismiss.",
            "uncertainty and missing data: explicit warmup, low-confidence and missing-signal states, and no interventions when confidence is too low. the system should acknowledge uncertainty instead of pretending to know more than it does.",
            "session history and insights: timelines, focus-state changes, pulse and breathing and context events, with gemini turning them into readable summaries and practical suggestions.",
          ],
        },
        {
          title: "building flow",
          lead: "a typescript system that keeps webcam sensing, live visualization, backend processing and history separate.",
          pipeline: [
            { label: "webcam" },
            { label: "local agent · presage smartspectra", highlight: true },
            { label: "local websocket" },
            { label: "next.js dashboard" },
          ],
          steps: [
            "local sensing: a node.js agent runs the presage smartspectra sdk on the webcam feed (including rppg), combines it with the active window, and classifies states like focused, zoned out, spiraling, warmup and no signal. raw camera frames never leave the computer.",
            "real-time updates: the agent talks to the next.js frontend over a local websocket, with shared typescript message types on both sides, which helped when everything was being built at once.",
            "time-series storage: a fastify api writes derived measurements and session events to timescaledb on tiger cloud, with hypertables and continuous aggregates for history and trends. uploads are batched, idempotent, retried and buffered locally if the connection drops.",
            "ai feedback: at the end of a session, gemini turns the recorded states, context and statistics into a readable summary, and elevenlabs voices the guided breathing. the model explains what the system measured; it doesn't invent interpretations of someone's mental state.",
            "deployment: docker compose on a vultr vm, with caddy for reverse proxying and https on our own domain.",
          ],
        },
        {
          title: "challenges",
          lead: "attention isn't something a webcam can directly measure.",
          body: [
            "so flow uses several signals plus context instead of trusting any single measurement, and the design includes self-report prompts that can be compared against its predictions. we wanted an exploratory measurement tool, not a system making unsupported claims about someone's mental state.",
            "a focus tool can also become the distraction. sustained-state detection, confidence thresholds and optional interventions keep it quiet during focused work, and suggestions can be dismissed without consequences.",
            "with about 36 hours and two developers, we scoped it to a single-user desktop experience: no accounts, social features, mobile apps or multi-user infrastructure. independent components and shared data contracts let the frontend be built against simulated data before the sensing pipeline was ready. the priority was one coherent, working end-to-end experience.",
          ],
        },
        {
          title: "my contributions",
          lead: "i worked across product design and engineering, with primary ownership of the interface and frontend.",
          list: [
            "product and interaction design: turning the concept into a focused experience with clear feedback, optional interventions and useful post-session insights.",
            "visual design and design system: typography, spacing, hierarchy, components and data presentation that stay consistent despite the complexity underneath.",
            "frontend development: the next.js live-session dashboard, physiological data displays, focus-state feedback, session history and supporting states.",
            "data visualization: presenting continuous measurements so they make sense without knowing anything about physiological sensing.",
            "infrastructure and integration: the timescaledb data layer and the docker deployment, connecting the frontend to the backend and session data.",
          ],
        },
        {
          title: "the outcome",
          lead: "by the end of hackrice 16, we had built and deployed a working prototype.",
          body: [
            "it brought together webcam-based physiological sensing, computer activity context, real-time state classification, optional interventions, session history and ai-generated summaries, using an everyday webcam as the input for a productivity tool that responds to how you're doing instead of only recording time.",
            "flow stayed an experimental prototype, not a clinically validated attention measure. its classifications were hypotheses informed by physiological measurements, and we designed and described it that way.",
          ],
        },
        {
          title: "reflections",
          lead: "good technology shouldn't just collect more information. it should help people understand something they couldn't easily see before.",
          body: [
            "the sensing produced a lot of information; the harder question was what someone should actually do with it. a technically impressive measurement isn't automatically a useful feature, so we had to decide what deserved attention, when to intervene, how much uncertainty to show, and how to make complex data feel understandable.",
            "it also taught me how much a clear concept, interface contracts and priorities help a small team build a cohesive product across the frontend, sensing agent, backend and deployment under tight constraints.",
          ],
        },
        {
          title: "stack",
          chips: [
            "next.js", "react", "typescript", "presage smartspectra", "node.js", "fastify",
            "websockets", "timescaledb", "gemini", "elevenlabs", "docker", "vultr",
          ],
        },
      ],
      fullStack: [
        "next.js", "react", "typescript", "presage smartspectra", "node.js", "fastify",
        "websockets", "timescaledb", "gemini", "elevenlabs", "docker", "vultr",
      ],
      timeline: "september 2026",
      credit: "built by a team of 2 at hackrice 16, september 2026.",
      links: {
        live: "https://tryflow.study",
        github: "https://github.com/johnwfan/flow",
      },
    },
  },
  {
    slug: "studioflow",
    name: "studioflow",
    year: "2026",
    role: "solo, personal project",
    stack: "next.js · prisma · postgres",
    description:
      "a project management tool for creative teams, with projects, tasks, a publishing calendar and a kanban board.",
    line: "project and asset management for creative teams",
    screens: [
      "/screenshots/studioflow.png",
    ],
    caseStudy: {
      overview:
        "studioflow gives creative teams a structured, permissioned workspace for content work — projects, tasks, comments, and shared assets all live in one place, with role-based access control across 3 user roles enforcing who can see and touch what at the api level.",
      highlights: [
        "designed normalized postgresql schemas with prisma and implemented role-based access control for 3 user roles, enforcing team and project permissions across api routes",
        "built 10+ rest api endpoints with validation, error handling, and reusable service logic for projects, tasks, collaboration, and metadata",
        "optimized project views with server-side filtering, pagination, and tuned prisma queries to cut down database reads",
        "containerized the app with docker and deployed it on aws",
      ],
      howItWorks: [],
      fullStack: [
        "next.js", "react", "typescript", "node.js", "express", "tailwind css", "shadcn/ui",
        "radix ui", "prisma", "postgresql", "clerk", "docker", "aws",
      ],
      timeline: "april 2026 — present",
      links: {
        github: "https://github.com/johnwfan/studioflow",
      },
    },
  },
  {
    slug: "storm",
    name: "storm",
    year: "2025",
    role: "frontend, team project",
    stack: "react · python · pytorch · opencv · leaflet",
    description: "maps flood risk using street-level images.",
    line: "flood-risk mapping from street-level images",
    screens: [
      "/screenshots/storm.png",
    ],
    caseStudy: {
      overview:
        "storm analyzes flood risk for any location by combining computer vision with environmental data. it pulls four-directional street view imagery, runs it through a segmentation model to classify surfaces as pavement, greenery, or other, and combines that with terrain slope, rainfall intensity, and drainage data into a weighted risk score — visualized on an interactive map with ai-generated mitigation recommendations.",
      // Written at the project level, not as personal claims: team build, and
      // john's own slice (frontend) isn't broken out yet.
      highlights: [
        "scores flood risk with a weighted model combining surface permeability, terrain slope, rainfall intensity, and drainage infrastructure",
        "classifies street-level surface coverage (pavement, greenery, other) using a mask2former segmentation model",
        "visualizes results on an interactive map with heat-map overlays and ai-generated mitigation recommendations",
        "pulls live data from google maps, street view, elevation, and openweather apis for any coordinate worldwide",
      ],
      howItWorks: [
        "fetches four-directional street view imagery for a given coordinate",
        "runs a mask2former segmentation model (trained on mapillary vistas) to classify surface coverage",
        "combines surface data with terrain slope and live rainfall data into a weighted risk score",
        "generates mitigation recommendations and renders results as an interactive heat map",
      ],
      fullStack: [
        "react", "vite", "redux toolkit", "leaflet", "node.js", "express",
        "python", "pytorch", "mask2former", "opencv",
      ],
      timeline: "fall 2025",
      credit: "built with kacem ettahali and diego rico at hackrice, fall 2025.",
      links: {
        github: "https://github.com/johnwfan/storm-flood-risk",
      },
    },
  },
  {
    slug: "outfit-picker",
    name: "outfit picker",
    year: "2025",
    role: "solo",
    stack: "fastapi · next.js · gemini",
    description:
      "recommends outfits from the clothes you’ve saved, ranks them, and generates a preview with gemini.",
    line: "outfit recommendations from the clothes you’ve saved",
    screens: [
      "/screenshots/outfit-picker.png",
    ],
    caseStudy: {
      overview:
        "outfit picker is a full-stack app for visualizing outfits before you commit to them. you upload tops and bottoms into two browsable carousels, add a reference photo of yourself, describe a theme, and the backend generates an ai try-on image with gemini. it's built as a complete product loop — a next.js frontend talking to a fastapi backend, file storage, and an external generation api with caching and a fallback path when the quota runs out.",
      highlights: [
        "built a fastapi backend with rest endpoints for wardrobe uploads, reference photos, and image generation",
        "integrated google's gemini api (google-genai) to generate a themed try-on image from a top, bottom, and reference photo",
        "cached generations by (reference + top + bottom + theme) so identical requests don't re-generate",
        "added a fallback mode that serves a placeholder output if the ai provider's quota is exhausted, so the pipeline stays testable end to end",
      ],
      howItWorks: [],
      fullStack: ["next.js", "react", "tailwind css", "fastapi", "python", "google-genai"],
      timeline: "december 2025",
      links: {
        github: "https://github.com/johnwfan/outfit-picker",
      },
    },
  },
];
