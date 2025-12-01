import { HoverEffect } from "./card-hover-effect";

export function CardHoverEffectDemo() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
}
const projects = [
  {
    title: "Aarav S.",
    description:
      "This tool has completely changed my workflow. One single prompt gives me polished thumbnails in seconds. The speed and pricing are unbeatable!",
    img: "https://i.pravatar.cc/150?img=1",
  },
  {
    title: "Meera K.",
    description:
      "I’ve used many generators before, but nothing felt this fast and effortless. The quality is consistently top-tier.",
    img: "https://i.pravatar.cc/150?img=2",
  },
  {
    title: "Rudra P.",
    description:
      "Super smooth experience. I saved hours of design work thanks to this app. Perfect for creators!",
    img: "https://i.pravatar.cc/150?img=3",
  },
  {
    title: "Ishika M.",
    description:
      "The results are sharp, creative, and highly customizable. Even beginners can generate professional outputs easily.",
    img: "https://i.pravatar.cc/150?img=4",
  },
  {
    title: "Devansh T.",
    description:
      "My thumbnails now look premium without spending too much time or money. Excellent innovation.",
    img: "https://i.pravatar.cc/150?img=5",
  },
  {
    title: "Riya B.",
    description:
      "Fastest generator I’ve tried so far. One prompt and boom — ready-to-use designs!",
    img: "https://i.pravatar.cc/150?img=6",
  },
  {
    title: "Kabir L.",
    description:
      "Affordable, quick, and reliable. The perfect tool for content creators who need quality instantly.",
    img: "https://i.pravatar.cc/150?img=7",
  },
  {
    title: "Simran J.",
    description:
      "The UI is clean, the output is stunning, and the process is effortless. Love this tool!",
    img: "https://i.pravatar.cc/150?img=8",
  },
  {
    title: "Ananya S.",
    description:
      "I’m impressed by the accuracy of the AI. It understands my prompts perfectly. Highly recommended.",
    img: "https://i.pravatar.cc/150?img=9",
  },
  {
    title: "Yash R.",
    description:
      "I didn’t expect the generation to be THIS fast. Amazing product!",
    img: "https://i.pravatar.cc/150?img=10",
  },
  {
    title: "Neha P.",
    description:
      "The best part is the pricing — very low compared to other tools, but the quality is even better.",
    img: "https://i.pravatar.cc/150?img=11",
  },{
  title: "OpenAI",
  description:
    "An advanced AI research company pushing the boundaries of intelligent systems. Their review highlights how your app delivers outstanding generation quality with impressive speed and simplicity.",
  img: `https://picsum.photos/seed/${Math.floor(Math.random()*10000)}/200/200`,
},
  {
    title: "Arjun V.",
    description:
      "Every output looks professionally designed. Saved me a lot of editing time.",
    img: "https://i.pravatar.cc/150?img=12",
  },
  {
    title: "Sara H.",
    description:
      "Simple to use and incredibly powerful. Perfect for marketing creatives.",
    img: "https://i.pravatar.cc/150?img=13",
  },
  {
    title: "Krishna D.",
    description:
      "The generation speed is mind-blowing. This app will definitely become popular!",
    img: "https://i.pravatar.cc/150?img=14",
  },
  {
    title: "Aditi G.",
    description:
      "I just provide one small prompt and the app handles everything. No complexity at all.",
    img: "https://i.pravatar.cc/150?img=15",
  },
];
