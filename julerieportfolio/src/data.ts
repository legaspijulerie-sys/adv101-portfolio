// ✏️ Edit this file to personalise your portfolio.

export const profile = {
  name: "Julerie Legaspi",
  title: "2nd Year IT Student",
  location: "Davao City, Philippines",
  email: "legaspijulerie@gmail.com",
  github: "https://github.com/legaspijulerie-sys",
  // Put your resume at public/resume.pdf (see README). Change the name here if needed.
  resumePath: "/resume.pdf",
  // Your photo: either click the photo slot on the About page to choose one,
  // or save a file as public/profile.jpg (see README). Change the name here if needed.
  photoPath: "/profile.jpg",
  // true  = the photo slot can be clicked to choose a picture (use this while building).
  // false = visitors just see the photo, with no edit controls (set this before you publish).
  photoEditable: false,
  // Words that get typed out under your name on the About page.
  roles: ["2nd Year IT Student", "Java Learner", "Web Builder", "Android Beginner"],
  bio: [
    "I'm a second-year Information Technology student based in Davao City. I'm still at the beginning of my journey and I know the basics of programming: Java, HTML, CSS, JavaScript, and a bit of Android Studio.",
    "I learn best by building small projects, so this portfolio shows the exercises I've made while studying. I'm eager to keep learning, improve my skills, and take on bigger projects as I grow.",
  ],
};

export interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
}

export const projects: Project[] = [
  {
    title: "Console Calculator",
    description:
      "A command-line calculator that adds, subtracts, multiplies and divides, using methods, loops and basic input validation.",
    tags: ["Java", "OOP Basics", "Scanner"],
    link: profile.github,
  },
  {
    title: "Student Grade Calculator",
    description:
      "Takes a student's scores, computes the average using arrays and conditionals, and prints the final grade and remarks.",
    tags: ["Java", "Arrays", "Conditionals"],
    link: profile.github,
  },
  {
    title: "Personal Profile Page",
    description:
      "A simple one-page website about me, made with semantic HTML: headings, lists, images, links and a basic table.",
    tags: ["HTML", "Semantic Tags"],
    link: profile.github,
  },
  {
    title: "Responsive Landing Page",
    description:
      "A styled landing page for a fictional café, using CSS Flexbox, colors, fonts and a media query so it fits phones and laptops.",
    tags: ["HTML", "CSS", "Flexbox"],
    link: profile.github,
  },
  {
    title: "To-Do List",
    description:
      "A small web app where you can add and delete tasks and mark them as done, built to practice DOM manipulation and events.",
    tags: ["JavaScript", "DOM", "HTML", "CSS"],
    link: profile.github,
  },
  {
    title: "Tip Calculator App",
    description:
      "My first Android app: enter a bill amount and tip percentage, then tap a button to see the total. Practices layouts, buttons and click listeners.",
    tags: ["Android Studio", "Java", "XML Layouts"],
    link: profile.github,
  },
];

export const skillGroups: { group: string; items: string[] }[] = [
  { group: "Programming", items: ["Java (basics)", "JavaScript (basics)"] },
  { group: "Web", items: ["HTML", "CSS"] },
  { group: "Mobile", items: ["Android Studio (basics)"] },
  { group: "Tools", items: ["Git & GitHub", "VS Code"] },
];
