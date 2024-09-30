import { config } from "process";
import apiAuth from "../core/apiAuth";
import apiLhvn from "../core/apiLhvn";
import apiThink from "../core/apiThink";
import apiDb from "../core/apiDb";
export const getUserData = (id: string) => apiAuth.get(`/profile/${id}`);
const token = localStorage.getItem("accessToken");
type User = {
  id_user: number;
  link_avatar: string;
  count_comment: number;
  count_sukien: number;
  count_view: number;
  device_register: string;
  email: string;
  ip_register: string;
  token: string;
  user_name: string;
};
// const user: User = JSON.parse(localStorage.getItem('user') || "");



export const uploadImageSwap = (userId: number,formData: any, gender: string) =>{
  console.log(userId);
  apiAuth.post(`/upload-gensk/${userId}?type=src_${gender}`,{
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`,
    }
  }, formData);

}

export const swapImage = async (userId: number,link1: string, link2: string) => {
  console.log(link1, link2);
  let config = {
    headers: {
      link2: link2,
      link1: link1,
      Authorization: `Bearer ${token}`,
    },
  };
  // console.log("here");
  return await apiThink.get<SuccessResponse, FailResponse>(
    `/getdata/swap/2/image?device_them_su_kien=gdgdg&ip_them_su_kien=dfbdfbd&id_user=${userId}`,
    config
  );
};
export const swapVideo = async (userId: number,link1: string, formData: any) => {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await apiLhvn.post<SuccessResponse, FailResponse>(
    `/getdata/genvideo/swap/imagevid?device_them_su_kien=Simulator%20%28iPhone%2014%20Plus%29&ip_them_su_kien=14.231.223.63&id_user=${userId}&src_img=${link1}`,
    formData,
    config
  );
};
export const videoTemplate = async () => {
  return await apiDb.get<SuccessResponse, FailResponse>(
    `/get/list_video/all_video_baby_mom`
  );
};

export const swapVideoVersion2 = async (
  userId: any,
  link1: string,
  link2: number | undefined
) => {
  console.log(userId, link1, link2);
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  if (link2 !== undefined) {
    return await apiLhvn.get<SuccessResponse, FailResponse>(
      `/getdata/genvideo/swap/imagevid/time_machine?device_them_su_kien=gdgdgf&ip_them_su_kien=dfbdfbdf&src_vid_path=${link2}&src_img=${link1}&id_user=${userId} `,

      config
    );
  } else {
    return null;
  }
};

export const swapVideoMomAndDad = async (
  userId: any,
  link1: string,
  link2: number | undefined
) => {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  if (link2 !== undefined) {
    return await apiLhvn.get<SuccessResponse, FailResponse>(
      `/getdata/genvideo/swap/imagevid/grow_up?device_them_su_kien=gdgdgf&ip_them_su_kien=dfbdfbdf&src_vid_path=${link2}&src_img=${link1}&id_user=${userId} `,

      config
    );
  } else {
    return null;
  }
};
