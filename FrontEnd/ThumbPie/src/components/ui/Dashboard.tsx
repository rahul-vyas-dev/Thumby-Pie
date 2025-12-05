import { ArrowUpIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { useHistoryStore } from "@/store/useHistoryStore";
import ContentCompo from "./ContentCompo";
import { FileUpload } from "./file-upload";
import { useState } from "react";

export function Dashboard() {
  const historyData = useHistoryStore((state) => state.data);
  // console.log('data',historyData)
  const [files, setFiles] = useState<File[]>([]);

  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    console.log("files are", files);
  };
  console.log("files are ourside", files);

  return (
    <>
      <main className="w-full text-black dark:text-white pb-[20%]">
        {historyData?.data ? (
          <main>
            {historyData.data.map((dataObj) => (
              <ContentCompo dataObj={dataObj} key={dataObj._id} />
            ))}
          </main>
        ) : (
          <main className="w-full h-screen flex justify-center items-center bg-gray-200 dark:bg-gray-800">
            <span>
              <b>Prompt it, Generate it</b>
            </span>
          </main>
        )}
      </main>

      <div className="flex w-full gap-6 fixed bottom-7 justify-center items-center">
        <div className="w-[79%]">
          <InputGroup>
            <InputGroupTextarea placeholder="Ask, Search or Chat..." />
            <InputGroupAddon align="block-end">
              <div className="w-fit h-fit border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
                <FileUpload onChange={handleFileUpload}></FileUpload>
              </div>
              <InputGroupButton
                variant="default"
                className="rounded-full ml-auto"
                size="icon-xs"
                
              >
                <ArrowUpIcon />
                <span className="sr-only">Send</span>
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>
    </>
  );
}
