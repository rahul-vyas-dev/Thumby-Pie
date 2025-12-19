import { BlogData } from "@/data/userBlog";
import { motion } from "framer-motion";
import BlogCompo from "@/components/ui/BlogCompo";

function Blog() {
  return (
    <motion.main>
      <main className="flex flex-col items-center justify-center h-[20vh]">
        <b className="text-5xl">Blog</b>
        <b className="mt-4 text-3xl">Feedback that keeps us growing.</b>
      </main>

      <main className="w-full grid grid-cols-1 gap-6 text-center p-7 lg:grid-cols-2 xl:grid-cols-3 mt-7">
        {BlogData.map((data) => {
          return <BlogCompo data={data} />;
        })}
      </main>
    </motion.main>
  );
}

export default Blog;
