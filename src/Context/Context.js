import { useContext, useEffect, useState, createContext } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";

export let context = createContext(null);
export default function ContextProvider(props) {
  const { userData } = useContext(AuthContext);
  const [spec, setSpec] = useState([]);
  const [users, setUsers] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [allAppointment, setAllAppointment] = useState([]);
  const [doctor, setDoctor] = useState([]);
  const [allDoctors, setAllDoctors] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [deleteError, setDeleteError] = useState([]);
  const [selectedSpecs, setSelectedSpecs] = useState([]);
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedSpecValue, setSelectedSpecValue] = useState("");
  const [question, setQuestion] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filteredDocPosts, setFilteredDocPosts] = useState([]);
  const [patientPosts, SetPatientPosts] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [userAppointments, setUserAppointments] = useState([]);
  const [scheduleTiming, setScheduleTiming] = useState([]);
  const [docID, setDocID] = useState(null);
  const [userID, setUserID] = useState(null);
  const [fav, setFav] = useState([]);
  const [messengerDoctor, SetMessengerDoctor] = useState([]);
  const [messengerPatient, SetMessengerPatient] = useState([]);
  // Admin

  const fetchShowAllSpecs = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL_SITE}api/Doctor/ShowAllSpecs`
      );
      setSpec(data);
    } catch (error) {}
  };
  const fetchAllUsers = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL_SITE}api/Admin/AllUsers`
      );
      setUsers(data);
    } catch (error) {}
  };
  const fetchAllDoctors = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL_SITE}api/Admin/AllDoctors`
      );
      setDoctors(data);
      setAllDoctors(data);
    } catch (error) {}
  };
  const fetchShowAllAppointments = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL_SITE}api/Admin/ShowAllAppointments`
      );
      setAllAppointment(data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchAllPosts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL_SITE}api/Admin/AllPosts`
      );
      setPosts(response.data);
    } catch (error) {}
  };
  const handleDeletePost = (id) => {
    axios
      .delete(`${process.env.REACT_APP_URL_SITE}api/Admin/DeleteForum?id=${id}`)
      .then((response) => {
        fetchAllPosts();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleDeleteComment = (id) => {
    axios
      .delete(
        `${process.env.REACT_APP_URL_SITE}api/Admin/DeleteComment?id=${id}`
      )
      .catch((error) => {
        console.error(error);
        setDeleteError(error);
      });
  };
  //
  // Appointment Component
  const fetchShowDoctorAppointment = async () => {
    try {
      if (docID) {
        const { data } = await axios.get(
          `${process.env.REACT_APP_URL_SITE}api/Doctor/ShowDoctorAppointment?doctorID=${docID}`
        );
        setAppointments(data);
      }
    } catch (error) {}
  };
  const fetchShowUserAppointment = async () => {
    try {
      if (userID) {
        const { data } = await axios.get(
          `${process.env.REACT_APP_URL_SITE}api/Users/ShowUserAppointment?userID=${userID}`
        );
        setUserAppointments(data);
      }
    } catch (error) {}
  };
  const handleAcceptAppointment = (id) => {
    axios
      .put(
        `${process.env.REACT_APP_URL_SITE}api/Doctor/AcceptAppointment?appointmentID=${id}`
      )
      .then((response) => {
        fetchShowDoctorAppointment();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  //
  // ScheduleTime Component
  const handleAddSchedule = (event) => {
    event.preventDefault();
    const timeFrom = event.target.timeFrom.value;
    const timeTo = event.target.timeTo.value;
    const dayStr = event.target.day.value;
    const day = parseInt(dayStr);
    axios
      .post(`${process.env.REACT_APP_URL_SITE}api/Doctor/AddSchedule`, {
        doctorID: docID,
        timeFrom,
        timeTo,
        day,
      })
      .then((response) => {
        fetchScheduleData();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const fetchScheduleData = async () => {
    try {
      if (docID) {
        let { data } = await axios.get(
          `${process.env.REACT_APP_URL_SITE}api/Doctor/ShowSchedule?doctorID=${docID}`
        );
        setScheduleTiming(data);
      }
    } catch (error) {}
  };
  const handleDeleteSchedule = (id) => {
    axios
      .delete(
        `${process.env.REACT_APP_URL_SITE}api/Doctor/DeleteSchedule?ScheduleID=${id}`
      )
      .then((response) => {
        fetchScheduleData(docID);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  //
  //AskQuestion
  const handleSelectSpec = (event) => {
    setSelectedSpecValue(event.target.value);
  };
  const handleYourQuestion = (event) => {
    setQuestion(event.target.value);
  };

  //
  //Favorite Component
  const MessengerDoctorRecepients = async () => {
    try {
      if (userID) {
        const { data } = await axios.get(
          `${process.env.REACT_APP_URL_SITE}api/Users/MessengerDoctorRecepients?receiver=${userID}`
        );
        SetMessengerDoctor(data);
      }
    } catch (error) {}
  };
  const MessengerRecepients = async () => {
    try {
      if (userID) {
        const { data } = await axios.get(
          `${process.env.REACT_APP_URL_SITE}api/Users/MessengerRecepients?sender=${userID}`
        );
        SetMessengerPatient(data);
      }
    } catch (error) {}
  };
  const fetchShowFavorites = async () => {
    try {
      if (userID) {
        const { data } = await axios.get(
          `${process.env.REACT_APP_URL_SITE}api/Users/ShowFavorites?userId=${userID}`
        );
        setFav(data.favorites);
      }
    } catch (error) {}
  };
  const handleRemoveFavorite = async (doctorId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_URL_SITE}api/Users/DeleteFavorite?DoctorID=${doctorId}`
      );
      setFav(fav.filter((item) => item.doctorID !== doctorId));
      // Handle the API response here
      fetchShowFavorites();
    } catch (error) {
      console.error(error);
      // Handle errors here
    }
  };
  //
  //MedicalQuestion Component
  const fetchComments = async (postId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL_SITE}api/Users/ViewPostComments?postID=${postId}`
      );
      setComments(response.data);
    } catch (error) {
      // error.log(error)
    }
  };
  const handlePostClick = (postId) => {
    fetchComments(postId);
  };

  const handleSearchSpec = () => {
    let newFilteredPosts = posts.filter((post) => {
      let specCheck = true;
      if (selectedSpecs.length > 0) {
        specCheck = selectedSpecs.some((specID) => {
          return post.specialization.specID === specID;
        });
      }
      return specCheck;
    });
    setFilteredPosts(newFilteredPosts);
  };
  const handleFilterDocPosts = () => {
    let newFilteredPosts = posts.filter((post) => {
      return post.specializationSpecID === doctor.specializationSpecID;
    });
    setFilteredDocPosts(newFilteredPosts);
  };
  const fetchPatientPosts = async () => {
    try {
      if (userID) {
        const { data } = await axios.get(
          `${process.env.REACT_APP_URL_SITE}api/Users/ViewUserPost?userID=${userID}`
        );
        SetPatientPosts(data);
      }
    } catch (error) {}
  };
  //
  //Search Component
  const handleSearch = () => {
    let newFilteredDoctors = allDoctors.filter((doc) => {
      let genderCheck = true;
      if (selectedGender !== "") {
        genderCheck = doc.user.gender === (selectedGender === "male");
      }
      let specCheck = true;
      if (selectedSpecs.length > 0) {
        specCheck = selectedSpecs.some((specID) => {
          return doc.specialization.specID === specID;
        });
      }
      return genderCheck && specCheck;
    });
    setFilteredDoctors(newFilteredDoctors);
  };
  //
  useEffect(() => {
    fetchAllUsers();
    fetchAllDoctors();
    fetchShowAllSpecs();
    fetchAllPosts();
    fetchShowAllAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userData && userData.nameid) {
      const doctor = doctors.find((doc) => doc.userID === userData.nameid);
      if (doctor) {
        setDocID(doctor.doctorID);
      }
    }
  }, [doctors, userData]);

  useEffect(() => {
    if (docID) {
      const doctor = doctors.find((doc) => doc.doctorID === docID);
      if (doctor) {
        setDoctor(doctor);
      }
    }
  }, [doctors, docID]);

  useEffect(() => {
    if (userData && userData.nameid) {
      const user = users.find((user) => user.id === userData.nameid);
      if (user) {
        setUserID(user.id);
      }
    }
  }, [users, userData]);

  useEffect(() => {
    fetchShowDoctorAppointment();
    fetchShowUserAppointment();
    fetchPatientPosts();
    fetchScheduleData();
    fetchShowFavorites();
    MessengerDoctorRecepients();
    MessengerRecepients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docID, userID]);

  return (
    <context.Provider
      value={{
        userData,
        spec,
        users,
        doctors,
        allAppointment,
        handleDeletePost,
        handleDeleteComment,
        deleteError,
        fetchShowAllSpecs,
        appointments,
        handleAcceptAppointment,
        userAppointments,
        scheduleTiming,
        handleDeleteSchedule,
        handleAddSchedule,
        handleSelectSpec,
        handleYourQuestion,
        question,
        selectedSpecValue,
        fav,
        handleRemoveFavorite,
        posts,
        docID,
        comments,
        handleSearchSpec,
        setSelectedSpecs,
        filteredPosts,
        handlePostClick,
        fetchComments,
        handleSearch,
        allDoctors,
        setSelectedGender,
        selectedGender,
        filteredDoctors,
        handleFilterDocPosts,
        filteredDocPosts,
        patientPosts,
        messengerDoctor,
        messengerPatient,
        MessengerRecepients,MessengerDoctorRecepients
      }}
    >
      {props.children}
    </context.Provider>
  );
}
