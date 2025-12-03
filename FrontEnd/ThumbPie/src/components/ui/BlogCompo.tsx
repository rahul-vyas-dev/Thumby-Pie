interface UserData {
  data: {
    id: number;
    profile: string;
    author: string;
    title: string;
    desc: string;
    summary: string;
  };
}

function BlogCompo({ data }: UserData) {
  return (
    <main className="overflow-hidden hover:scale-105 transition delay-75 ">
      <div>
        <img
          src={data.profile}
          alt="userImage"
          className="h-64 rounded-2xl rounded-bl-none rounded-br-none w-full"
        />
        <main className="p-7 bg-[oklch(0.2_0_0)] rounded-bl-2xl rounded-br-2xl">
          <div className="flex items-center gap-4">
            <img
              src={data.profile}
              alt="userImage"
              className="w-13 rounded-4xl"
            />
            <span className="text-gray-400">
              <b>{data.author}</b>
            </span>
          </div>
          <div className="flex flex-col items-start mt-3.5 gap-3.5">
            <div className="font-extrabold text-2xl">{data.title}</div>
            <div className="font-bold text-gray-300">{data.desc}</div>
          </div>
          <div className="mt-3.5">
            <b>{data.summary}</b>
          </div>
        </main>
      </div>
    </main>
  );
}

export default BlogCompo;
