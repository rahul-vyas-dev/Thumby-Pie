import { SidebarDemo } from "@/components/ui/sideBarDemo";
import { useSessionStore } from "@/store/useSessionStore";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "sonner";
const url = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;
function Upload() {
  const addUserSession = useSessionStore((state) => state.setData);

  useEffect(() => {
    axios
      .get(`${url}api/v1/sessions/get-user-sessions`)
      .then((res) => {
        console.log('these are user sessions', res);
        addUserSession(res.data);
        toast(res.data.message);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      });
  }, []);

  return <SidebarDemo />;
}

export default Upload;
