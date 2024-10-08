import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import Login from "../pages/Login/Login";
import Swap from "../pages/Swap/Swap";
import NewBorn from "../pages/NewBorn/NewBorn";
import SwapTemplate from "../pages/SwapTemplate/SwapTemplate";
import SwapVideo from "../pages/Swap/SwapVideo";
import Profile from "../pages/Profile/Profile";
import Setting from "../pages/Setting/Setting";
import MomAndChild from "../pages/MomAndChild/MomAndChild";
import MomAndDad from "../pages/MomAndDad/MomAndDad";
import Share from "../pages/Share/Share";
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy";
import Contact from "../pages/Contact/Contact";

const Routers = () => {
  // const [, setPrivateId] = useState('')
  // const handleSetId = (id:string) => setPrivateId(id)
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/swap" element={<Swap />} />
        <Route path="/newborn" element={<NewBorn />} />
        <Route path="/template/:type/:page" element={<SwapTemplate />} />
        <Route path="/swapVideo/:id" element={<SwapVideo />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/setting/:id" element={<Setting />} />
        <Route path="/momandchild/:folderName/:id" element={<MomAndChild />} />
        <Route path="/momanddad/:id" element={<MomAndDad />} />
        <Route path="/share/:id" element={<Share />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/contact" element={<Contact />} />




        {/* <Route path='signin' element={<Signin />}/>
                <Route path='signup' element={<Signup/>}/>
                <Route path='profile' element={<PrivateUser><PrivateRoute><EditProfile/></PrivateRoute></PrivateUser>}>
                    <Route path='edit/:id' element={<PrivateRoute ><Editor/></PrivateRoute>}/>
                    <Route path='account/:id' element={<PrivateRoute ><Account/></PrivateRoute>}/>
                </Route>
                <Route path="upload/:id" element={<PrivateRoute ><NewUpload/></PrivateRoute>} />
                <Route path="faceupload" element={<PrivateRoute ><FaceUpload/></PrivateRoute>} />
                <Route path="generate" element={<PrivateRoute ><Generate/></PrivateRoute>} />
                <Route path="preview" element={<PrivateRoute ><Preview/></PrivateRoute>} />
                <Route path="forgotpassword" element={<ForgotPassword/>}/>
                <Route path="profile/:id" element={<Profile/>}/>
                <Route path="listtemplate/:id" element={<ListTemplate/>}/>
                <Route path="listcategories" element={<ListCategory/>}/> */}
      </Routes>
    </>
  );
};
export default Routers;
