import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Component/Home/Home";
import Login from "./Component/Login/Login";
import ErrorPage from "./Component/ErrorPage/ErrorPage"
import RouterLayout from "./Component/RouterLayout/RouterLayout";
import ProtectedRoute from "./Component/ProtectedRoute/ProtectedRoute";
import jwtDecode from "jwt-decode";
import { useEffect } from 'react';
import { createBrowserRouter , Navigate, RouterProvider } from "react-router-dom"
import ProfileDoctor from './Component/ProfileDoctor/ProfileDoctor';
import Booking from "./Component/Booking/Booking";
import AskQuestion from "./Component/AskQuestion/AskQuestion";
import MedicalQuestions from "./Component/MedicalQuestions/MedicalQuestions";
import ProfileSetting from "./Component/ProfileSetting/ProfileSetting";
import Patient from "./Component/Patient/Patient";
import ChangePassword from "./Component/ChangePassword/ChangePassword";
import Favourites from "./Component/Favourites/Favourites";
import Doctor from "./Component/Doctor/Doctor";
import Appointments from "./Component/Appointments/Appointments";
import ScheduleTiming from "./Component/ScheduleTiming/ScheduleTiming";
import Search from "./Component/Search/Search";
import RegisterDoctor from "./Component/Register/RegisterDoctor";
import RegisterPatient from "./Component/Register/RegisterPatient";
import Specialization from "./Component/Specialization/Specialization";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";
import AppointmentsPatient from "./Component/AppointmentsPatient/AppointmentsPatient";
import Questions from "./Component/Questions/Questions";
import RouterLayoutDoctor from "./Component/RouterLayoutDoctor/RouterLayoutDoctor";
import AdminDashboard from "./Component/AdminDashboard/AdminDashboard";
import AdminAppointments from "./Component/AdminAppointments/AdminAppointments";
import AdminDoctors from "./Component/AdminDoctors/AdminDoctors";
import AdminPatients from "./Component/AdminPatients/AdminPatients";
import RouterLayoutAdmin from "./Component/RouterLayoutAdmin/RouterLayoutAdmin";
import AdminReviews from "./Component/AdminPosts/AdminPosts";
import AdminSpecialties from "./Component/AdminSpecialties/AdminSpecialties";
import MyQuestions from "./Component/MyQuestions/MyQuestions";
import MachineLearning from "./Component/MachineLearning/MachineLearning";
import ChatDoctor from "./Component/Chat/ChatDoctor";
import ChatPatient from "./Component/Chat/ChatPatient";
import ChatContentPatient from "./Component/Chat/ChatContentPatient";
import ChatContentDoctor from "./Component/Chat/ChatContentDoctor";
export default function App(){
  let {userData , setUserData} = useContext(AuthContext);
  useEffect(()=>{
    if(localStorage.getItem('userToken')!==null){
      saveUserData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  function saveUserData() {
    let encodedToken = localStorage.getItem('userToken');
    let decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken);
  }
  function logOut(){
    localStorage.removeItem('userToken');
    setUserData(null);
    return <Navigate to='login'/>
  }
  const routers = createBrowserRouter([
    {
        path: '/' , element : <RouterLayout userData={userData} logOut={logOut}/> ,
        children : [
            {index :true , element:<Home userData={userData} />},
            {path :'login' , element: <Login saveUserData={saveUserData}/>},
            {path :'register/patient' , element: <RegisterPatient/>},
            {path :'register/doctor' , element: <RegisterDoctor/>},
            //patient
            {path :'profile' , element: <ProtectedRoute saveUserData={saveUserData} userData={userData}><Patient userData={userData} logOut={logOut}/></ProtectedRoute>,
            children:[
              {index :true , element: <ProtectedRoute saveUserData={saveUserData} userData={userData}><ProfileSetting userData={userData}/></ProtectedRoute>},
              {path :'appointments' , element: <ProtectedRoute saveUserData={saveUserData} userData={userData}><AppointmentsPatient  userData={userData}/></ProtectedRoute>},
              {path :'myQuestions' , element: <ProtectedRoute saveUserData={saveUserData} userData={userData}><MyQuestions userData={userData}/></ProtectedRoute>},
              {path :'change-password' , element: <ProtectedRoute saveUserData={saveUserData} userData={userData}><ChangePassword userData={userData}/></ProtectedRoute>},
              {path :'favourites' , element: <ProtectedRoute saveUserData={saveUserData} userData={userData}><Favourites userData={userData}/></ProtectedRoute>},
            ]},
            {path :'chatDoctor' , element: <ProtectedRoute saveUserData={saveUserData} userData={userData}><ChatDoctor  userData={userData}/></ProtectedRoute>,
              children:[
                {path :'patient/:id' , element: <ProtectedRoute saveUserData={saveUserData} userData={userData}><ChatContentDoctor  userData={userData}/></ProtectedRoute>}
              ]
            },
            {path :'chatPatient' , element: <ProtectedRoute saveUserData={saveUserData} userData={userData}><ChatPatient  userData={userData}/></ProtectedRoute>,
              children:[
                {path :'doctor/:id' , element: <ProtectedRoute saveUserData={saveUserData} userData={userData}><ChatContentPatient  userData={userData}/></ProtectedRoute>}
              ]
            },
            {path :'profileDoctor/:id' , element: <ProtectedRoute saveUserData={saveUserData} ><ProfileDoctor userData={userData}/></ProtectedRoute>},
            {path :'booking/:id' , element: <ProtectedRoute saveUserData={saveUserData} userData={userData}><Booking userData={userData}/></ProtectedRoute>},
            {path :'searching' , element: <ProtectedRoute saveUserData={saveUserData} ><Search userData={userData}/></ProtectedRoute>},
            {path :'askDoctor' , element: <ProtectedRoute saveUserData={saveUserData} userData={userData}><AskQuestion userData={userData}/></ProtectedRoute>},
            {path :'medicalQuestions' , element: <ProtectedRoute saveUserData={saveUserData}><MedicalQuestions userData={userData}/></ProtectedRoute>},
            ///doctor
            {path: 'doctor/' , element : <ProtectedRoute saveUserData={saveUserData} userData={userData}><RouterLayoutDoctor userData={userData} logOut={logOut}/></ProtectedRoute> ,
            children:[
              {path :'profile' , element: <ProtectedRoute saveUserData={saveUserData} userData={userData}><Doctor userData={userData} logOut={logOut}/></ProtectedRoute>,children:[
                {index :true , element: <ProtectedRoute saveUserData={saveUserData} userData={userData}><ProfileSetting userData={userData}/></ProtectedRoute>},
                {path :'change-password' , element: <ProtectedRoute saveUserData={saveUserData} userData={userData}><ChangePassword userData={userData}/></ProtectedRoute>},
                {path :'appointments' , element: <ProtectedRoute saveUserData={saveUserData} userData={userData}><Appointments userData={userData}/></ProtectedRoute>},
                {path :'schedule-timing' , element: <ProtectedRoute saveUserData={saveUserData} userData={userData}><ScheduleTiming userData={userData}/></ProtectedRoute>},
                {path :'questions' , element: <ProtectedRoute saveUserData={saveUserData} userData={userData}><Questions userData={userData}/></ProtectedRoute>},
              ]},
              {path :'specialization-doctor' , element: <ProtectedRoute saveUserData={saveUserData} userData={userData}><Specialization userData={userData}/></ProtectedRoute>},
            ]},
            {path:'admin/',element: <ProtectedRoute saveUserData={saveUserData} userData={userData}><RouterLayoutAdmin userData={userData} logOut={logOut}/></ProtectedRoute>,
              children:[
                {index:true , element:<ProtectedRoute saveUserData={saveUserData} userData={userData}><AdminDashboard userData={userData}/></ProtectedRoute>},
                {path: 'appointments', element:<ProtectedRoute saveUserData={saveUserData} userData={userData}><AdminAppointments userData={userData}/></ProtectedRoute>},
                {path: 'specialties', element:<ProtectedRoute saveUserData={saveUserData} userData={userData}><AdminSpecialties userData={userData}/></ProtectedRoute>},
                {path: 'doctors', element: <ProtectedRoute saveUserData={saveUserData} userData={userData}><AdminDoctors userData={userData}/></ProtectedRoute>},
                {path: 'patients', element: <ProtectedRoute saveUserData={saveUserData} userData={userData}><AdminPatients userData={userData}/></ProtectedRoute>},
                {path: 'posts', element: <ProtectedRoute saveUserData={saveUserData} userData={userData}><AdminReviews userData={userData}/></ProtectedRoute>}
              ]
            },
            {path :'MachineLearning' , element: <ProtectedRoute saveUserData={saveUserData} userData={userData}><MachineLearning userData={userData}/></ProtectedRoute>},

            //all
            {path :'*' , element: <ErrorPage/>},
        ]
    }
  ])
  
  return <RouterProvider router={routers}/>
}