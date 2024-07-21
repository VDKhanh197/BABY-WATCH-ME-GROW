interface User {
  username: ReactNode;
  id: number;
  name: string;
  userName: string;
  email: srting;
}
interface SuccessResponse {
  sukien_swap_video: {
    link_vid_da_swap: string;
  };
  sukien_2_image: {
    link_da_swap: string;
  };
}
// const [data, setData] = useState<DataResponse>({});

interface FailResponse {
  sukien_swap_video: {
    link_vid_da_swap: string;
  };
  sukien_2_image: {
    link_da_swap: string;
  };
  sukien_video: {
    link_vid_da_swap: string;
  };
  list_sukien_video: [];
}
